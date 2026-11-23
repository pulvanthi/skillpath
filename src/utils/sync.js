// Keeps the browser copy of the learner's data in step with PostgreSQL.
//
// The pages read and write localStorage synchronously. Instead of rewriting each
// page, this module (1) loads the user's data from the API into localStorage after
// sign-in and (2) mirrors every later write to the known keys back to the API.
import { api, getToken } from "./api";
import { learningPaths } from "../data/learningPaths";
import { ACTIVITY_KEY, recordActivity } from "./activity";

const ATTEMPTS = "skillpath-quiz-attempts"; // { quizId: [{ takenAt, score, correct, total, answers }] }
const NOTES = "skillpath-notes"; // { "slug::lessonId": "text" }
const PRACTICE = "skillpath-practice"; // { "language:index": { code, solved } }
const ACTIVITY = ACTIVITY_KEY; // ["YYYY-MM-DD", ...]
const PROGRESS = "skillpath-progress-";
const QUIZ = "skillpath-quiz-scores";
const DONE = "skillpath-projects-done";
const STEPS = "skillpath-project-steps";
const BOOKMARKS = "skillpath-bookmarks";
const PROFILE = "skillpath-user-profile";
const SETTINGS = "skillpath-settings";

const progressKeys = () => learningPaths.map((p) => PROGRESS + p.slug);
export const SYNCED_KEYS = [
  ...progressKeys(),
  QUIZ,
  DONE,
  STEPS,
  BOOKMARKS,
  PROFILE,
  SETTINGS,
  ATTEMPTS,
  NOTES,
  PRACTICE,
  ACTIVITY,
];

const original = {
  get: Storage.prototype.getItem,
  set: Storage.prototype.setItem,
  remove: Storage.prototype.removeItem,
};

let pulling = false;
let queue = Promise.resolve();

function parse(text, fallback) {
  try {
    return JSON.parse(text) ?? fallback;
  } catch {
    return fallback;
  }
}

const readLocal = (key, fallback) => parse(original.get.call(localStorage, key), fallback);
const writeLocal = (key, value) =>
  original.set.call(localStorage, key, JSON.stringify(value));

// ---- save status: lets the learner SEE whether their changes reached the database ----
export const SYNC_STATUS_EVENT = "skillpath-sync-status";
let opCounter = 0;
const state = { pending: 0, failed: [], lastSaved: 0 };

const opKey = (item) => `${item.options?.method || "GET"} ${item.path}`;

export function getSyncStatus() {
  const last = state.failed[state.failed.length - 1];
  return {
    pending: state.pending,
    failed: state.failed.length,
    lastSaved: state.lastSaved,
    message: last ? last.message : "",
  };
}

function publish() {
  window.dispatchEvent(new CustomEvent(SYNC_STATUS_EVENT, { detail: getSyncStatus() }));
}

function enqueue(path, options) {
  const op = { path, options, seq: (opCounter += 1) };
  const isPut = options?.method === "PUT";
  state.pending += 1;
  publish();

  queue = queue
    .then(() => api(path, options))
    .then(() => {
      state.lastSaved = Date.now();
      // a newer successful PUT to the same address replaces any older failed one
      if (isPut) {
        state.failed = state.failed.filter((f) => !(opKey(f) === opKey(op) && f.seq < op.seq));
      }
    })
    .catch((error) => {
      console.warn("SkillPath sync failed:", path, error.message);
      if (error.status === 401) return; // session expired: the app signs the learner out
      if (isPut) state.failed = state.failed.filter((f) => opKey(f) !== opKey(op));
      state.failed.push({ ...op, message: error.message, status: error.status });
    })
    .finally(() => {
      state.pending -= 1;
      publish();
    });
}

// Sends the saves that failed again (used by the Retry button and when the browser comes back online).
export function retryFailedSaves() {
  const items = state.failed.splice(0);
  items.forEach(({ path, options }) => enqueue(path, options));
  publish();
}

const same = (a, b) => JSON.stringify(a) === JSON.stringify(b);
const num = (id) => (/^\d+$/.test(String(id)) ? Number(id) : id);

// ---- push: called whenever the pages change a synced key ----
function push(key, oldValue, newValue) {
  if (key.startsWith(PROGRESS)) {
    const slug = key.slice(PROGRESS.length);
    const lessons = Array.isArray(newValue) ? newValue.map(String) : [];
    const before = Array.isArray(oldValue) ? oldValue.length : 0;
    if (lessons.length > before && !pulling) recordActivity();
    enqueue(`/progress/${encodeURIComponent(slug)}`, { method: "PUT", body: { lessons } });
  } else if (key === ATTEMPTS) {
    if (!newValue || !Object.keys(newValue).length) {
      if (oldValue && Object.keys(oldValue).length) enqueue("/quizzes/attempts", { method: "DELETE" });
      return;
    }
    const before = oldValue || {};
    for (const [id, list] of Object.entries(newValue)) {
      const had = Array.isArray(before[id]) ? before[id].length : 0;
      (Array.isArray(list) ? list : []).slice(had).forEach((attempt) => {
        enqueue(`/quizzes/${encodeURIComponent(id)}/attempts`, { method: "POST", body: attempt });
        if (!pulling) recordActivity();
      });
    }
  } else if (key === NOTES) {
    const before = oldValue || {};
    const after = newValue || {};
    for (const noteKey of new Set([...Object.keys(before), ...Object.keys(after)])) {
      if (before[noteKey] === after[noteKey]) continue;
      const [slug, lessonId] = noteKey.split("::");
      enqueue(`/notes/${encodeURIComponent(slug)}/${encodeURIComponent(lessonId)}`, {
        method: "PUT",
        body: { text: after[noteKey] || "" },
      });
    }
  } else if (key === PRACTICE) {
    const before = oldValue || {};
    const after = newValue || {};
    for (const [challengeKey, entry] of Object.entries(after)) {
      if (same(before[challengeKey], entry)) continue;
      if (entry.solved && !before[challengeKey]?.solved && !pulling) recordActivity();
      enqueue(`/practice/${encodeURIComponent(challengeKey)}`, {
        method: "PUT",
        body: { code: entry.code || "", solved: !!entry.solved },
      });
    }
  } else if (key === ACTIVITY) {
    const before = Array.isArray(oldValue) ? oldValue : [];
    (Array.isArray(newValue) ? newValue : [])
      .filter((day) => !before.includes(day))
      .forEach((day) => enqueue("/activity", { method: "POST", body: { day } }));
  } else if (key === QUIZ) {
    if (!newValue || !Object.keys(newValue).length) {
      enqueue("/quizzes/scores", { method: "DELETE" });
      return;
    }
    const before = oldValue || {};
    for (const [id, entry] of Object.entries(newValue)) {
      if ((entry.attempts || 0) > (before[id]?.attempts || 0)) {
        enqueue(`/quizzes/${encodeURIComponent(id)}/score`, {
          method: "POST",
          body: { score: entry.last },
        });
      }
    }
  } else if (key === DONE) {
    const before = Array.isArray(oldValue) ? oldValue.map(String) : [];
    const after = Array.isArray(newValue) ? newValue.map(String) : [];
    after
      .filter((id) => !before.includes(id))
      .forEach((id) =>
        enqueue(`/projects/${encodeURIComponent(id)}/done`, { method: "PUT", body: { done: true } })
      );
    before
      .filter((id) => !after.includes(id))
      .forEach((id) =>
        enqueue(`/projects/${encodeURIComponent(id)}/done`, { method: "PUT", body: { done: false } })
      );
  } else if (key === STEPS) {
    const before = oldValue || {};
    const after = newValue || {};
    for (const id of new Set([...Object.keys(before), ...Object.keys(after)])) {
      if (!same(before[id], after[id])) {
        enqueue(`/projects/${encodeURIComponent(id)}/steps`, {
          method: "PUT",
          body: { steps: after[id] || [] },
        });
      }
    }
  } else if (key === BOOKMARKS) {
    const before = Array.isArray(oldValue) ? oldValue : [];
    const after = Array.isArray(newValue) ? newValue : [];
    after
      .filter((t) => !before.includes(t))
      .forEach((title) => enqueue("/bookmarks", { method: "POST", body: { title } }));
    before
      .filter((t) => !after.includes(t))
      .forEach((title) =>
        enqueue(`/bookmarks?title=${encodeURIComponent(title)}`, { method: "DELETE" })
      );
  } else if (key === PROFILE) {
    if (newValue && (newValue.firstName || newValue.lastName)) {
      enqueue("/profile", { method: "PUT", body: newValue });
    } else if (!newValue) {
      enqueue("/profile", { method: "DELETE" });
    }
  } else if (key === SETTINGS) {
    if (newValue) {
      enqueue("/settings", {
        method: "PUT",
        body: { goal: newValue.goal ?? "", dailyMinutes: newValue.dailyMinutes ?? 30 },
      });
    }
  }
}

// Wraps localStorage writes so changes to synced keys also reach the database.
export function installSync() {
  if (Storage.prototype.setItem.__skillpathSync) return;

  const setItem = function (key, value) {
    const track = this === localStorage && !pulling && getToken() && SYNCED_KEYS.includes(key);
    const old = track ? parse(original.get.call(this, key), null) : null;
    original.set.call(this, key, value);
    if (track) push(key, old, parse(value, null));
  };
  setItem.__skillpathSync = true;

  const removeItem = function (key) {
    const track = this === localStorage && !pulling && getToken() && SYNCED_KEYS.includes(key);
    const old = track ? parse(original.get.call(this, key), null) : null;
    original.remove.call(this, key);
    if (track) push(key, old, null);
  };

  Storage.prototype.setItem = setItem;
  Storage.prototype.removeItem = removeItem;
}

// Loads the signed-in user's data from PostgreSQL into localStorage.
// If a category is empty on the server but exists in this browser (data saved
// before accounts existed), that local data is uploaded instead.
export async function pullFromServer() {
  // The newer endpoints are optional so an older backend does not block sign-in.
  const optional = (path) => api(path).catch(() => null);
  const [progress, scores, status, bookmarks, profile, settings, attempts, notes, practice, activity] =
    await Promise.all([
      api("/progress"),
      api("/quizzes/scores"),
      api("/projects/status"),
      api("/bookmarks"),
      api("/profile"),
      api("/settings"),
      optional("/quizzes/attempts"),
      optional("/notes"),
      optional("/practice"),
      optional("/activity"),
    ]);

  pulling = true;
  try {
    // lesson progress
    for (const path of learningPaths) {
      const key = PROGRESS + path.slug;
      if (progress[path.slug]?.length) writeLocal(key, progress[path.slug]);
      else {
        const local = readLocal(key, []);
        if (Array.isArray(local) && local.length) push(key, [], local);
        else original.remove.call(localStorage, key);
      }
    }

    // quiz scores
    if (Object.keys(scores).length) writeLocal(QUIZ, scores);
    else {
      const local = readLocal(QUIZ, {});
      for (const [id, entry] of Object.entries(local)) {
        enqueue(`/quizzes/${encodeURIComponent(id)}/score`, {
          method: "POST",
          body: { score: entry.best ?? entry.last ?? 0 },
        });
      }
      if (!Object.keys(local).length) original.remove.call(localStorage, QUIZ);
    }

    // projects
    const ids = Object.keys(status);
    const doneIds = ids.filter((id) => status[id].done).map(num);
    const stepMap = {};
    ids.filter((id) => status[id].steps?.length).forEach((id) => (stepMap[id] = status[id].steps));
    if (ids.length) {
      writeLocal(DONE, doneIds);
      writeLocal(STEPS, stepMap);
    } else {
      push(DONE, [], readLocal(DONE, []));
      push(STEPS, {}, readLocal(STEPS, {}));
    }

    // bookmarks
    if (bookmarks.length) writeLocal(BOOKMARKS, bookmarks);
    else push(BOOKMARKS, [], readLocal(BOOKMARKS, []));

    // profile
    if (profile) writeLocal(PROFILE, profile);
    else {
      const local = readLocal(PROFILE, null);
      if (local) push(PROFILE, null, local);
    }

    // settings (the server returns a blank default when nothing was saved)
    if (settings?.goal) writeLocal(SETTINGS, settings);
    else {
      const local = readLocal(SETTINGS, null);
      if (local) push(SETTINGS, null, local);
    }

    // quiz attempts, notes, practice code: server copy wins, otherwise upload this browser's copy
    const restore = (key, serverValue, empty) => {
      if (serverValue === null) return; // endpoint unavailable: leave the local copy alone
      if (Object.keys(serverValue).length) writeLocal(key, serverValue);
      else {
        const local = readLocal(key, empty);
        if (Object.keys(local).length) push(key, empty, local);
        else original.remove.call(localStorage, key);
      }
    };
    restore(ATTEMPTS, attempts, {});
    restore(NOTES, notes, {});
    restore(PRACTICE, practice, {});

    // activity days: keep the union of both sides
    if (activity !== null) {
      const local = readLocal(ACTIVITY, []);
      const merged = [...new Set([...(Array.isArray(local) ? local : []), ...activity])].sort();
      if (merged.length) writeLocal(ACTIVITY, merged);
      merged.filter((day) => !activity.includes(day)).forEach((day) =>
        enqueue("/activity", { method: "POST", body: { day } })
      );
    }
  } finally {
    pulling = false;
  }
  window.dispatchEvent(new Event("skillpath-profile-updated"));
}

// Removes this user's cached data from the browser (used on sign-out).
export function clearLocalData() {
  // never carry failed saves over to the next account that signs in on this browser
  state.failed = [];
  publish();
  [
    ...SYNCED_KEYS,
    "skillpath-badges-seen",
    ...learningPaths.map((p) => `skillpath-certificate-${p.slug}`),
  ].forEach((key) => {
    try {
      original.remove.call(localStorage, key);
    } catch {
      // ignore
    }
  });
}

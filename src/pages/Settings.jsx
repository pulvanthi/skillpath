import { useState } from "react";
import { Link } from "react-router-dom";
import { learningPaths } from "../data/learningPaths";
import { api } from "../utils/api";
import { requestSignOut } from "../utils/signout";

const SETTINGS_KEY = "skillpath-settings";

function readJson(key, fallback) {
  try {
    return JSON.parse(localStorage.getItem(key) || "null") ?? fallback;
  } catch {
    return fallback;
  }
}

export default function Settings() {
  const profile = readJson("skillpath-user-profile", {});
  const fullName = `${profile.firstName || ""} ${profile.lastName || ""}`.trim();

  const [settings, setSettings] = useState(() => ({
    goal: "Improve programming skills",
    dailyMinutes: 30,
    ...readJson(SETTINGS_KEY, {}),
  }));
  const [message, setMessage] = useState("");
  const [resetMessage, setResetMessage] = useState(null); // { ok, text } shown inside the Reset card
  const [busy, setBusy] = useState(false);

  function save(event) {
    event.preventDefault();
    try {
      localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
      setMessage("Settings saved.");
    } catch {
      setMessage("Could not save settings in this browser.");
    }
  }

  // Resets on the server FIRST and only clears this browser once the server has confirmed.
  // (If the backend is not running, nothing is reset, instead of clearing the browser and
  // having the old data come back from the account on the next refresh.)
  async function resetData(label, keys, serverCalls) {
    if (!window.confirm(`Reset ${label}? This cannot be undone.`)) return;
    setBusy(true);
    setResetMessage(null);
    try {
      await Promise.all(serverCalls());
      keys.forEach((key) => localStorage.removeItem(key));
      setResetMessage({ ok: true, text: `Done. Your ${label} were reset.` });
    } catch (error) {
      setResetMessage({
        ok: false,
        text:
          error.status === 0
            ? "Could not reach the server, so nothing was reset. Start the backend and try again."
            : `Could not reset ${label}: ${error.message}`,
      });
    } finally {
      setBusy(false);
    }
  }

  const lessonKeys = learningPaths.map((p) => `skillpath-progress-${p.slug}`);
  const lessonCalls = () =>
    learningPaths.map((p) =>
      api(`/progress/${encodeURIComponent(p.slug)}`, { method: "PUT", body: { lessons: [] } })
    );
  const quizCalls = () => [
    api("/quizzes/scores", { method: "DELETE" }),
    api("/quizzes/attempts", { method: "DELETE" }),
  ];
  const projectCalls = () => [api("/projects/status", { method: "DELETE" })];
  const bookmarkCalls = () => [api("/bookmarks/all", { method: "DELETE" })];

  return (
    <section className="content-page settings-page">
      <h1>Settings</h1>
      <p>Manage your learning preferences.</p>

      <div className="learning-page-card">
        <h2>Profile</h2>
        <p>Name: {fullName || "Not set yet"}</p>
        <Link className="secondary-button" to="/profile">
          Edit profile
        </Link>
      </div>

      <form className="learning-page-card" onSubmit={save}>
        <h2>Learning preferences</h2>

        <label htmlFor="goal">Learning goal</label>
        <input
          id="goal"
          className="settings-input"
          value={settings.goal}
          onChange={(e) => setSettings({ ...settings, goal: e.target.value })}
        />

        <label htmlFor="minutes">Daily study goal</label>
        <select
          id="minutes"
          className="settings-input"
          value={settings.dailyMinutes}
          onChange={(e) =>
            setSettings({ ...settings, dailyMinutes: Number(e.target.value) })
          }
        >
          {[15, 30, 45, 60, 90, 120].map((m) => (
            <option key={m} value={m}>
              {m} minutes a day
            </option>
          ))}
        </select>

        <button className="primary-button" type="submit">
          Save settings
        </button>
      </form>

      <div className="learning-page-card">
        <h2>Reset data</h2>
        <p>Your progress is saved to your SkillPath account.</p>
        <div className="practice-actions">
          <button
            className="secondary-button"
            disabled={busy}
            onClick={() => resetData("lesson progress", lessonKeys, lessonCalls)}
          >
            Reset lesson progress
          </button>
          <button
            className="secondary-button"
            disabled={busy}
            onClick={() =>
              resetData(
                "quiz scores and attempt history",
                ["skillpath-quiz-scores", "skillpath-quiz-attempts"],
                quizCalls
              )
            }
          >
            Reset quiz scores
          </button>
          <button
            className="secondary-button"
            disabled={busy}
            onClick={() =>
              resetData(
                "project progress",
                ["skillpath-projects-done", "skillpath-project-steps"],
                projectCalls
              )
            }
          >
            Reset projects
          </button>
          <button
            className="secondary-button"
            disabled={busy}
            onClick={() => resetData("bookmarks", ["skillpath-bookmarks"], bookmarkCalls)}
          >
            Reset bookmarks
          </button>
        </div>
        {busy && <p role="status">Resetting...</p>}
        {resetMessage && (
          <p
            role="status"
            className={resetMessage.ok ? "practice-result pass" : "practice-result fail"}
          >
            {resetMessage.text}
          </p>
        )}
      </div>

      <div className="learning-page-card">
        <h2>Account</h2>
        <p>Sign out of this browser. Your progress stays saved in your account.</p>
        <button
          className="secondary-button"
          onClick={requestSignOut}
        >
          Sign out
        </button>
      </div>

      {message && (
        <p className="practice-result pass" role="status">
          {message}
        </p>
      )}
    </section>
  );
}

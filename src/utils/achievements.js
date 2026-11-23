// Course badges. A badge is earned only when BOTH are true for a learning path:
//   1. every lesson in every module is marked complete, and
//   2. the learner's best score on that path's quiz is at least PASS_MARK.
// The certificate uses the same rule. The status is worked out from the saved lesson
// progress and quiz scores (which sync to the API), so there is nothing extra to store.
import { learningPaths } from "../data/learningPaths.js";
import { PASS_MARK, quizQuestions } from "../data/quizQuestions.js";
import { getCourseProgress } from "./progress.js";

export const BADGE_EVENT = "skillpath-badge-earned";
export const BADGES_SEEN_KEY = "skillpath-badges-seen"; // paths already congratulated in this browser

function readJson(key, fallback) {
  try {
    return JSON.parse(localStorage.getItem(key) || "null") ?? fallback;
  } catch {
    return fallback;
  }
}

export function getCourseStatus(slug) {
  const { done, total, percent } = getCourseProgress(slug);
  const scores = readJson("skillpath-quiz-scores", {});
  const best = typeof scores[slug]?.best === "number" ? scores[slug].best : null;
  const hasQuiz = Boolean(quizQuestions[slug]);

  const lessonsComplete = total > 0 && done >= total;
  const quizPassed = hasQuiz ? best !== null && best >= PASS_MARK : true;

  return {
    slug,
    done,
    total,
    percent,
    best,
    hasQuiz,
    passMark: PASS_MARK,
    lessonsComplete,
    quizPassed,
    earned: lessonsComplete && quizPassed,
  };
}

// What still stands between the learner and the badge, in plain words.
export function missingSteps(status) {
  const steps = [];
  if (!status.lessonsComplete) {
    steps.push(`Complete all ${status.total} lessons (${status.done} done)`);
  }
  if (!status.quizPassed) {
    steps.push(
      status.best === null
        ? `Take the quiz and score ${status.passMark}% or more`
        : `Score ${status.passMark}% or more on the quiz (your best is ${status.best}%)`
    );
  }
  return steps;
}

export function getEarnedSlugs() {
  return learningPaths.filter((path) => getCourseStatus(path.slug).earned).map((path) => path.slug);
}

// First name from the learner's profile, so the congratulations can address them.
export function learnerFirstName() {
  const profile = readJson("skillpath-user-profile", null);
  return typeof profile?.firstName === "string" ? profile.firstName.trim() : "";
}

// Shows the congratulations pop-up for a badge that has been earned (used by the
// "Show congratulations" button, so the learner can see it again at any time).
export function showCongratulations(slug) {
  if (getCourseStatus(slug).earned) {
    window.dispatchEvent(new CustomEvent(BADGE_EVENT, { detail: { slug } }));
  }
}

// Call right after lesson progress or a quiz score is saved. Shows the congratulations
// once for each path whose badge has just been earned.
export function announceNewBadges() {
  try {
    const seen = readJson(BADGES_SEEN_KEY, []);
    const fresh = getEarnedSlugs().filter((slug) => !seen.includes(slug));
    if (!fresh.length) return;
    localStorage.setItem(BADGES_SEEN_KEY, JSON.stringify([...seen, ...fresh]));
    fresh.forEach((slug) => window.dispatchEvent(new CustomEvent(BADGE_EVENT, { detail: { slug } })));
  } catch {
    // storage unavailable: the badge still shows on the course page, just without the pop-up
  }
}

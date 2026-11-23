// Learning activity and streaks.
// A "learning day" is any local calendar day with at least one completed lesson, quiz
// attempt or solved practice challenge. utils/sync.js calls recordActivity() when it
// sees one of those changes, and mirrors the stored days to the API.
export const ACTIVITY_KEY = "skillpath-activity";

// Local calendar date as YYYY-MM-DD (not UTC, so a streak follows the learner's own day).
export function localDay(date = new Date()) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export function getActivityDays() {
  try {
    const value = JSON.parse(localStorage.getItem(ACTIVITY_KEY) || "[]");
    return Array.isArray(value) ? value : [];
  } catch {
    return [];
  }
}

export function recordActivity() {
  try {
    const days = getActivityDays();
    const today = localDay();
    if (!days.includes(today)) {
      localStorage.setItem(ACTIVITY_KEY, JSON.stringify([...days, today].sort()));
    }
  } catch {
    // storage unavailable: streaks just won't update
  }
}

function previousDay(day) {
  const [y, m, d] = day.split("-").map(Number);
  return localDay(new Date(y, m - 1, d - 1));
}

// current: consecutive days ending today (or yesterday, so a streak is not shown as
// lost before the learner has had a chance to study today). longest: best run ever.
export function getStreak(days = getActivityDays()) {
  const set = new Set(days);
  const today = localDay();
  const doneToday = set.has(today);

  let current = 0;
  let cursor = doneToday ? today : previousDay(today);
  while (set.has(cursor)) {
    current += 1;
    cursor = previousDay(cursor);
  }

  let longest = 0;
  let run = 0;
  let previous = null;
  [...set].sort().forEach((day) => {
    run = previous && previousDay(day) === previous ? run + 1 : 1;
    longest = Math.max(longest, run);
    previous = day;
  });

  return { current, longest, doneToday, totalDays: set.size };
}

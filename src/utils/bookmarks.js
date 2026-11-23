const KEY = "skillpath-bookmarks";

export function getBookmarks() {
  try {
    const saved = JSON.parse(localStorage.getItem(KEY) || "[]");
    return Array.isArray(saved) ? saved : [];
  } catch {
    return [];
  }
}

export function setBookmarks(list) {
  try {
    localStorage.setItem(KEY, JSON.stringify(list));
  } catch {
    // storage unavailable: bookmarks just won't persist
  }
}

// Returns the new list after adding or removing the title.
export function toggleBookmark(title) {
  const current = getBookmarks();
  const next = current.includes(title)
    ? current.filter((item) => item !== title)
    : [...current, title];
  setBookmarks(next);
  return next;
}

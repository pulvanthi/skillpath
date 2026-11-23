import { courseContent } from "../data/courseContent";
import { learningPaths } from "../data/learningPaths";

function readList(key) {
  try {
    const value = JSON.parse(localStorage.getItem(key) || "[]");
    return Array.isArray(value) ? value : [];
  } catch {
    return [];
  }
}

export function getCourseProgress(slug) {
  const content = courseContent[slug];
  const total = content
    ? content.modules.reduce((sum, module) => sum + module.lessons.length, 0)
    : 0;
  const done = Math.min(readList(`skillpath-progress-${slug}`).length, total);
  const percent = total ? Math.round((done / total) * 100) : 0;
  return { done, total, percent };
}

export function getOverallProgress() {
  let done = 0;
  let total = 0;
  learningPaths.forEach((path) => {
    const progress = getCourseProgress(path.slug);
    done += progress.done;
    total += progress.total;
  });
  return total ? Math.round((done / total) * 100) : 0;
}

import { Link } from "react-router-dom";
import { learningPaths } from "../data/learningPaths";
import { courseContent } from "../data/courseContent";
import projects from "../data/projects";
import { getStreak } from "../utils/activity";
import Badge from "../components/Badge";
import { getCourseStatus } from "../utils/achievements";
import { PASS_MARK } from "../data/quizQuestions";

function readCompleted(slug) {
  try {
    const saved = JSON.parse(
      localStorage.getItem(`skillpath-progress-${slug}`) || "[]"
    );
    return Array.isArray(saved) ? saved.length : 0;
  } catch {
    return 0;
  }
}

function readJson(key, fallback) {
  try {
    const value = JSON.parse(localStorage.getItem(key) || "null");
    return value ?? fallback;
  } catch {
    return fallback;
  }
}

export default function MyProgress() {
  const streak = getStreak();
  const quizScores = readJson("skillpath-quiz-scores", {});
  const quizEntries = Object.values(quizScores);
  const quizAverage = quizEntries.length
    ? Math.round(
        quizEntries.reduce((sum, entry) => sum + entry.best, 0) /
          quizEntries.length
      )
    : null;

  const doneProjectIds = readJson("skillpath-projects-done", []);
  const projectsDone = projects.filter((p) =>
    doneProjectIds.includes(p.id)
  ).length;

  const courses = learningPaths
    .filter((path) => courseContent[path.slug])
    .map((path) => {
      const total = courseContent[path.slug].modules.reduce(
        (sum, module) => sum + module.lessons.length,
        0
      );
      const done = Math.min(readCompleted(path.slug), total);
      const percent = total ? Math.round((done / total) * 100) : 0;
      return { slug: path.slug, title: path.title, total, done, percent };
    });

  const lessonsDone = courses.reduce((sum, c) => sum + c.done, 0);
  const lessonsTotal = courses.reduce((sum, c) => sum + c.total, 0);
  const overall = lessonsTotal ? Math.round((lessonsDone / lessonsTotal) * 100) : 0;
  const badges = courses.map((course) => ({
    ...getCourseStatus(course.slug),
    title: course.title,
  }));
  const started = courses.filter((c) => c.done > 0);
  const finished = courses.filter((c) => c.total > 0 && c.done === c.total);

  return (
    <section className="content-page">
      <h1>My Progress</h1>
      <p>Track your lessons, quiz scores, and completed projects.</p>

      <div className="page-card-grid">
        <article className="learning-page-card">
          <h2>Learning Streak</h2>
          <p>
            {streak.current} {streak.current === 1 ? "day" : "days"} in a row
            (longest {streak.longest})
          </p>
          <p>
            Daily goal:{" "}
            {streak.doneToday
              ? "done today ✓"
              : "finish one lesson, quiz or practice challenge today"}
          </p>
        </article>
        <article className="learning-page-card">
          <h2>Lessons Completed</h2>
          <p>
            {lessonsDone} of {lessonsTotal} lessons ({overall}%)
          </p>
        </article>
        <article className="learning-page-card">
          <h2>Courses Started</h2>
          <p>
            {started.length} started, {finished.length} finished
          </p>
        </article>
        <article className="learning-page-card">
          <h2>Quiz Average</h2>
          <p>
            {quizAverage === null
              ? "No quizzes taken yet"
              : `${quizAverage}% across ${quizEntries.length} ${
                  quizEntries.length === 1 ? "quiz" : "quizzes"
                } (best scores)`}
          </p>
        </article>
        <article className="learning-page-card">
          <h2>Projects Completed</h2>
          <p>
            {projectsDone} of {projects.length} projects completed
          </p>
        </article>
      </div>

      <h2 className="progress-heading">
        Your badges ({badges.filter((b) => b.earned).length} of {badges.length})
      </h2>
      <p>
        A badge needs every lesson completed and a quiz score of at least{" "}
        {PASS_MARK}%. Earned badges open your certificate.
      </p>
      <div className="badge-grid">
        {badges.map((badge) => (
          <Link
            key={badge.slug}
            className={badge.earned ? "badge-tile earned" : "badge-tile"}
            to={badge.earned ? `/learning-paths/${badge.slug}/certificate` : `/learning-paths/${badge.slug}`}
          >
            <Badge title={badge.title} earned={badge.earned} size={64} />
            <strong>{badge.title}</strong>
            <small>
              {badge.earned
                ? "Earned · view certificate"
                : `${badge.lessonsComplete ? "Lessons ✓" : `Lessons ${badge.done}/${badge.total}`} · ${
                    badge.quizPassed ? "Quiz ✓" : badge.best === null ? "Quiz not taken" : `Quiz ${badge.best}%`
                  }`}
            </small>
          </Link>
        ))}
      </div>

      <h2 className="progress-heading">Progress by course</h2>

      <div className="progress-list">
        {courses.map((course) => (
          <Link
            to={`/learning-paths/${course.slug}`}
            className="progress-row"
            key={course.slug}
          >
            <div className="progress-row-top">
              <strong>{course.title}</strong>
              <span>
                {course.done}/{course.total} lessons · {course.percent}%
              </span>
            </div>
            <div className="progress-bar">
              <div
                className="progress-bar-fill"
                style={{ width: `${course.percent}%` }}
              />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

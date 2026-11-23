import { useNavigate } from "react-router-dom";
import { quizzes, quizQuestions, PASS_MARK } from "../data/quizQuestions";
import { getCourseProgress } from "../utils/progress";
import "./Quiz.css";

function readScores() {
  try {
    const value = JSON.parse(localStorage.getItem("skillpath-quiz-scores") || "{}");
    return value && typeof value === "object" ? value : {};
  } catch {
    return {};
  }
}

export default function Quizzes() {
  const navigate = useNavigate();
  const scores = readScores();

  return (
    <section className="content-page quiz-page">
      <h1>Quizzes</h1>
      <p>
        Every learning path has its own quiz. Questions come only from that
        path&apos;s lessons, one for each lesson, in a new random order every time.
        Score {PASS_MARK}% or more to pass.
      </p>

      <div className="page-card-grid">
        {quizzes.map((quiz) => {
          const score = scores[quiz.id];
          const progress = getCourseProgress(quiz.slug);
          const ready = progress.total > 0 && progress.done >= progress.total;

          return (
            <article className="learning-page-card" key={quiz.id}>
              <h2>{quiz.title}</h2>
              <p>{quiz.description}</p>
              <p className="quiz-card-meta">
                {quizQuestions[quiz.id].length} questions · {quiz.modules} modules ·{" "}
                {quiz.level}
              </p>

              <div className="quiz-card-stats">
                <span>
                  Lessons done:{" "}
                  <strong>
                    {progress.done}/{progress.total}
                  </strong>
                </span>
                <span>
                  Best score:{" "}
                  <strong className={score?.best >= PASS_MARK ? "quiz-pass-badge" : ""}>
                    {score ? `${score.best}%` : "Not taken"}
                  </strong>
                </span>
                {score && (
                  <span>
                    Attempts: <strong>{score.attempts}</strong>
                  </span>
                )}
              </div>

              {!ready && (
                <p className="quiz-tip">
                  Tip: finish the lessons first for the best result.
                </p>
              )}

              <div className="quiz-card-actions">
                <button
                  className="primary-button"
                  onClick={() => navigate(`/quizzes/${quiz.id}`)}
                >
                  {score ? "Retake Quiz →" : "Start Quiz →"}
                </button>
                <button
                  className="secondary-button"
                  onClick={() => navigate(`/quizzes/${quiz.id}/history`)}
                >
                  History
                </button>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

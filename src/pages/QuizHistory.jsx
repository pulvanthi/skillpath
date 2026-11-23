import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { quizzes, quizQuestions } from "../data/quizQuestions";
import QuizReview from "../components/QuizReview";

function readAttempts(quizId) {
  try {
    const all = JSON.parse(localStorage.getItem("skillpath-quiz-attempts") || "{}");
    return Array.isArray(all[quizId]) ? all[quizId] : [];
  } catch {
    return [];
  }
}

export default function QuizHistory() {
  const { quizId } = useParams();
  const navigate = useNavigate();
  const quiz = quizzes.find((item) => item.id === quizId);
  const questions = quizQuestions[quizId] || [];
  const [open, setOpen] = useState(null);

  if (!quiz) {
    return (
      <section className="content-page quiz-page">
        <h1>Quiz not found</h1>
        <button className="primary-button" onClick={() => navigate("/quizzes")}>
          Back to Quizzes
        </button>
      </section>
    );
  }

  // newest first; keep the original position so attempts are numbered in order
  const attempts = readAttempts(quizId)
    .map((attempt, i) => ({ ...attempt, number: i + 1 }))
    .reverse();
  const best = attempts.reduce((max, a) => Math.max(max, a.score), 0);

  return (
    <section className="content-page quiz-page">
      <h1>{quiz.title}: attempt history</h1>
      <p>
        {attempts.length
          ? `${attempts.length} attempt${attempts.length === 1 ? "" : "s"} · best score ${best}%`
          : "You have not taken this quiz yet."}
      </p>

      <div className="quiz-history-list">
        {attempts.map((attempt) => {
          const isOpen = open === attempt.number;
          return (
            <article className="quiz-history-item" key={attempt.number}>
              <button
                type="button"
                className="quiz-history-head"
                aria-expanded={isOpen}
                onClick={() => setOpen(isOpen ? null : attempt.number)}
              >
                <span>
                  Attempt {attempt.number} · {new Date(attempt.takenAt).toLocaleString()}
                </span>
                <span className={`quiz-history-score ${attempt.score === best ? "best" : ""}`}>
                  {attempt.correct}/{attempt.total} · {attempt.score}%
                </span>
              </button>
              {isOpen && <QuizReview questions={questions} answers={attempt.answers || []} />}
            </article>
          );
        })}
      </div>

      <div className="quiz-controls">
        <Link className="primary-button" to={`/quizzes/${quizId}`}>
          Take Quiz
        </Link>
        <button className="secondary-button" onClick={() => navigate("/quizzes")}>
          Back to Quizzes
        </button>
      </div>
    </section>
  );
}

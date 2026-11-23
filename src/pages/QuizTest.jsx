import { useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { quizzes, quizQuestions as allQuestions, PASS_MARK } from "../data/quizQuestions";
import QuizReview from "../components/QuizReview";
import { announceNewBadges, getCourseStatus, missingSteps } from "../utils/achievements";
import "./Quiz.css";

function shuffled(count) {
  const list = Array.from({ length: count }, (_, i) => i);
  for (let i = list.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [list[i], list[j]] = [list[j], list[i]];
  }
  return list;
}

// A fresh random order of the questions, and of each question's options, for every attempt.
// Answers are still stored by the ORIGINAL question and option positions, so scoring,
// the review screen and the saved attempt history do not depend on the shuffle.
function buildPlan(questions) {
  return {
    order: shuffled(questions.length),
    options: questions.map((question) => shuffled(question.options.length)),
  };
}

export default function QuizTest() {
  const { quizId } = useParams();
  const navigate = useNavigate();

  const quiz = quizzes.find((item) => item.id === quizId);
  const quizQuestions = allQuestions[quizId] || [];

  const [round, setRound] = useState(0); // bumped on retake to reshuffle
  const plan = useMemo(() => buildPlan(quizQuestions), [quizId, round]); // eslint-disable-line react-hooks/exhaustive-deps
  const [current, setCurrent] = useState(0); // position in the shuffled order
  const [answers, setAnswers] = useState({}); // original question index -> original option index
  const [finished, setFinished] = useState(false);

  if (!quizQuestions.length) {
    return (
      <section className="content-page quiz-page">
        <h1>Quiz not found</h1>
        <button className="primary-button" onClick={() => navigate("/quizzes")}>
          Back to Quizzes
        </button>
      </section>
    );
  }

  const questionIndex = plan.order[current];
  const question = quizQuestions[questionIndex];

  const score = quizQuestions.reduce(
    (total, item, index) => total + (answers[index] === item.answer ? 1 : 0),
    0
  );
  const percent = Math.round((score / quizQuestions.length) * 100);
  const passed = percent >= PASS_MARK;
  const unanswered = quizQuestions.length - Object.keys(answers).length;

  // how the learner did in each module of the course
  const modules = [];
  quizQuestions.forEach((item, index) => {
    let entry = modules.find((m) => m.name === item.module);
    if (!entry) {
      entry = { name: item.module, correct: 0, total: 0, missed: [] };
      modules.push(entry);
    }
    entry.total += 1;
    if (answers[index] === item.answer) entry.correct += 1;
    else entry.missed.push(item.lesson);
  });
  const toRevise = modules.flatMap((m) =>
    m.missed.map((lesson) => ({ module: m.name, lesson }))
  );

  function submitQuiz() {
    try {
      // full attempt (with answers) so it can be reviewed later from the history page
      const attempts = JSON.parse(
        localStorage.getItem("skillpath-quiz-attempts") || "{}"
      );
      attempts[quizId] = [
        ...(attempts[quizId] || []),
        {
          takenAt: new Date().toISOString(),
          score: percent,
          correct: score,
          total: quizQuestions.length,
          answers: quizQuestions.map((_, i) => answers[i] ?? null),
        },
      ];
      localStorage.setItem("skillpath-quiz-attempts", JSON.stringify(attempts));
    } catch {
      // storage unavailable: history just won't be saved
    }
    try {
      const saved = JSON.parse(
        localStorage.getItem("skillpath-quiz-scores") || "{}"
      );
      const previous = saved[quizId] || { best: 0, attempts: 0 };
      saved[quizId] = {
        last: percent,
        best: Math.max(previous.best, percent),
        attempts: previous.attempts + 1,
      };
      localStorage.setItem("skillpath-quiz-scores", JSON.stringify(saved));
    } catch {
      // storage unavailable: the quiz still works, the score just isn't saved
    }
    announceNewBadges(); // congratulates the learner if this pass completes the badge
    setFinished(true);
  }

  function retake() {
    setAnswers({});
    setCurrent(0);
    setFinished(false);
    setRound((value) => value + 1);
  }

  if (finished) {
    return (
      <section className="content-page quiz-page">
        <div className="learning-page-card quiz-result">
          <h1>{passed ? "Quiz passed!" : "Keep practising"}</h1>
          <p className="quiz-score">{percent}%</p>
          <p>
            You scored {score} out of {quizQuestions.length}. The pass mark is{" "}
            {PASS_MARK}%.
          </p>

          {(() => {
            // the badge needs every lesson done AND a pass, so say where the learner stands
            const status = getCourseStatus(quizId);
            const steps = missingSteps(status);
            if (status.earned) {
              return (
                <p className="quiz-badge-note earned">
                  Badge earned! <Link to={`/learning-paths/${quiz.slug}/certificate`}>View your certificate</Link>
                </p>
              );
            }
            return (
              <p className="quiz-badge-note">
                {passed
                  ? "You passed the quiz, but the badge also needs every lesson completed."
                  : `You need ${PASS_MARK}% to pass this quiz and count toward the badge.`}{" "}
                Still needed: {steps.join("; ")}.{" "}
                <Link to={`/learning-paths/${quiz.slug}`}>See badge progress</Link>
              </p>
            );
          })()}

          <h2 className="quiz-section-title">Your score by module</h2>
          <div className="quiz-modules">
            {modules.map((module) => {
              const modulePercent = Math.round((module.correct / module.total) * 100);
              return (
                <div className="quiz-module-row" key={module.name}>
                  <div className="quiz-module-top">
                    <strong>{module.name}</strong>
                    <span>
                      {module.correct}/{module.total} · {modulePercent}%
                    </span>
                  </div>
                  <div className="progress-bar">
                    <div
                      className="progress-bar-fill"
                      style={{ width: `${modulePercent}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <h2 className="quiz-section-title">Lessons to revise</h2>
          {toRevise.length === 0 ? (
            <p>Every lesson answered correctly. Nothing to revise.</p>
          ) : (
            <>
              <ul className="quiz-revise-list">
                {toRevise.map((item) => (
                  <li key={`${item.module}-${item.lesson}`}>
                    <strong>{item.lesson}</strong> <small>({item.module})</small>
                  </li>
                ))}
              </ul>
              <Link className="secondary-button" to={`/learning-paths/${quiz.slug}/lessons`}>
                Open the lessons
              </Link>
            </>
          )}

          <h2 className="quiz-section-title">Question review</h2>
          <QuizReview questions={quizQuestions} answers={answers} />

          <div className="quiz-controls">
            <button className="secondary-button" onClick={retake}>
              Retake Quiz
            </button>
            <button
              className="secondary-button"
              onClick={() => navigate(`/quizzes/${quizId}/history`)}
            >
              View History
            </button>
            <button
              className="primary-button"
              onClick={() => navigate("/quizzes")}
            >
              Back to Quizzes
            </button>
          </div>
        </div>
      </section>
    );
  }

  const isLast = current === quizQuestions.length - 1;

  return (
    <section className="content-page quiz-page">
      <p className="quiz-meta">
        {quiz?.title} · Question {current + 1} of {quizQuestions.length}
      </p>
      <div className="quiz-progress">
        <div
          className="quiz-progress-fill"
          style={{ width: `${((current + 1) / quizQuestions.length) * 100}%` }}
        />
      </div>

      <p className="quiz-lesson-tag">
        {question.module} · {question.lesson}
      </p>
      <h1 className="quiz-question">{question.question}</h1>

      <div className="quiz-options">
        {plan.options[questionIndex].map((optionIndex) => (
          <button
            key={optionIndex}
            className={
              answers[questionIndex] === optionIndex
                ? "quiz-option selected"
                : "quiz-option"
            }
            onClick={() =>
              setAnswers((previous) => ({ ...previous, [questionIndex]: optionIndex }))
            }
          >
            {question.options[optionIndex]}
          </button>
        ))}
      </div>

      {answers[questionIndex] === undefined && (
        <p className="quiz-hint">Select an answer, or skip with Next.</p>
      )}
      {isLast && unanswered > 0 && (
        <p className="quiz-hint">
          {unanswered} question{unanswered === 1 ? "" : "s"} unanswered. Use Previous to
          go back, or submit and they count as wrong.
        </p>
      )}

      <div className="quiz-controls">
        <button
          className="secondary-button"
          disabled={current === 0}
          onClick={() => setCurrent((value) => value - 1)}
        >
          Previous
        </button>

        {!isLast ? (
          <button
            className="primary-button"
            onClick={() => setCurrent((value) => value + 1)}
          >
            Next →
          </button>
        ) : (
          <button className="primary-button" onClick={submitQuiz}>
            Submit Quiz
          </button>
        )}
      </div>
    </section>
  );
}

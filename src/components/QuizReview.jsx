import "./QuizReview.css";

// Question-by-question review. `answers[i]` is the option index the learner chose
// (null/undefined = skipped). Wrong and skipped answers show the right answer and why.
export default function QuizReview({ questions, answers }) {
  return (
    <div className="quiz-review">
      {questions.map((item, index) => {
        const chosen = answers[index];
        const skipped = chosen === undefined || chosen === null;
        const correct = chosen === item.answer;
        return (
          <div
            key={item.question}
            className={`quiz-review-item ${correct ? "right" : "wrong"}`}
          >
            <strong>
              {index + 1}. {item.question}
            </strong>
            {item.lesson && (
              <small className="quiz-review-lesson">
                {item.module} · {item.lesson}
              </small>
            )}
            <span>
              {correct ? "Correct: " : skipped ? "Skipped. " : "Your answer: "}
              {correct ? item.options[item.answer] : skipped ? "" : item.options[chosen]}
              {!correct && ` · Correct answer: ${item.options[item.answer]}`}
            </span>
            {!correct && item.explanation && (
              <p className="quiz-explanation">{item.explanation}</p>
            )}
          </div>
        );
      })}
    </div>
  );
}

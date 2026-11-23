import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Badge from "./Badge";
import { learningPaths } from "../data/learningPaths";
import { getCourseStatus, learnerFirstName, BADGE_EVENT } from "../utils/achievements";
import "./Badge.css";

// Pop-up shown when a learner earns a course badge (all lessons done AND quiz passed).
// Several badges earned at once are shown one after the other.
export default function CongratsModal() {
  const navigate = useNavigate();
  const [queue, setQueue] = useState([]);
  const primaryRef = useRef(null);

  useEffect(() => {
    function onEarned(event) {
      setQueue((current) =>
        current.includes(event.detail.slug) ? current : [...current, event.detail.slug]
      );
    }
    window.addEventListener(BADGE_EVENT, onEarned);
    return () => window.removeEventListener(BADGE_EVENT, onEarned);
  }, []);

  const slug = queue[0];
  const close = () => setQueue((current) => current.slice(1));

  useEffect(() => {
    if (!slug) return undefined;
    primaryRef.current?.focus();
    const onKey = (event) => event.key === "Escape" && close();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [slug]);

  if (!slug) return null;
  const course = learningPaths.find((path) => path.slug === slug);
  if (!course) return null;
  const status = getCourseStatus(slug);

  return (
    <div className="congrats-overlay" onMouseDown={(event) => event.target === event.currentTarget && close()}>
      <div className="congrats-card" role="dialog" aria-modal="true" aria-labelledby="congrats-title">
        <div className="congrats-confetti" aria-hidden="true">
          {Array.from({ length: 18 }, (_, i) => (
            <span key={i} style={{ "--i": i }} />
          ))}
        </div>

        <Badge title={course.title} earned size={120} />
        <h2 id="congrats-title">
          Congratulations{learnerFirstName() ? `, ${learnerFirstName()}` : ""}!
        </h2>
        <p>
          You earned the <strong>{course.title}</strong> badge. You completed all{" "}
          {status.total} lessons and passed the quiz with {status.best}%.
        </p>

        <div className="congrats-actions">
          <button
            ref={primaryRef}
            className="primary-button"
            onClick={() => {
              close();
              navigate(`/learning-paths/${slug}/certificate`);
            }}
          >
            View certificate
          </button>
          <button className="secondary-button" onClick={close}>
            {queue.length > 1 ? "Next badge" : "Close"}
          </button>
        </div>
      </div>
    </div>
  );
}

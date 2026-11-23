import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Printer } from "lucide-react";
import { learningPaths } from "../data/learningPaths";
import Badge from "../components/Badge";
import { getCourseStatus, missingSteps } from "../utils/achievements";
import "./Certificate.css";

// The first time a path is seen as earned the date is remembered, so the certificate
// keeps the same completion date afterwards. (Stored in this browser only.)
function completionDate(slug) {
  const key = `skillpath-certificate-${slug}`;
  try {
    const saved = localStorage.getItem(key);
    if (saved) return new Date(saved);
    const now = new Date();
    localStorage.setItem(key, now.toISOString());
    return now;
  } catch {
    return new Date();
  }
}

function learnerName() {
  try {
    const profile = JSON.parse(localStorage.getItem("skillpath-user-profile") || "null");
    const name = `${profile?.firstName || ""} ${profile?.lastName || ""}`.trim();
    return name || "SkillPath Learner";
  } catch {
    return "SkillPath Learner";
  }
}

export default function Certificate() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const course = learningPaths.find((item) => item.slug === slug);

  if (!course) {
    return (
      <section className="content-page">
        <h1>Learning path not found</h1>
        <button className="back-button" onClick={() => navigate("/learning-paths")}>
          <ArrowLeft size={17} /> Back to Learning Paths
        </button>
      </section>
    );
  }

  const status = getCourseStatus(slug);

  // The certificate and the badge follow the same rule: every lesson complete AND the quiz passed.
  if (!status.earned) {
    return (
      <section className="content-page">
        <button className="back-button" onClick={() => navigate(`/learning-paths/${slug}`)}>
          <ArrowLeft size={17} /> Back to {course.title}
        </button>
        <Badge title={course.title} earned={false} size={90} />
        <h1>Certificate not available yet</h1>
        <p>To earn the {course.title} badge and certificate you need to do both of these:</p>
        <ul>
          <li>
            {status.lessonsComplete ? "✓" : "○"} Complete every lesson in every module (
            {status.done} of {status.total} done)
          </li>
          <li>
            {status.quizPassed ? "✓" : "○"} Score {status.passMark}% or more on the quiz
            {status.best !== null ? ` (your best is ${status.best}%)` : " (not taken yet)"}
          </li>
        </ul>
        <p>Still needed: {missingSteps(status).join("; ")}.</p>
        <div className="certificate-actions">
          {!status.lessonsComplete && (
            <Link className="primary-button" to={`/learning-paths/${slug}/lessons`}>
              Continue lessons
            </Link>
          )}
          {!status.quizPassed && (
            <Link
              className={status.lessonsComplete ? "primary-button" : "secondary-button"}
              to={`/quizzes/${slug}`}
            >
              {status.best === null ? "Take the quiz" : "Retake the quiz"}
            </Link>
          )}
        </div>
      </section>
    );
  }

  const date = completionDate(slug);

  return (
    <section className="content-page certificate-page">
      <div className="certificate-actions">
        <button className="back-button" onClick={() => navigate(`/learning-paths/${slug}`)}>
          <ArrowLeft size={17} /> Back to {course.title}
        </button>
        <button className="primary-button" onClick={() => window.print()}>
          <Printer size={16} /> Print or save as PDF
        </button>
      </div>

      <div className="certificate" role="img" aria-label={`Certificate of completion for ${course.title}`}>
        <p className="certificate-brand">SkillPath</p>
        <h1>Certificate of Completion</h1>
        <p>This certifies that</p>
        <p className="certificate-name">{learnerName()}</p>
        <p>
          has completed all {status.total} lessons of
        </p>
        <p className="certificate-course">{course.title}</p>
        <p>and passed the course quiz with {status.best}%.</p>
        <p className="certificate-date">
          Completed on{" "}
          {date.toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" })}
        </p>
      </div>
    </section>
  );
}

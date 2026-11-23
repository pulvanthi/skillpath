import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, CheckCircle, ChevronDown, ExternalLink, PlayCircle } from "lucide-react";
import { learningPaths } from "../data/learningPaths";
import { courseContent } from "../data/courseContent";
import { courseVideos } from "../data/courseVideos";
import LessonNote from "../components/LessonNote";
import { announceNewBadges } from "../utils/achievements";
import "./Lessons.css";

// Same key LearningPathDetails uses. utils/sync.js mirrors every write to this key
// to PUT /progress/{slug}, so completing a lesson here is saved to PostgreSQL too.
const progressKey = (slug) => `skillpath-progress-${slug}`;

function readCompleted(slug) {
  try {
    const value = JSON.parse(localStorage.getItem(progressKey(slug)) || "[]");
    return Array.isArray(value) ? value : [];
  } catch {
    return [];
  }
}

export default function Lessons() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const course = learningPaths.find((item) => item.slug === slug);
  const content = courseContent[slug];

  const [completed, setCompleted] = useState(() => readCompleted(slug));
  const [open, setOpen] = useState(null); // id of the expanded lesson

  if (!course || !content) {
    return (
      <section className="content-page">
        <h1>Learning path not found</h1>
        <button className="back-button" onClick={() => navigate("/learning-paths")}>
          <ArrowLeft size={17} /> Back to Learning Paths
        </button>
      </section>
    );
  }

  const total = content.modules.reduce((sum, m) => sum + m.lessons.length, 0);
  const percent = total ? Math.round((completed.length / total) * 100) : 0;

  function toggle(lessonId) {
    const next = completed.includes(lessonId)
      ? completed.filter((id) => id !== lessonId)
      : [...completed, lessonId];
    setCompleted(next);
    localStorage.setItem(progressKey(slug), JSON.stringify(next));
    announceNewBadges(); // congratulates the learner if this completes the badge
  }

  return (
    <section className="content-page lessons-page">
      <button className="back-button" onClick={() => navigate(`/learning-paths/${slug}`)}>
        <ArrowLeft size={17} /> Back to {course.title}
      </button>

      <p className="eyebrow">LEARN STEP BY STEP</p>
      <h1>{course.title} Lessons</h1>

      <div className="course-progress">
        <div className="progress-heading">
          <span>{completed.length} of {total} lessons completed</span>
          <strong>{percent}%</strong>
        </div>
        <div className="progress-track">
          <div style={{ width: `${percent}%` }} />
        </div>
      </div>

      {content.modules.map((module, moduleIndex) => (
        <div className="lessons-module" key={module.title}>
          <h2>{module.title}</h2>

          {module.outcomes?.length > 0 && (
            <div className="lessons-objectives">
              <strong>Learning objectives</strong>
              <ul>
                {module.outcomes.map((outcome) => (
                  <li key={outcome}>{outcome}</li>
                ))}
              </ul>
            </div>
          )}

          {module.lessons.map((lessonItem, lessonIndex) => {
            const detail = typeof lessonItem === "string" ? null : lessonItem;
            const title = detail ? detail.title : lessonItem;
            const lessonId = `${moduleIndex}-${lessonIndex}`;
            const isDone = completed.includes(lessonId);
            const isOpen = open === lessonId;
            const video = (courseVideos[slug] || []).find(
              (v) => v.module === module.title && v.topic === title
            );

            return (
              <article className="lessons-item" key={lessonId}>
                <div className="lessons-item-head">
                  <button
                    type="button"
                    className="lessons-item-title"
                    aria-expanded={isOpen}
                    onClick={() => setOpen(isOpen ? null : lessonId)}
                  >
                    <ChevronDown size={17} className={isOpen ? "open" : ""} />
                    <span>{lessonIndex + 1}. {title}</span>
                  </button>

                  <button
                    type="button"
                    className={isDone ? "lesson-complete completed" : "lesson-complete"}
                    aria-pressed={isDone}
                    onClick={() => toggle(lessonId)}
                  >
                    {isDone ? (<><CheckCircle size={15} /> Completed</>) : "Mark Complete"}
                  </button>
                </div>

                {isOpen && (
                  <div className="lessons-item-body">
                    {detail ? (
                      <>
                        <p>{detail.summary}</p>
                        {detail.points?.length > 0 && (
                          <ul>
                            {detail.points.map((point) => (
                              <li key={point}>{point}</li>
                            ))}
                          </ul>
                        )}
                        {detail.code && <pre><code>{detail.code}</code></pre>}
                        {detail.tip && <p className="lessons-tip">Tip: {detail.tip}</p>}
                      </>
                    ) : (
                      <p>Detailed notes for this lesson are coming soon.</p>
                    )}

                    <LessonNote slug={slug} lessonId={lessonId} />

                    {video && (
                      <a
                        className="lessons-link"
                        href={`https://www.youtube.com/watch?v=${video.videoId}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <PlayCircle size={16} /> Watch: {video.title} <ExternalLink size={14} />
                      </a>
                    )}
                  </div>
                )}
              </article>
            );
          })}
        </div>
      ))}

      {content.resources?.length > 0 && (
        <div className="lessons-module">
          <h2>Documentation and references</h2>
          {content.resources.map((resource) => (
            <a
              className="lessons-link"
              key={resource.url}
              href={resource.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {resource.name} <ExternalLink size={14} />
            </a>
          ))}
        </div>
      )}

      <p>
        <Link to={`/learning-paths/${slug}`}>Back to the full course page</Link>
      </p>
    </section>
  );
}

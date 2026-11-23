import frontendModules from "../data/frontendModules";
import moduleDetails from "../data/moduleDetails";
import ModuleOverview from "../components/ModuleOverview";
import { useState } from "react";
import { useParams, useNavigate, useSearchParams, Link } from "react-router-dom";

import {
  ArrowLeft,
  BookOpen,
  Clock,
  ExternalLink,
  CheckCircle,
  Code2,
  FileText,
  PlayCircle,
  Trophy,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

import { learningPaths } from "../data/learningPaths";
import { courseContent } from "../data/courseContent";
import { courseVideos } from "../data/courseVideos";
import { courseFlow } from "../data/courseFlow";
import { courseMarket, statusLabels } from "../data/courseMarket";
import { topicInfo } from "../data/topicInfo";
import ProjectGuide from "../components/ProjectGuide";
import VideoLessons from "../components/VideoLessons";
import Badge from "../components/Badge";
import {
  announceNewBadges,
  getCourseStatus,
  missingSteps,
  showCongratulations,
} from "../utils/achievements";

// The frontend course has 4 modules but frontendModules has 20 entries,
// so each course module shows the entries (by id) that belong to it.
const frontendModuleGroups = [
  [1, 2, 3],           // HTML Fundamentals
  [4, 5, 6, 7, 8],     // CSS Fundamentals
  [9, 10, 11, 12, 13, 14], // JavaScript
  [15, 16, 17, 18, 19, 20] // React Development
];

export default function LearningPathDetails() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const course = learningPaths.find((item) => item.slug === slug);
  const content = courseContent[slug];

  const storageKey = `skillpath-progress-${slug}`;

  const [completedLessons, setCompletedLessons] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(storageKey) || "[]");
    } catch {
      return [];
    }
  });

  const [openModule, setOpenModule] = useState(0);
  const [openTopic, setOpenTopic] = useState(null); // "stepIndex::topic"
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState(
    searchParams.get("tab") === "videos" ? "videos" : "roadmap"
  );
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  if (!course || !content) {
    return (
      <section className="content-page">
        <h2>Learning path not found</h2>
        <button onClick={() => navigate("/learning-paths")}>
          Back to Learning Paths
        </button>
      </section>
    );
  }

  const totalLessons = content.modules.reduce(
    (total, module) => total + module.lessons.length,
    0
  );

  const progress = Math.round(
    (completedLessons.length / totalLessons) * 100
  );

  function toggleLesson(lessonId) {
    const updated = completedLessons.includes(lessonId)
      ? completedLessons.filter((id) => id !== lessonId)
      : [...completedLessons, lessonId];

    setCompletedLessons(updated);
    localStorage.setItem(storageKey, JSON.stringify(updated));
    announceNewBadges(); // congratulates the learner if this completes the badge
  }

  function submitQuiz() {
    if (selectedAnswer === null) return;
    setQuizSubmitted(true);
  }

  function resetQuiz() {
    setSelectedAnswer(null);
    setQuizSubmitted(false);
  }

  return (
    <section className="content-page course-details-page">

      <button
        className="back-button"
        onClick={() => navigate("/learning-paths")}
      >
        <ArrowLeft size={17} />
        Back to Learning Paths
      </button>

      {/* Course Header */}
      <div className="course-hero">

        <span className="learning-level">
          {course.level}
        </span>

        <h1>{course.title}</h1>

        <p>{course.description}</p>

        <div className="course-meta">
          <span>
            <Clock size={16} /> {course.duration}
          </span>

          <span>
            <BookOpen size={16} /> {totalLessons} lessons
          </span>

          <span>
            <CheckCircle size={16} /> {completedLessons.length} completed
          </span>
        </div>

        <div className="course-progress">
          <div className="progress-heading">
            <span>Your learning progress</span>
            <strong>{progress}%</strong>
          </div>

          <div className="progress-track">
            <div style={{ width: `${progress}%` }} />
          </div>
        </div>

        <Link className="primary-button" to={`/learning-paths/${slug}/lessons`}>
          Open lessons
        </Link>


      </div>

      {/* Badge: needs every lesson complete AND a passed quiz */}
      {(() => {
        const status = getCourseStatus(slug);
        const steps = missingSteps(status);
        return (
          <div className={status.earned ? "badge-panel earned" : "badge-panel"}>
            <Badge title={course.title} earned={status.earned} size={84} />
            <div className="badge-panel-body">
              <h2>
                {status.earned ? "Badge earned. Congratulations!" : `${course.title} badge`}
              </h2>
              <ul>
                <li className={status.lessonsComplete ? "ok" : "todo"}>
                  {status.lessonsComplete ? "✓" : "○"} Complete all {status.total} lessons (
                  {status.done}/{status.total})
                </li>
                <li className={status.quizPassed ? "ok" : "todo"}>
                  {status.quizPassed ? "✓" : "○"} Score {status.passMark}% or more on the quiz
                  {status.best !== null ? ` (your best: ${status.best}%)` : ""}
                </li>
              </ul>
              <div className="badge-panel-actions">
                {status.earned ? (
                  <>
                    <Link className="primary-button" to={`/learning-paths/${slug}/certificate`}>
                      View certificate
                    </Link>
                    <button
                      type="button"
                      className="secondary-button"
                      onClick={() => showCongratulations(slug)}
                    >
                      Show congratulations
                    </button>
                  </>
                ) : (
                  <>
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
                  </>
                )}
              </div>
              {!status.earned && steps.length > 0 && (
                <small>Still needed: {steps.join("; ")}.</small>
              )}
            </div>
          </div>
        );
      })()}

      {/* Course Tabs */}
      <div className="course-tabs">

        <button
          className={activeTab === "roadmap" ? "active" : ""}
          onClick={() => setActiveTab("roadmap")}
        >
          <BookOpen size={16} /> Roadmap
        </button>

        <button
          className={activeTab === "resources" ? "active" : ""}
          onClick={() => setActiveTab("resources")}
        >
          <FileText size={16} /> Resources
        </button>

        <button
          className={activeTab === "videos" ? "active" : ""}
          onClick={() => setActiveTab("videos")}
        >
          <PlayCircle size={16} /> Videos
        </button>

        <button
          className={activeTab === "projects" ? "active" : ""}
          onClick={() => setActiveTab("projects")}
        >
          <Code2 size={16} /> Projects
        </button>

        <button
          className={activeTab === "quiz" ? "active" : ""}
          onClick={() => setActiveTab("quiz")}
        >
          <Trophy size={16} /> Quiz
        </button>

      </div>

      {/* Roadmap */}
      {activeTab === "roadmap" && (
        <div className="roadmap-section">

          <h2>Course Roadmap</h2>

          {courseMarket[slug] && (
            <div className="market-card">
              <h3 className="flow-title">Overview and market snapshot</h3>
              <p className="market-overview">{courseMarket[slug].overview}</p>

              <div className="market-roles">
                <small>Jobs you can aim for</small>
                <div className="flow-chips">
                  {courseMarket[slug].roles.map((r) => (
                    <span className="chip topic" key={r}>{r}</span>
                  ))}
                </div>
              </div>

              <small className="market-sub">
                Advanced languages and tools: what is in demand and what is old
              </small>

              <div className="market-grid">
                {courseMarket[slug].techs.map(([name, status, note]) => (
                  <div className={`market-item ${status}`} key={name}>
                    <div className="market-item-top">
                      <strong>{name}</strong>
                      <span className="market-status">
                        {statusLabels[status]}
                      </span>
                    </div>
                    <p>{note}</p>
                  </div>
                ))}
              </div>

              <p className="market-note">
                Demand labels reflect general industry trends and can change.
                Legacy does not mean useless; it means less likely to be your
                first choice for new projects.
              </p>
            </div>
          )}

          {courseFlow[slug] && (
            <div className="flow-wrap">
              <h3 className="flow-title">Learning flow: what to learn and which tools to use</h3>

              <div className="flow-legend">
                <span><i className="dot beginner" /> Beginner: start with these</span>
                <span><i className="dot intermediate" /> Intermediate: pick these next</span>
                <span><i className="dot advanced" /> Advanced: pick these at last</span>
                <span><i className="dot tool" /> Tools</span>
              </div>

              <ol className="flow-steps">
                {courseFlow[slug].map((step, i) => (
                  <li className={`flow-step ${step.level}`} key={step.stage}>
                    <span className="flow-num">{i + 1}</span>

                    <div className="flow-body">
                      <div className="flow-head">
                        <strong>{step.stage}</strong>
                        <span className="flow-badge">{step.level}</span>
                      </div>

                      <div className="flow-group">
                        <small>Learn</small>
                        <div className="flow-chips">
                          {step.topics.map((t) => {
                            const id = `${i}::${t}`;
                            const active = openTopic === id;
                            return (
                              <button
                                type="button"
                                key={t}
                                className={`chip topic clickable${active ? " active" : ""}`}
                                aria-expanded={active}
                                onClick={() => setOpenTopic(active ? null : id)}
                              >
                                {t}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {openTopic && openTopic.startsWith(`${i}::`) && (() => {
                        const name = openTopic.slice(`${i}::`.length);
                        const info = topicInfo[name];
                        if (!info) return null;
                        return (
                          <div className="topic-info">
                            <div className="topic-info-head">
                              <strong>What is {name}?</strong>
                              <button
                                type="button"
                                aria-label="Close explanation"
                                onClick={() => setOpenTopic(null)}
                              >
                                ×
                              </button>
                            </div>
                            <p>{info}</p>
                          </div>
                        );
                      })()}

                      <div className="flow-group">
                        <small>Tools</small>
                        <div className="flow-chips">
                          {step.tools.map((t) => (
                            <span className="chip tool" key={t}>{t}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          )}

          <h3 className="flow-title">Module-by-module lessons</h3>

          <p className="section-description">
            Follow these modules in order. Complete each lesson as you learn.
          </p>

          {content.modules.map((module, moduleIndex) => (

            <article className="module-card" key={module.title}>

              <button
                className="module-heading"
                onClick={() =>
                  setOpenModule(
                    openModule === moduleIndex ? -1 : moduleIndex
                  )
                }
              >

                <div>
                  <span className="module-number">
                    Module {moduleIndex + 1}
                  </span>

                  <h3>{module.title}</h3>

                  <small>
                    {module.lessons.length} lessons
                  </small>
                </div>

                {openModule === moduleIndex
                  ? <ChevronUp />
                  : <ChevronDown />}

              </button>

              {openModule === moduleIndex && (

                <div className="lesson-list">

                  {slug === "frontend"
                    ? (frontendModuleGroups[moduleIndex] || []).map((id) => (
                        <ModuleOverview
                          key={id}
                          module={frontendModules.find((m) => m.id === id)}
                        />
                      ))
                    : (
                        <ModuleOverview
                          module={moduleDetails[slug]?.[moduleIndex]}
                        />
                      )}

                  {slug !== "frontend" && module.overview && (
                    <div className="module-intro">
                      <h4>About this module</h4>
                      <p>{module.overview}</p>
                      {module.outcomes && (
                        <>
                          <h4>What you will be able to do</h4>
                          <ul>
                            {module.outcomes.map((o) => (
                              <li key={o}>{o}</li>
                            ))}
                          </ul>
                        </>
                      )}
                    </div>
                  )}

                  {module.lessons.map((lessonItem, lessonIndex) => {
                    const lesson =
                      typeof lessonItem === "string"
                        ? lessonItem
                        : lessonItem.title;
                    const detail =
                      typeof lessonItem === "string" ? null : lessonItem;

                    const lessonId = `${moduleIndex}-${lessonIndex}`;

                    const completed =
                      completedLessons.includes(lessonId);

                    return (
                      <div className="lesson-row" key={lessonId}>

                        <div className="lesson-info">
                          <BookOpen size={17} />
                          <span>{lesson}</span>
                        </div>

                        <button
                          className={
                            completed
                              ? "lesson-complete completed"
                              : "lesson-complete"
                          }
                          onClick={() => toggleLesson(lessonId)}
                        >
                          {completed ? (
                            <>
                              <CheckCircle size={15} />
                              Completed
                            </>
                          ) : (
                            "Mark Complete"
                          )}
                        </button>

                        {detail && (
                          <div className="lesson-detail">
                            <p>{detail.summary}</p>
                            <ul>
                              {detail.points.map((pt) => (
                                <li key={pt}>{pt}</li>
                              ))}
                            </ul>
                            {detail.code && (
                              <pre>
                                <code>{detail.code}</code>
                              </pre>
                            )}
                            {detail.tip && (
                              <div className="lesson-tip">
                                <strong>Tip:</strong> {detail.tip}
                              </div>
                            )}
                          </div>
                        )}

                      </div>
                    );
                  })}

                </div>
              )}

            </article>
          ))}

        </div>
      )}

      {/* Resources */}
      {activeTab === "resources" && (
        <div className="course-content-section">

          <h2>Free Learning Resources</h2>

          <p className="section-description">
            Beginner-friendly tutorials, interactive practice and official
            documentation. Start with the easy ones, then use the docs as
            a reference.
          </p>

          <div className="resource-grid">

            {content.resources.map((resource) => (

              <article className="resource-card" key={resource.name}>

                <FileText size={23} />

                <div>
                  <h3>{resource.name}</h3>
                  <span>{resource.type}</span>
                  {resource.description && (
                    <p className="resource-description">
                      {resource.description}
                    </p>
                  )}
                </div>

                <a
                  href={resource.url}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Open ${resource.name}`}
                >
                  <ExternalLink size={18} />
                </a>

              </article>
            ))}

          </div>
        </div>
      )}

      {/* NEW: Videos */}
      {activeTab === "videos" && (
        <div className="course-content-section">
          <VideoLessons
            slug={slug}
            videos={courseVideos[slug] || []}
          />
        </div>
      )}

      {/* Projects */}
      {activeTab === "projects" && (
        <div className="course-content-section">

          <h2>Practice Projects</h2>

          <p className="section-description">
            Apply what you learn by building real projects. Open a project to
            see where to build it, the setup, the steps, and ready-made
            prompts to get help from ChatGPT or Claude while you code.
          </p>

          <div className="project-list">

            {content.projects.map((project, index) => (
              <ProjectGuide
                key={project}
                slug={slug}
                courseTitle={course.title}
                project={project}
                index={index}
              />
            ))}

          </div>
        </div>
      )}

      {/* Quiz */}
      {activeTab === "quiz" && (
        <div className="course-content-section">

          <h2>Knowledge Check</h2>

          <p className="section-description">
            Test your understanding of {course.title}.
          </p>

          <p>
            <Link className="primary-button" to={`/quizzes/${slug}`}>
              Take the full {course.title} quiz ({totalLessons} questions, one per lesson)
            </Link>
          </p>

          <div className="quiz-card">

            <span className="quiz-label">
              Question 1 of 1
            </span>

            <h3>{content.quiz.question}</h3>

            <div className="quiz-options">

              {content.quiz.options.map((option, index) => {

                const isCorrect = index === content.quiz.answer;
                const isSelected = selectedAnswer === index;

                let className = "quiz-option";

                if (quizSubmitted && isCorrect) {
                  className += " correct";
                } else if (quizSubmitted && isSelected && !isCorrect) {
                  className += " incorrect";
                } else if (isSelected) {
                  className += " selected";
                }

                return (
                  <button
                    key={option}
                    className={className}
                    disabled={quizSubmitted}
                    onClick={() => setSelectedAnswer(index)}
                  >
                    {option}
                  </button>
                );
              })}

            </div>

            {quizSubmitted && (
              <div className="quiz-feedback">
                {selectedAnswer === content.quiz.answer
                  ? "Correct! Well done."
                  : `Not quite. The correct answer is ${content.quiz.options[content.quiz.answer]}.`}
              </div>
            )}

            {!quizSubmitted ? (

              <button
                className="roadmap-button quiz-submit"
                disabled={selectedAnswer === null}
                onClick={submitQuiz}
              >
                Submit Answer
              </button>

            ) : (

              <button
                className="roadmap-button quiz-submit"
                onClick={resetQuiz}
              >
                Try Again
              </button>

            )}

          </div>
        </div>
      )}

    </section>
  );
}

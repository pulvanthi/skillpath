import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import featuredProjects from "../data/projects";
import ProjectCard from "../components/ProjectCard";
import { BookOpen, FolderOpen, Code2, Flag } from "lucide-react";
import { paths, recommended, projects } from "../data";
import LearningPathCard from "../components/LearningPathCard";
import StatCard from "../components/StatCard";
import { learningPaths } from "../data/learningPaths";
import { resources } from "../data/resources";
import { getCourseProgress, getOverallProgress } from "../utils/progress";

const pathIds = ["frontend", "java", "python"];

const subjectList = [
  { name: "Frontend", short: "FE", color: "purple", slug: "frontend" },
  { name: "Java", short: "JV", color: "blue", slug: "java" },
  { name: "Python", short: "PY", color: "teal", slug: "python" },
];

function readProfileName() {
  try {
    const profile = JSON.parse(
      localStorage.getItem("skillpath-user-profile") || "{}"
    );
    return profile.firstName || "";
  } catch {
    return "";
  }
}

export default function Home() {
  const navigate = useNavigate();

  // numbers come from the learner's saved progress
  const firstName = readProfileName();
  const overall = getOverallProgress();
  const subjects = subjectList.map((subject) => ({
    ...subject,
    value: getCourseProgress(subject.slug).percent,
  }));
  const livePaths = paths.map((path, i) => {
    const progress = getCourseProgress(pathIds[i]);
    return {
      ...path,
      progress: progress.percent,
      lessons: `${progress.done} of ${progress.total} lessons`,
    };
  });

  return (
    <div className="dashboard">
      <div className="main-grid">
        <div className="center-column">
          <section className="hero">
            <div className="hero-copy">
              <p className="eyebrow">
                <span>✦</span>YOUR LEARNING JOURNEY
              </p>
              <h1>
                Hi{firstName ? ` ${firstName}` : ""}! <span className="wave">👋</span>
                <br />
                Learn something <em>meaningful</em> today.
              </h1>
              <p>
                Discover what to learn, follow a roadmap, and practice your
                skills at your own pace.
              </p>
              <button
                className="primary-button"
                onClick={() => navigate("/learning-paths")}
              >
                Explore learning paths →
              </button>
            </div>

            <div className="hero-art" aria-hidden="true">
              <div className="orbit orbit-one" />
              <div className="orbit orbit-two" />
              <div className="float-tile tile-code">{"</>"}</div>
              <div className="float-tile tile-video">▶</div>
              <div className="float-tile tile-notes">≡</div>
              <div className="float-tile tile-book">📘</div>
              <div className="hero-slogan">
                Learn.
                <span>Build.</span>
                Grow.
              </div>
              <div className="book-stack">
                <i />
                <i />
                <i />
              </div>
            </div>
          </section>

          <section className="stats-grid">
            <StatCard to="/learning-paths" icon={<BookOpen size={19} />} color="purple" value={String(learningPaths.length).padStart(2, "0")} label="Learning paths" note="Choose a skill" />
            <StatCard to="/resources" icon={<FolderOpen size={19} />} color="teal" value={String(resources.length).padStart(2, "0")} label="Resources" note="Curated examples" />
            <StatCard to="/projects" icon={<Code2 size={19} />} color="purple" value={String(featuredProjects.length).padStart(2, "0")} label="Projects" note="Practice by building" />
            <StatCard to="/progress" icon={<Flag size={19} />} color="teal" value={`${overall}%`} label="Overall progress" note="Keep going" />
          </section>

          <section className="paths-section">
            <div className="section-heading">
              <div>
                <h2>Choose your learning path</h2>
                <p>Pick a roadmap and learn step by step.</p>
              </div>
              <button className="text-link" onClick={() => navigate("/learning-paths")}>
                View all →
              </button>
            </div>

            <div className="paths-grid">
              {livePaths.map((path, i) => (
                <LearningPathCard
                  key={path.title}
                  path={path}
                  onOpen={() => navigate(`/learning-paths/${pathIds[i]}`)}
                />
              ))}
            </div>
          </section>

          <div className="lower-grid">
            <section className="panel continue-panel">
              <div className="section-heading">
                <h2>Continue learning</h2>
              </div>
              <div className="continue-item">
                <div className="html-thumb">
                  <b>HTML</b>
                  <strong>5</strong>
                  <small>Basics</small>
                </div>
                <div className="continue-info">
                  <span className="status-pill">In progress</span>
                  <h3>HTML Basics</h3>
                  <p>Learn the structure of every web page.</p>
                  <div className="resource-tags">
                    <span>Video</span>
                    <i>•</i>
                    <span>Notes</span>
                  </div>
                </div>
                <button
                  className="continue-button"
                  onClick={() => navigate("/learning-paths/frontend")}
                >
                  Continue
                </button>
              </div>
            </section>

            <section className="panel recommend-panel">
              <div className="section-heading">
                <h2>Recommended resources</h2>
              </div>
              <div className="recommend-list">
                {recommended.map((item) => (
                  <button
                    key={item.title}
                    className="recommend-item"
                    onClick={() => navigate("/resources")}
                  >
                    <span className={`recommend-thumb ${item.color}`}>{item.emoji}</span>
                    <span className="recommend-copy">
                      <b>{item.title}</b>
                      <small>
                        <span className="youtube-dot">●</span> {item.meta}
                      </small>
                    </span>
                  </button>
                ))}
              </div>
            </section>
          </div>

          <section className="panel projects-panel">
            <div className="section-heading">
              <h2>Practice projects</h2>
              <button className="text-link" onClick={() => navigate("/practice")}>
                View all →
              </button>
            </div>
            <div className="projects-grid">
              {projects.map((project) => (
                <button
                  key={project.title}
                  className="project-card"
                  onClick={() => navigate("/projects")}
                >
                  <div className={`project-visual ${project.color}`}>
                    <span>{project.emoji}</span>
                  </div>
                  <div className="project-content">
                    <div className="project-tags">
                      <span>{project.level}</span>
                      <span>{project.tags}</span>
                    </div>
                    <h3>{project.title}</h3>
                    <p>{project.description}</p>
                  </div>
                  <div className="project-footer">
                    <span>{project.milestones} milestones</span>
                    <span>→</span>
                  </div>
                </button>
              ))}
            </div>
          </section>

          <section className="featured-projects">
            <div className="section-heading">
              <div>
                <h2>Featured Projects</h2>
                <p>Build real projects and showcase your skills</p>
              </div>

              <button
                className="view-all-button"
                onClick={() => navigate("/projects")}
              >
                View all <ArrowRight size={14} />
              </button>
            </div>

            <div className="featured-project-grid">
              {featuredProjects.slice(0, 3).map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onOpen={() => navigate(`/projects/${project.id}`)}
                />
              ))}
            </div>
          </section>
        </div>

        <aside className="right-column">
          <section className="panel progress-panel">
            <div className="right-heading">
              <h2>Your progress</h2>
            </div>
            <div className="donut-wrap">
              <div
                className="donut"
                style={{
                  background: `conic-gradient(#079c94 0 ${overall}%, #eaf0f8 ${overall}% 100%)`,
                }}
              >
                <div>
                  <strong>{overall}%</strong>
                  <small>Overall</small>
                </div>
              </div>
            </div>
            <div className="subject-progress">
              {subjects.map((s) => (
                <div key={s.name} className="subject-row">
                  <span className={`subject-icon ${s.color}`}>{s.short}</span>
                  <div className="subject-detail">
                    <div>
                      <b>{s.name}</b>
                      <strong>{s.value}%</strong>
                    </div>
                    <div className="subject-track">
                      <span className={s.color} style={{ width: `${s.value}%` }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="daily-banner">
            <div>
              <h3>
                Small steps every day
                <br />
                lead to big results.
              </h3>
              <button className="primary-button" onClick={() => navigate("/progress")}>
                View progress
              </button>
            </div>
          </section>
        </aside>
      </div>
    </div>
  );
}

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import projects from "../data/projects";
import ProjectCard from "../components/ProjectCard";

export default function Projects() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState("All");
  const [doneIds, setDoneIds] = useState(() => {
    try {
      const saved = JSON.parse(
        localStorage.getItem("skillpath-projects-done") || "[]"
      );
      return Array.isArray(saved) ? saved : [];
    } catch {
      return [];
    }
  });

  function toggleDone(id) {
    const next = doneIds.includes(id)
      ? doneIds.filter((item) => item !== id)
      : [...doneIds, id];
    setDoneIds(next);
    try {
      localStorage.setItem("skillpath-projects-done", JSON.stringify(next));
    } catch {
      // storage unavailable: the change just won't persist
    }
  }

  const filteredProjects =
    filter === "All"
      ? projects
      : projects.filter((project) => project.level === filter);

  return (
    <section className="content-page projects-page">
      <div className="page-heading">
        <div>
          <h1>Practice Projects</h1>
          <p>
            Turn your knowledge into practical skills by building real projects.
          </p>
        </div>
      </div>

      <div className="project-filters">
        {["All", "Beginner", "Intermediate"].map((level) => (
          <button
            key={level}
            className={
              filter === level
                ? "project-filter active"
                : "project-filter"
            }
            onClick={() => setFilter(level)}
          >
            {level}
          </button>
        ))}
      </div>

      <div className="all-project-grid">
        {filteredProjects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            done={doneIds.includes(project.id)}
            onToggleDone={toggleDone}
            onOpen={() => navigate(`/projects/${project.id}`)}
          />
        ))}
      </div>
    </section>
  );
}
import { ArrowRight, CircleDot, Check } from "lucide-react";

export default function ProjectCard({ project, onOpen, done, onToggleDone }) {
  return (
    <article className={done ? "project-card is-done" : "project-card"}>
      <img
        className="project-image"
        src={project.image}
        alt={project.title}
      />

      <div className="project-details">
        <div className="project-tags">
          <span className="project-level">{project.level}</span>

          {project.technologies.map((tech) => (
            <span className="project-tech" key={tech}>
              {tech}
            </span>
          ))}
        </div>

        <h3>{project.title}</h3>
        <p>{project.description}</p>
      </div>

      <div className="project-card-footer">
        <span>
          <CircleDot size={13} />
          {project.milestones} milestones
        </span>

        <div className="project-card-actions">
          {onToggleDone && (
            <button
              className={done ? "project-done-button done" : "project-done-button"}
              onClick={() => onToggleDone(project.id)}
              aria-pressed={!!done}
            >
              <Check size={14} />
              {done ? "Completed" : "Mark complete"}
            </button>
          )}

          <button
            className="project-open-button"
            onClick={() => onOpen(project)}
            aria-label={`Open ${project.title}`}
          >
            <ArrowRight size={17} />
          </button>
        </div>
      </div>
    </article>
  );
}

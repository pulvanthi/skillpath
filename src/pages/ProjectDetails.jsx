import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Check } from "lucide-react";
import projects from "../data/projects";
import projectDetails from "../data/projectDetails";

function readJson(key, fallback) {
  try {
    return JSON.parse(localStorage.getItem(key) || "null") ?? fallback;
  } catch {
    return fallback;
  }
}

function writeJson(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // storage unavailable: changes just won't persist
  }
}

export default function ProjectDetails() {
  const { id } = useParams();
  const project = projects.find((item) => String(item.id) === id);
  const details = project ? projectDetails[project.id] : null;

  const [doneSteps, setDoneSteps] = useState(() =>
    project ? readJson("skillpath-project-steps", {})[project.id] || [] : []
  );
  const [completed, setCompleted] = useState(() =>
    project ? readJson("skillpath-projects-done", []).includes(project.id) : false
  );

  if (!project || !details) {
    return (
      <section className="content-page">
        <h1>Project not found</h1>
        <Link className="primary-button" to="/projects">
          Back to Projects
        </Link>
      </section>
    );
  }

  function toggleStep(index) {
    const next = doneSteps.includes(index)
      ? doneSteps.filter((item) => item !== index)
      : [...doneSteps, index];
    setDoneSteps(next);
    const all = readJson("skillpath-project-steps", {});
    all[project.id] = next;
    writeJson("skillpath-project-steps", all);
  }

  function toggleCompleted() {
    const list = readJson("skillpath-projects-done", []);
    const next = completed
      ? list.filter((item) => item !== project.id)
      : [...list, project.id];
    writeJson("skillpath-projects-done", next);
    setCompleted(!completed);
  }

  const percent = Math.round((doneSteps.length / details.steps.length) * 100);

  return (
    <section className="content-page project-details-page">
      <Link className="back-link" to="/projects">
        <ArrowLeft size={16} /> All projects
      </Link>

      <img className="project-hero" src={project.image} alt={project.title} />

      <div className="project-tags">
        <span className="project-level">{project.level}</span>
        {project.technologies.map((tech) => (
          <span className="project-tech" key={tech}>
            {tech}
          </span>
        ))}
      </div>

      <h1>{project.title}</h1>
      <p>{project.description}</p>

      <div className="learning-page-card">
        <h2>What you will build</h2>
        <p>{details.goal}</p>
        <ul className="project-feature-list">
          {details.features.map((feature) => (
            <li key={feature}>{feature}</li>
          ))}
        </ul>
      </div>

      <div className="learning-page-card">
        <h2>
          Milestones ({doneSteps.length}/{details.steps.length})
        </h2>
        <div className="progress-bar">
          <div className="progress-bar-fill" style={{ width: `${percent}%` }} />
        </div>

        <ol className="project-steps">
          {details.steps.map((step, index) => {
            const done = doneSteps.includes(index);
            return (
              <li key={step.title} className={done ? "step done" : "step"}>
                <label>
                  <input
                    type="checkbox"
                    checked={done}
                    onChange={() => toggleStep(index)}
                  />
                  <span>
                    <strong>
                      {index + 1}. {step.title}
                    </strong>
                    <small>{step.text}</small>
                  </span>
                </label>
              </li>
            );
          })}
        </ol>
      </div>

      <div className="learning-page-card">
        <h2>Tips</h2>
        <ul className="project-feature-list">
          {details.tips.map((tip) => (
            <li key={tip}>{tip}</li>
          ))}
        </ul>
      </div>

      <button
        className={completed ? "project-done-button done big" : "project-done-button big"}
        onClick={toggleCompleted}
        aria-pressed={completed}
      >
        <Check size={16} />
        {completed ? "Project completed" : "Mark project as completed"}
      </button>
    </section>
  );
}

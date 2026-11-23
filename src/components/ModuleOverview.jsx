
import {
  Clock,
  BookOpen,
  Target,
  CheckCircle,
  ListChecks,
  Code2,
  Lightbulb
} from "lucide-react";

import "./ModuleOverview.css";

export default function ModuleOverview({ module }) {
  if (!module) return null;

  return (
    <div className="module-overview">

      {/* Module summary */}
      <div className="module-overview-heading">
        <div>
          <span className="module-level">{module.level}</span>
          <h3>About this module</h3>
          <p>{module.overview}</p>
        </div>
      </div>

      {/* Information cards */}
      <div className="module-info-grid">

        <div className="module-info-card">
          <Clock size={20} />
          <div>
            <strong>{module.duration}</strong>
            <small>Estimated duration</small>
          </div>
        </div>

        <div className="module-info-card">
          <BookOpen size={20} />
          <div>
            <strong>{module.lessons ?? module.topics?.length ?? 0} Lessons</strong>
            <small>Learning content</small>
          </div>
        </div>

        <div className="module-info-card">
          <Target size={20} />
          <div>
            <strong>{module.level}</strong>
            <small>Difficulty level</small>
          </div>
        </div>

      </div>

      {/* Prerequisites */}
      <section className="module-info-section">
        <h4>
          <Lightbulb size={19} />
          Prerequisites
        </h4>
        <p>{module.prerequisites}</p>
      </section>

      {/* Learning objectives */}
      <section className="module-info-section">
        <h4>
          <Target size={19} />
          What you will learn
        </h4>

        <div className="module-objective-list">
          {module.objectives?.map((objective, index) => (
            <div className="module-objective" key={index}>
              <CheckCircle size={17} />
              <span>{objective}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Topics */}
      <section className="module-info-section">
        <h4>
          <ListChecks size={19} />
          Topics covered
        </h4>

        <div className="module-topic-grid">
          {module.topics?.map((topic, index) => (
            <div className="module-topic" key={index}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              {topic}
            </div>
          ))}
        </div>
      </section>

      {/* Practical exercises */}
      <section className="module-info-section">
        <h4>
          <Code2 size={19} />
          Practical exercises
        </h4>

        <div className="module-practice-list">
          {(module.practicalTasks ?? module.exercises)?.map((task, index) => (
            <div className="module-practice-item" key={index}>
              <span>Task {index + 1}</span>
              <p>{task}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Mini project */}
      <section className="module-project-box">
        <div className="module-project-icon">
          <Code2 size={23} />
        </div>

        <div>
          <span>MODULE PROJECT</span>
          <h4>{module.project}</h4>
          <p>Apply what you learned by building this project.</p>
        </div>
      </section>

    </div>
  );
}

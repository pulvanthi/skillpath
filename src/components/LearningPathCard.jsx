import { ArrowRight, BookOpen, BarChart3 } from "lucide-react";

const icons = { code: "</>", coffee: "☕", python: "🐍" };

export default function LearningPathCard({ path, onOpen }) {
  return (
    <button className={`path-card ${path.color}`} onClick={onOpen}>
      <div className="path-card-top">
        <div className="path-icon">{icons[path.icon] ?? "✦"}</div>
        {path.popular && <span className="popular">Popular</span>}
      </div>

      <h3>{path.title}</h3>
      <p>{path.description}</p>

      <div className="path-progress-row">
        <div className="path-track">
          <span style={{ width: `${path.progress}%` }} />
        </div>
        <b>{path.progress}%</b>
      </div>

      <div className="path-meta">
        <span>
          <BookOpen size={11} /> {path.lessons}
        </span>
        <span>
          <BarChart3 size={11} /> {path.level}
        </span>
      </div>

      <span className="round-arrow">
        <ArrowRight size={12} />
      </span>
    </button>
  );
}

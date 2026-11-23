import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export default function StatCard({ icon, color = "purple", value, label, note, to }) {
  const content = (
    <>
      <div className={`stat-icon ${color}`}>{icon}</div>

      <div className="stat-text">
        <strong>{value}</strong>
        <span>{label}</span>
        <small>{note}</small>
      </div>

      <ArrowRight className="stat-arrow" size={14} />
    </>
  );

  if (to) {
    return (
      <Link className="stat-card stat-card-link" to={to}>
        {content}
      </Link>
    );
  }

  return <article className="stat-card">{content}</article>;
}

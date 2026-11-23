

import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Clock, ArrowRight, BookOpen } from "lucide-react";
import { learningPaths } from "../data/learningPaths";

const categories = [
  "All",
  "Web Development",
  "Programming",
  "Data & AI",
  "Cloud & DevOps",
  "Other IT Skills",
];

export default function LearningPaths() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const navigate = useNavigate();

  const filteredPaths = useMemo(() => {
    return learningPaths.filter((path) => {
      const matchesCategory =
        category === "All" || path.category === category;

      const searchText = search.toLowerCase();

      const matchesSearch =
        path.title.toLowerCase().includes(searchText) ||
        path.description.toLowerCase().includes(searchText) ||
        path.technologies.some((tech) =>
          tech.toLowerCase().includes(searchText)
        );

      return matchesCategory && matchesSearch;
    });
  }, [search, category]);

  return (
    <section className="content-page learning-paths-page">
      <div className="learning-heading">
        <div>
          <h1>Learning Paths</h1>
          <p>Choose a roadmap and learn step by step.</p>
        </div>

        <span className="course-count">
          {learningPaths.length} Learning Paths
        </span>
      </div>

      <div className="learning-search">
        <Search size={19} />
        <input
          type="text"
          placeholder="Search courses, technologies..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="learning-categories">
        {categories.map((item) => (
          <button
            key={item}
            className={
              category === item
                ? "category-button active"
                : "category-button"
            }
            onClick={() => setCategory(item)}
          >
            {item}
          </button>
        ))}
      </div>

      <div className="learning-path-grid">
        {filteredPaths.map((path) => (
          <article className="learning-path-card" key={path.id}>
            <span className="learning-level">{path.level}</span>

            <h2>{path.title}</h2>

            <p>{path.description}</p>

            <div className="learning-technologies">
              {path.technologies.map((tech) => (
                <span key={tech}>{tech}</span>
              ))}
            </div>

            <div className="learning-duration">
              <Clock size={15} />
              Duration: {path.duration}
            </div>

            <button
              className="roadmap-button"
              onClick={() =>
                navigate(`/learning-paths/${path.slug}`)
              }
            >
              <BookOpen size={16} />
              View Roadmap
              <ArrowRight size={16} />
            </button>
          </article>
        ))}
      </div>

      {filteredPaths.length === 0 && (
        <div className="no-learning-results">
          <h3>No learning paths found</h3>
          <p>Try another course name or category.</p>
        </div>
      )}
    </section>
  );
}

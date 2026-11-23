import { useState } from "react";
import { Link } from "react-router-dom";
import { resources } from "../data/resources";
import { getBookmarks, toggleBookmark } from "../utils/bookmarks";

export default function Bookmarks() {
  const [saved, setSaved] = useState(getBookmarks);
  const items = resources.filter((resource) => saved.includes(resource.title));

  return (
    <section className="content-page">
      <h1>Bookmarks</h1>
      <p>Your saved learning resources.</p>

      {items.length === 0 ? (
        <div className="learning-page-card">
          <h2>No saved resources yet</h2>
          <p>
            Open <Link to="/resources">Resources</Link> and press Save on the
            ones you want to keep here.
          </p>
        </div>
      ) : (
        <div className="page-card-grid">
          {items.map((resource) => (
            <article className="learning-page-card" key={resource.title}>
              <h2>{resource.title}</h2>
              <p>{resource.description}</p>
              <div className="practice-actions">
                <a
                  className="primary-button"
                  href={resource.url}
                  target="_blank"
                  rel="noreferrer"
                >
                  Open Resource ↗
                </a>
                <button
                  className="secondary-button"
                  onClick={() => setSaved(toggleBookmark(resource.title))}
                >
                  Remove
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

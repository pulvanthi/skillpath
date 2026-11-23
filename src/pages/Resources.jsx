import { useState } from "react";
import { Bookmark } from "lucide-react";
import { getBookmarks, toggleBookmark } from "../utils/bookmarks";
import { resources } from "../data/resources";

export default function Resources() {
  const [saved, setSaved] = useState(getBookmarks);

  return (
    <section className="content-page">
      <h1>Learning Resources</h1>
      <p>Explore free learning material from trusted sources.</p>

      <div className="page-card-grid">
        {resources.map((resource) => (
          <article className="learning-page-card" key={resource.title}>
            <h2>{resource.title}</h2>
            <p>{resource.description}</p>
            <button
              className={
                saved.includes(resource.title)
                  ? "bookmark-button saved"
                  : "bookmark-button"
              }
              onClick={() => setSaved(toggleBookmark(resource.title))}
              aria-pressed={saved.includes(resource.title)}
            >
              <Bookmark
                size={16}
                fill={saved.includes(resource.title) ? "currentColor" : "none"}
              />
              {saved.includes(resource.title) ? "Saved" : "Save"}
            </button>
            <a
              className="primary-button"
              href={resource.url}
              target="_blank"
              rel="noreferrer"
            >
              Open Resource ↗
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}
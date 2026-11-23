import { Link, useSearchParams } from "react-router-dom";
import { learningPaths } from "../data/learningPaths";
import { courseContent } from "../data/courseContent";
import { courseVideos } from "../data/courseVideos";
import { quizzes } from "../data/quizQuestions";
import projects from "../data/projects";
import { resources } from "../data/resources";

function matches(query, ...fields) {
  const text = fields.flat().filter(Boolean).join(" ").toLowerCase();
  return query
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean)
    .every((word) => text.includes(word));
}

function buildResults(query) {
  const results = [];

  learningPaths.forEach((path) => {
    if (matches(query, path.title, path.description, path.technologies)) {
      results.push({
        type: "Course",
        title: path.title,
        text: path.description,
        to: `/learning-paths/${path.slug}`,
      });
    }

    (courseContent[path.slug]?.modules || []).forEach((module) => {
      if (matches(query, module.title, module.overview)) {
        results.push({
          type: "Module",
          title: module.title,
          text: `In ${path.title}`,
          to: `/learning-paths/${path.slug}`,
        });
      }
      (module.lessons || []).forEach((lessonItem) => {
        // some lessons are plain strings, others are objects with details
        const lesson = typeof lessonItem === "string" ? { title: lessonItem } : lessonItem;
        if (matches(query, lesson.title, lesson.summary, lesson.points, lesson.tip)) {
          results.push({
            type: "Lesson",
            title: lesson.title,
            text: `${module.title} · ${path.title}`,
            to: `/learning-paths/${path.slug}/lessons`,
          });
        }
      });
    });

    (courseVideos[path.slug] || []).forEach((video) => {
      if (matches(query, video.title, video.topic, video.module, video.channel, video.description)) {
        results.push({
          type: "Video",
          title: video.title,
          text: `${video.topic} · ${path.title} · ${video.channel}`,
          to: `/learning-paths/${path.slug}?tab=videos`,
        });
      }
    });
  });

  quizzes.forEach((quiz) => {
    if (matches(query, quiz.title, quiz.description)) {
      results.push({
        type: "Quiz",
        title: quiz.title,
        text: quiz.description,
        to: `/quizzes/${quiz.id}`,
      });
    }
  });

  projects.forEach((project) => {
    if (
      matches(query, project.title, project.description, project.technologies)
    ) {
      results.push({
        type: "Project",
        title: project.title,
        text: project.description,
        to: `/projects/${project.id}`,
      });
    }
  });

  resources.forEach((resource) => {
    if (matches(query, resource.title, resource.description)) {
      results.push({
        type: "Resource",
        title: resource.title,
        text: resource.description,
        to: "/resources",
      });
    }
  });

  return results;
}

export default function Search() {
  const [params] = useSearchParams();
  const query = (params.get("q") || "").trim();
  const results = query ? buildResults(query) : [];

  return (
    <section className="content-page">
      <h1>Search</h1>
      <p>
        {query
          ? `${results.length} result${results.length === 1 ? "" : "s"} for “${query}”`
          : "Type something in the search bar above and press Enter."}
      </p>

      {query && results.length === 0 && (
        <div className="learning-page-card">
          <h2>Nothing found</h2>
          <p>Try a shorter word, such as “react”, “css” or “quiz”.</p>
        </div>
      )}

      <div className="search-results">
        {results.slice(0, 100).map((result, index) => (
          <Link className="search-result" to={result.to} key={index}>
            <span className="search-type">{result.type}</span>
            <strong>{result.title}</strong>
            <small>{result.text}</small>
          </Link>
        ))}
      </div>
    </section>
  );
}

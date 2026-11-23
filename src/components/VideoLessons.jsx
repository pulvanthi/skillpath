
import { useEffect, useState } from "react";
import { ExternalLink, PlayCircle } from "lucide-react";
import "./VideoLessons.css";

export default function VideoLessons({ slug, videos = [] }) {
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);

  useEffect(() => {
    setActiveVideoIndex(0);
  }, [slug]);

  if (!videos.length) {
    return (
      <div className="skillpath-video-empty">
        <h3>Video lessons coming soon</h3>
        <p>
          Curated video tutorials for this learning path
          will be added soon.
        </p>
      </div>
    );
  }

  const activeVideo = videos[activeVideoIndex] || videos[0];

  const watchUrl =
    `https://www.youtube.com/watch?v=${activeVideo.videoId}`;

  const embedUrl =
    `https://www.youtube.com/embed/${activeVideo.videoId}?rel=0`;

  return (
    <div className="skillpath-video-section">

      <div className="skillpath-video-heading">
        <h2>Video Lessons</h2>

        <p className="section-description">
          Learn through curated free video tutorials.
          If a video cannot play here, use the YouTube link below.
        </p>
      </div>

      {/* YouTube Video Player */}
      <article className="skillpath-video-card">

        <div className="skillpath-video-frame">
          <iframe
            key={activeVideo.videoId}
            src={embedUrl}
            title={activeVideo.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
          />
        </div>

        {/* Video Information */}
        <div className="skillpath-video-details">

          <span className="skillpath-video-topic">
            {activeVideo.topic}
          </span>

          <h3>{activeVideo.title}</h3>

          <p>{activeVideo.description}</p>

          <small>
            Channel: {activeVideo.channel}
          </small>

          {/* YouTube Fallback */}
          <a
            className="skillpath-youtube-link"
            href={watchUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <PlayCircle size={17} />
            Watch on YouTube
            <ExternalLink size={15} />
          </a>

        </div>
      </article>

      {/* Video Playlist */}
      <div className="skillpath-video-playlist">

        <h3>Available Tutorials</h3>

        {videos.map((video, index) => (
          <div key={video.id}>
            {video.module && video.module !== videos[index - 1]?.module && (
              <h4 className="skillpath-video-module">{video.module}</h4>
            )}

            <button
              type="button"
              className={`skillpath-video-playlist-item ${
                activeVideoIndex === index ? "active" : ""
              }`}
              onClick={() => setActiveVideoIndex(index)}
            >
              <PlayCircle size={19} />
              <span>
                <strong>{video.topic}</strong>
                <small>{video.title} · {video.channel}</small>
              </span>
            </button>
          </div>
        ))}

      </div>
    </div>
  );
}

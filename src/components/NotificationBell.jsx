import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Bell } from "lucide-react";
import { learningPaths } from "../data/learningPaths";
import { courseContent } from "../data/courseContent";
import projects from "../data/projects";
import { getStreak, localDay } from "../utils/activity";
import { getCourseStatus } from "../utils/achievements";

const READ_KEY = "skillpath-notifications-read";

function readJson(key, fallback) {
  try {
    return JSON.parse(localStorage.getItem(key) || "null") ?? fallback;
  } catch {
    return fallback;
  }
}

// Notifications are worked out from the learner's saved progress.
function buildNotifications() {
  const list = [];

  learningPaths.forEach((path) => {
    const content = courseContent[path.slug];
    if (!content) return;
    const total = content.modules.reduce((n, m) => n + m.lessons.length, 0);
    const done = readJson(`skillpath-progress-${path.slug}`, []).length;
    if (done > 0 && done < total) {
      list.push({
        id: `continue-${path.slug}-${done}`,
        text: `Keep going in ${path.title}: ${done} of ${total} lessons done.`,
        to: `/learning-paths/${path.slug}`,
      });
    }
    // the badge needs every lesson done AND the quiz passed
    const status = getCourseStatus(path.slug);
    if (status.earned) {
      list.push({
        id: `finished-${path.slug}`,
        text: `You earned the ${path.title} badge! Your certificate is ready.`,
        to: `/learning-paths/${path.slug}/certificate`,
      });
    } else if (status.lessonsComplete) {
      list.push({
        id: `quiz-needed-${path.slug}`,
        text: `All ${path.title} lessons done. Score ${status.passMark}% on the quiz to earn your badge.`,
        to: `/quizzes/${path.slug}`,
      });
    } else if (status.quizPassed && status.best !== null && done > 0) {
      list.push({
        id: `lessons-needed-${path.slug}-${done}`,
        text: `You passed the ${path.title} quiz. Finish the remaining lessons to earn your badge.`,
        to: `/learning-paths/${path.slug}/lessons`,
      });
    }
  });

  // daily goal: do one lesson, quiz or practice challenge each day to build a streak
  const streak = getStreak();
  const today = localDay();
  if (streak.doneToday) {
    if (streak.current >= 2) {
      list.push({
        id: `streak-${today}`,
        text: `${streak.current}-day streak! Daily goal done. Come back tomorrow to keep it going.`,
        to: "/progress",
      });
    }
  } else if (streak.current > 0) {
    list.push({
      id: `streak-risk-${today}`,
      text: `Keep your ${streak.current}-day streak alive: finish one lesson, quiz or practice challenge today.`,
      to: "/learning-paths",
    });
  } else {
    list.push({
      id: `daily-goal-${today}`,
      text: "Daily goal: complete one lesson, quiz or practice challenge today to start a streak.",
      to: "/learning-paths",
    });
  }

  const scores = readJson("skillpath-quiz-scores", {});
  if (Object.keys(scores).length === 0) {
    list.push({
      id: "first-quiz",
      text: "Take your first quiz to check what you have learned.",
      to: "/quizzes",
    });
  }

  const doneProjects = readJson("skillpath-projects-done", []);
  if (doneProjects.length < projects.length) {
    list.push({
      id: `projects-${doneProjects.length}`,
      text: `${projects.length - doneProjects.length} practice projects are waiting for you.`,
      to: "/projects",
    });
  }

  if (!readJson("skillpath-user-profile", {}).firstName) {
    list.push({
      id: "profile",
      text: "Create your profile so your name shows in the top bar.",
      to: "/profile",
    });
  }

  return list;
}

export default function NotificationBell() {
  const [open, setOpen] = useState(false);
  const [read, setRead] = useState(() => readJson(READ_KEY, []));
  const [items, setItems] = useState(buildNotifications);
  const wrapperRef = useRef(null);
  const location = useLocation();

  // refresh when the page changes, because progress may have changed
  useEffect(() => {
    setItems(buildNotifications());
    setOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    function onClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    function onKey(event) {
      if (event.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onClickOutside);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClickOutside);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  const unread = items.filter((item) => !read.includes(item.id));

  function markAllRead() {
    const next = [...new Set([...read, ...items.map((item) => item.id)])];
    setRead(next);
    try {
      localStorage.setItem(READ_KEY, JSON.stringify(next));
    } catch {
      // storage unavailable: read state just won't persist
    }
  }

  return (
    <div className="notification-wrapper" ref={wrapperRef}>
      <button
        className="icon-button notification-button"
        aria-label={`Notifications${unread.length ? `, ${unread.length} unread` : ""}`}
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        <Bell size={18} />
        {unread.length > 0 && (
          <span className="notification-badge">{unread.length}</span>
        )}
      </button>

      {open && (
        <div className="notification-panel" role="dialog" aria-label="Notifications">
          <div className="notification-header">
            <strong>Notifications</strong>
            {unread.length > 0 && (
              <button onClick={markAllRead}>Mark all read</button>
            )}
          </div>

          {items.length === 0 ? (
            <p className="notification-empty">You are all caught up.</p>
          ) : (
            items.map((item) => (
              <Link
                key={item.id}
                to={item.to}
                className={
                  read.includes(item.id)
                    ? "notification-item"
                    : "notification-item unread"
                }
              >
                {item.text}
              </Link>
            ))
          )}
        </div>
      )}
    </div>
  );
}

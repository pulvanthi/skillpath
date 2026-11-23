

import { NavLink } from "react-router-dom";
import {
  House,
  Map,
  ChartNoAxesCombined,
  ClipboardCheck,
  Code2,
  FolderOpen,
  Bookmark,
  Settings,
  BookOpen,
  X,
  Sparkles,
  LogOut,
} from "lucide-react";
import { requestSignOut } from "../utils/signout";
import "./SignOut.css";

const mainLinks = [
  { label: "Home", to: "/", icon: House, end: true },
  { label: "Learning Paths", to: "/learning-paths", icon: Map },
  { label: "Resources", to: "/resources", icon: FolderOpen },
  { label: "My Progress", to: "/progress", icon: ChartNoAxesCombined },
  { label: "Quizzes", to: "/quizzes", icon: ClipboardCheck },
  { label: "Practice", to: "/practice", icon: Code2 },
  { label: "Projects", to: "/projects", icon: BookOpen },
];
const secondaryLinks = [
  { label: "Bookmarks", to: "/bookmarks", icon: Bookmark },
  { label: "Settings", to: "/settings", icon: Settings },
];

export default function Sidebar({ isOpen = false, onNavigate = () => {} }) {
  function renderLink(item) {
    const Icon = item.icon;

    return (
      <NavLink
        key={item.to}
        to={item.to}
        end={item.end}
        onClick={onNavigate}
        className={({ isActive }) =>
          `nav-item ${isActive ? "active" : ""}`
        }
      >
        <Icon size={17} />
        <span>{item.label}</span>
      </NavLink>
    );
  }

  return (
    <aside className={`sidebar ${isOpen ? "sidebar-open" : ""}`}>
      <div className="brand">
        <div className="brand-mark">
          <Sparkles size={28} />
        </div>

        <div>
          <b>SkillPath</b>
          <small>Learn · Build · Grow</small>
        </div>

        <button
          className="mobile-close"
          aria-label="Close menu"
          onClick={onNavigate}
        >
          <X size={20} />
        </button>
      </div>

      <nav className="nav-list">
        <div className="nav-group">
          {mainLinks.map(renderLink)}
        </div>

        <div className="nav-group nav-separated">
          {secondaryLinks.map(renderLink)}

          <button
            type="button"
            className="nav-item nav-signout"
            onClick={() => {
              onNavigate();
              requestSignOut();
            }}
          >
            <LogOut size={17} />
            <span>Sign out</span>
          </button>
        </div>
      </nav>

      <div className="keep-card">
        <div className="keep-rocket">🚀</div>
        <h3>Keep Going!</h3>
        <p>Every step counts towards your goal.</p>

        <div className="mini-progress">
          <span />
        </div>

        <div className="mountain">
          <svg viewBox="0 0 180 90" aria-hidden="true">
            <path
              d="M0 90 L48 43 L65 57 L100 12 L150 69 L180 90 Z"
              fill="#413b9b"
            />
            <path
              d="M48 43 L65 57 L100 12 L115 42 L100 33 L91 46 L78 39 L65 57 Z"
              fill="#7665ed"
            />
          </svg>
        </div>

        <div className="you-can">You can do it! 💪</div>
      </div>
    </aside>
  );
}

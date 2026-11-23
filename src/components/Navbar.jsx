


import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Menu, ChevronDown, LogOut } from "lucide-react";
import NotificationBell from "./NotificationBell";
import { requestSignOut } from "../utils/signout";
import "./SignOut.css";

export default function Navbar({ onMenuClick }) {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [profile, setProfile] = useState(() => {
    try {
      return JSON.parse(
        localStorage.getItem("skillpath-user-profile") || "{}"
      );
    } catch {
      return {};
    }
  });

  useEffect(() => {
    function updateProfile() {
      try {
        setProfile(
          JSON.parse(
            localStorage.getItem("skillpath-user-profile") || "{}"
          )
        );
      } catch {
        setProfile({});
      }
    }

    window.addEventListener("skillpath-profile-updated", updateProfile);

    return () => {
      window.removeEventListener("skillpath-profile-updated", updateProfile);
    };
  }, []);

  function handleSearch(event) {
    event.preventDefault();

    const query = search.trim();
    if (!query) return;

    navigate(`/search?q=${encodeURIComponent(query)}`);
  }

  const fullName =
    `${profile.firstName || ""} ${profile.lastName || ""}`.trim();

  const initials =
    ((profile.firstName || "")[0] || "") +
    ((profile.lastName || "")[0] || "");

  return (
    <header className="topbar">

      <button
        className="menu-toggle"
        aria-label="Open navigation"
        onClick={onMenuClick}
      >
        <Menu size={21} />
      </button>

      <form className="searchbox" onSubmit={handleSearch}>
        <Search size={17} />

        <input
          type="search"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search for topics, courses, or videos..."
          aria-label="Search learning content"
        />
      </form>

      <div className="header-actions">

        <NotificationBell />

        <button
          className="profile"
          type="button"
          onClick={() => navigate("/profile")}
          title="Open your profile"
        >
          {profile.photo ? (
            <img src={profile.photo} alt="Profile" />
          ) : (
            <span className="navbar-profile-initials">
              {initials.toUpperCase() || "SP"}
            </span>
          )}

          <span>
            <b>{fullName || "Create Profile"}</b>
            <small>
              {profile.headline || "Student"}
            </small>
          </span>

          <ChevronDown size={14} />
        </button>

        <button
          className="secondary-button topbar-signout"
          type="button"
          onClick={requestSignOut}
          title="Sign out of SkillPath"
        >
          <LogOut size={16} />
          <span>Sign out</span>
        </button>

      </div>
    </header>
  );
}

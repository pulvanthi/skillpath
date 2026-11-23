
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Camera, Eye, UserRound } from "lucide-react";
import AccountSecurity from "../components/AccountSecurity";
import "./Profile.css";

const emptyProfile = {
  firstName: "",
  lastName: "",
  headline: "",
  biography: "",
  language: "English (US)",
  website: "",
  facebook: "",
  instagram: "",
  linkedin: "",
  tiktok: "",
  x: "",
  youtube: "",
  photo: "",
};

export default function Profile() {
  const navigate = useNavigate();

  const [profile, setProfile] = useState(() => {
    try {
      const saved = localStorage.getItem("skillpath-user-profile");
      return saved ? { ...emptyProfile, ...JSON.parse(saved) } : emptyProfile;
    } catch {
      return emptyProfile;
    }
  });

  const [activeSection, setActiveSection] = useState("profile");
  const [savedMessage, setSavedMessage] = useState("");
  const [hasSavedProfile, setHasSavedProfile] = useState(() => {
    try {
      const saved = JSON.parse(
        localStorage.getItem("skillpath-user-profile") || "null"
      );
      return !!(saved && (saved.firstName || saved.lastName));
    } catch {
      return false;
    }
  });

  function flash(message) {
    setSavedMessage(message);
    setTimeout(() => setSavedMessage(""), 3000);
  }

  function removeProfile() {
    if (
      !window.confirm(
        "Remove your profile? Your name, photo and links will be deleted."
      )
    ) {
      return;
    }
    try {
      localStorage.removeItem("skillpath-user-profile");
    } catch {
      // storage unavailable: the form is still cleared below
    }
    setProfile(emptyProfile);
    setHasSavedProfile(false);
    setActiveSection("profile");
    window.dispatchEvent(new Event("skillpath-profile-updated"));
    flash("Your profile has been removed.");
  }

  function removePhoto() {
    const updated = { ...profile, photo: "" };
    setProfile(updated);
    if (hasSavedProfile) {
      try {
        localStorage.setItem("skillpath-user-profile", JSON.stringify(updated));
      } catch {
        // storage unavailable: the photo is removed on screen only
      }
      window.dispatchEvent(new Event("skillpath-profile-updated"));
    }
    flash("Photo removed.");
  }

  const fullName =
    `${profile.firstName} ${profile.lastName}`.trim();

  function updateField(event) {
    const { name, value } = event.target;

    setProfile((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  function handlePhoto(event) {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select an image file.");
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      setProfile((previous) => ({
        ...previous,
        photo: reader.result,
      }));
    };

    reader.readAsDataURL(file);
  }

  function saveProfile(event) {
    event.preventDefault();

    if (!profile.firstName.trim() || !profile.lastName.trim()) {
      alert("Please enter your first name and last name.");
      return;
    }

    localStorage.setItem(
      "skillpath-user-profile",
      JSON.stringify(profile)
    );

    window.dispatchEvent(new Event("skillpath-profile-updated"));

    setHasSavedProfile(true);
    flash("Your profile has been saved successfully.");
  }

  const initials = (
    (profile.firstName[0] || "") +
    (profile.lastName[0] || "")
  ).toUpperCase() || "SP";

  return (
    <div className="profile-page">

      {/* Profile Sidebar */}
      <aside className="profile-sidebar">

        <div className="profile-user-summary">

          <div className="profile-avatar-large">
            {profile.photo ? (
              <img src={profile.photo} alt="Profile" />
            ) : (
              initials
            )}
          </div>

          <h2>{fullName || "Your Name"}</h2>

          <p>{profile.headline || "Create your public profile"}</p>

          {hasSavedProfile && (
            <div className="profile-manage-buttons">
              <button
                type="button"
                className="profile-edit-button"
                onClick={() => setActiveSection("profile")}
              >
                Edit profile
              </button>
              <button
                type="button"
                className="profile-danger-button"
                onClick={removeProfile}
              >
                Remove profile
              </button>
            </div>
          )}
        </div>

        <button
          className="profile-side-link"
          onClick={() => setActiveSection("public")}
        >
          <Eye size={17} />
          View public profile
        </button>

        <button
          className={`profile-side-link ${
            activeSection === "profile" ? "selected" : ""
          }`}
          onClick={() => setActiveSection("profile")}
        >
          <UserRound size={17} />
          Profile
        </button>

        <button
          className={`profile-side-link ${
            activeSection === "photo" ? "selected" : ""
          }`}
          onClick={() => setActiveSection("photo")}
        >
          <Camera size={17} />
          Photo
        </button>

        <button
          className={`profile-side-link ${
            activeSection === "security" ? "selected" : ""
          }`}
          onClick={() => setActiveSection("security")}
        >
          Account Security
        </button>

      </aside>

      {/* Main Profile Content */}
      <main className="profile-main">

        <header className="profile-page-header">
          <button
            className="profile-back-button"
            onClick={() => navigate("/")}
          >
            <ArrowLeft size={17} />
            Back to SkillPath
          </button>

          <h1>
            {activeSection === "photo"
              ? "Profile Photo"
              : activeSection === "security"
              ? "Account Security"
              : activeSection === "public"
              ? "Public Profile Preview"
              : "Public Profile"}
          </h1>

          <p>
            {activeSection === "profile"
              ? "Add information about yourself"
              : "Manage your profile information"}
          </p>
        </header>

        <div className="profile-form-container">

          {activeSection === "profile" && (
            <form onSubmit={saveProfile}>

              <h3>Basics:</h3>

              <div className="profile-fields">

                <input
                  name="firstName"
                  value={profile.firstName}
                  onChange={updateField}
                  placeholder="First name"
                  maxLength={50}
                  required
                />

                <input
                  name="lastName"
                  value={profile.lastName}
                  onChange={updateField}
                  placeholder="Last name"
                  maxLength={50}
                  required
                />

                <div className="profile-input-with-count">
                  <input
                    name="headline"
                    value={profile.headline}
                    onChange={updateField}
                    placeholder="Professional headline"
                    maxLength={60}
                  />
                  <span>{60 - profile.headline.length}</span>
                </div>

                <small className="profile-help">
                  Add a professional headline, such as "Frontend Developer"
                  or "Computer Science Student".
                </small>

                <label className="profile-label">Biography</label>

                <textarea
                  name="biography"
                  value={profile.biography}
                  onChange={updateField}
                  placeholder="Write something about yourself..."
                  rows={5}
                  maxLength={1000}
                />

                <small className="profile-help">
                  Introduce yourself, your skills, interests and learning goals.
                </small>

                <label className="profile-label">Language</label>

                <select
                  name="language"
                  value={profile.language}
                  onChange={updateField}
                >
                  <option>English (US)</option>
                  <option>English (UK)</option>
                  <option>Hindi</option>
                  <option>Telugu</option>
                </select>

              </div>

              <div className="profile-divider" />

              <h3>Links:</h3>

              <div className="profile-fields">

                <input
                  name="website"
                  value={profile.website}
                  onChange={updateField}
                  placeholder="Website (https://...)"
                  type="url"
                />

                {[
                  ["facebook", "facebook.com/", "Username"],
                  ["instagram", "instagram.com/", "Username"],
                  ["linkedin", "linkedin.com/in/", "Public Profile URL"],
                  ["tiktok", "tiktok.com/@", "Username"],
                  ["x", "x.com/", "Username"],
                  ["youtube", "youtube.com/@", "Username"],
                ].map(([name, prefix, placeholder]) => (
                  <div className="profile-social-field" key={name}>
                    <span>{prefix}</span>
                    <input
                      name={name}
                      value={profile[name]}
                      onChange={updateField}
                      placeholder={placeholder}
                    />
                  </div>
                ))}

              </div>

              <div className="profile-save-area">

                {savedMessage && (
                  <p className="profile-success">{savedMessage}</p>
                )}

                <button className="profile-save-button" type="submit">
                  {hasSavedProfile ? "Update Profile" : "Save Profile"}
                </button>

                {hasSavedProfile && (
                  <button
                    className="profile-danger-button"
                    type="button"
                    onClick={removeProfile}
                  >
                    Remove Profile
                  </button>
                )}

              </div>

            </form>
          )}

          {activeSection === "photo" && (
            <div className="profile-photo-section">

              <h3>Your Profile Photo</h3>

              <div className="profile-photo-preview">
                {profile.photo ? (
                  <img src={profile.photo} alt="Your profile" />
                ) : (
                  initials
                )}
              </div>

              <label className="profile-upload-button">
                <Camera size={17} />
                Upload Photo
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhoto}
                />
              </label>

              <button
                className="profile-save-button"
                onClick={saveProfile}
                type="button"
              >
                Save Photo
              </button>

              {profile.photo && (
                <button
                  className="profile-danger-button"
                  onClick={removePhoto}
                  type="button"
                >
                  Remove Photo
                </button>
              )}

              {savedMessage && (
                <p className="profile-success">{savedMessage}</p>
              )}

            </div>
          )}

          {activeSection === "security" && (
            <AccountSecurity />
          )}

          {activeSection === "public" && (
            <div className="profile-public-preview">

              <div className="profile-avatar-large">
                {profile.photo ? (
                  <img src={profile.photo} alt="Profile" />
                ) : (
                  initials
                )}
              </div>

              <h2>{fullName || "Your Name"}</h2>

              <h3>{profile.headline || "Your professional headline"}</h3>

              <p>
                {profile.biography || "Your biography will appear here."}
              </p>

              <div className="profile-public-links">
                {[
                  ["Website", profile.website],
                  ["LinkedIn", profile.linkedin],
                  ["GitHub / Social", profile.github],
                  ["Instagram", profile.instagram],
                ].filter(([, value]) => value).map(([label, value]) => (
                  <p key={label}>
                    <strong>{label}:</strong> {value}
                  </p>
                ))}
              </div>

              <button
                className="profile-save-button"
                onClick={() => setActiveSection("profile")}
              >
                Edit Profile
              </button>

              {hasSavedProfile && (
                <button
                  className="profile-danger-button"
                  onClick={removeProfile}
                  type="button"
                >
                  Remove Profile
                </button>
              )}

            </div>
          )}

        </div>
      </main>
    </div>
  );
}

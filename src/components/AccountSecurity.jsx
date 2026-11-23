import { useState } from "react";
import { Eye, EyeOff, ShieldCheck } from "lucide-react";
import {
  getChangedAt,
  getLockOnOpen,
  hasPassword,
  lockNow,
  passwordChecks,
  removePassword,
  setLockOnOpen,
  setPassword,
  verifyPassword,
} from "../utils/security";

export default function AccountSecurity() {
  const [protectedNow, setProtectedNow] = useState(hasPassword());
  const [lockOnOpen, setLock] = useState(getLockOnOpen());
  const [current, setCurrent] = useState("");
  const [next, setNext] = useState("");
  const [confirm, setConfirm] = useState("");
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [busy, setBusy] = useState(false);

  const strength = passwordChecks(next);
  const changedAt = getChangedAt();

  function say(type, text) {
    setMessage({ type, text });
  }

  function clearFields() {
    setCurrent("");
    setNext("");
    setConfirm("");
  }

  async function save(event) {
    event.preventDefault();
    say("", "");

    if (protectedNow && !(await verifyPassword(current))) {
      say("error", "Your current password is incorrect.");
      return;
    }
    if (next.length < 8) {
      say("error", "The new password must be at least 8 characters.");
      return;
    }
    if (strength.score < 2) {
      say("error", "Choose a stronger password (see the checklist).");
      return;
    }
    if (next !== confirm) {
      say("error", "The new password and confirmation do not match.");
      return;
    }
    if (protectedNow && next === current) {
      say("error", "The new password must be different from the current one.");
      return;
    }

    setBusy(true);
    try {
      await setPassword(next);
      setProtectedNow(true);
      clearFields();
      say("success", protectedNow ? "Password changed." : "Password set. Your account is now protected.");
    } catch {
      say("error", "Could not save the password in this browser.");
    }
    setBusy(false);
  }

  async function remove() {
    const typed = window.prompt("Enter your current password to remove it:");
    if (typed === null) return;
    if (!(await verifyPassword(typed))) {
      say("error", "Incorrect password. It was not removed.");
      return;
    }
    removePassword();
    setProtectedNow(false);
    setLock(false);
    clearFields();
    say("success", "Password removed.");
  }

  function toggleLock(event) {
    setLockOnOpen(event.target.checked);
    setLock(event.target.checked);
    say(
      "success",
      event.target.checked
        ? "SkillPath will ask for your password each time it is opened."
        : "The lock screen is turned off."
    );
  }

  function lockAndReload() {
    lockNow();
    window.location.reload();
  }

  return (
    <div className="security-section">
      <h3>
        <ShieldCheck size={20} /> Account Security
      </h3>

      <p className="security-status">
        Status:{" "}
        <strong className={protectedNow ? "ok" : "warn"}>
          {protectedNow ? "Password protected" : "No password set"}
        </strong>
        {protectedNow && changedAt && (
          <span> · last changed {new Date(changedAt).toLocaleDateString()}</span>
        )}
      </p>

      <form className="security-form" onSubmit={save}>
        <h4>{protectedNow ? "Change password" : "Set a password"}</h4>

        {protectedNow && (
          <input
            type={show ? "text" : "password"}
            placeholder="Current password"
            value={current}
            onChange={(e) => setCurrent(e.target.value)}
            autoComplete="current-password"
            required
          />
        )}

        <div className="security-password-row">
          <input
            type={show ? "text" : "password"}
            placeholder="New password"
            value={next}
            onChange={(e) => setNext(e.target.value)}
            autoComplete="new-password"
            required
          />
          <button
            type="button"
            className="security-eye"
            onClick={() => setShow((v) => !v)}
            aria-label={show ? "Hide passwords" : "Show passwords"}
          >
            {show ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        {next && (
          <>
            <div className={`strength-bar level-${strength.score}`}>
              <span />
              <span />
              <span />
              <span />
            </div>
            <small className="strength-label">Strength: {strength.label}</small>
            <ul className="security-checks">
              {strength.checks.map((c) => (
                <li key={c.label} className={c.ok ? "ok" : ""}>
                  {c.ok ? "✓" : "○"} {c.label}
                </li>
              ))}
            </ul>
          </>
        )}

        <input
          type={show ? "text" : "password"}
          placeholder="Confirm new password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          autoComplete="new-password"
          required
        />

        {message.text && (
          <p className={message.type === "error" ? "security-error" : "profile-success"}>
            {message.text}
          </p>
        )}

        <div className="security-actions">
          <button className="profile-save-button" type="submit" disabled={busy}>
            {protectedNow ? "Change Password" : "Set Password"}
          </button>
          {protectedNow && (
            <button type="button" className="profile-danger-button" onClick={remove}>
              Remove Password
            </button>
          )}
        </div>
      </form>

      {protectedNow && (
        <div className="security-card">
          <label className="security-toggle">
            <input type="checkbox" checked={lockOnOpen} onChange={toggleLock} />
            <span>
              <b>Ask for password when SkillPath opens</b>
              <small>Shows a lock screen each time you open the app in a new tab or session.</small>
            </span>
          </label>
          {lockOnOpen && (
            <button type="button" className="profile-edit-button" onClick={lockAndReload}>
              Lock now
            </button>
          )}
        </div>
      )}

      <div className="security-card">
        <h4>Good to know</h4>
        <ul className="security-tips">
          <li>
            This password is stored only in this browser (as a salted hash, never as plain text).
            It stops someone casually opening SkillPath on your computer.
          </li>
          <li>It cannot be recovered. If you forget it, clear this site's data in your browser.</li>
          <li>It is not a full account login. That needs a backend server, which SkillPath does not have yet.</li>
          <li>Use a password you do not use anywhere else.</li>
        </ul>
      </div>
    </div>
  );
}

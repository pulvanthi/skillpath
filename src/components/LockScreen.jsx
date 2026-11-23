import { useState } from "react";
import { Lock } from "lucide-react";
import { markUnlocked, verifyPassword } from "../utils/security";

export default function LockScreen({ onUnlock }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(event) {
    event.preventDefault();
    setBusy(true);
    const ok = await verifyPassword(password);
    setBusy(false);
    if (ok) {
      markUnlocked();
      onUnlock();
    } else {
      setError("Incorrect password. Try again.");
      setPassword("");
    }
  }

  return (
    <div className="lock-screen">
      <form className="lock-card" onSubmit={submit}>
        <span className="lock-icon">
          <Lock size={26} />
        </span>
        <h1>SkillPath is locked</h1>
        <p>Enter your password to continue.</p>
        <input
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setError("");
          }}
          placeholder="Password"
          autoFocus
          autoComplete="current-password"
        />
        {error && <p className="security-error">{error}</p>}
        <button className="profile-save-button" type="submit" disabled={busy || !password}>
          Unlock
        </button>
      </form>
    </div>
  );
}

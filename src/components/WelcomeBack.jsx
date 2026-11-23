import { useEffect, useState } from "react";
import { ArrowRight, GraduationCap } from "lucide-react";
import AuthShell from "./AuthShell";
import { api, getLastEmail } from "../utils/api";

// Start screen shown each time SkillPath is opened in a new tab or window while a saved login exists.
// The learner can continue with their saved account, or switch to another account / create a new one.
export default function WelcomeBack({ onContinue, onSwitch }) {
  const [email, setEmail] = useState(getLastEmail);

  // older logins did not remember the email, so ask the server who is signed in
  useEffect(() => {
    if (email) return undefined;
    let cancelled = false;
    api("/auth/me")
      .then((me) => !cancelled && setEmail(me.email))
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [email]);

  return (
    <AuthShell>
      <div className="auth-card">
        <span className="auth-card-icon">
          <GraduationCap size={30} />
        </span>
        <h1>Welcome back</h1>
        <p>
          {email ? (
            <>
              You are signed in as <strong>{email}</strong>. Your progress is saved to this account.
            </>
          ) : (
            "You are signed in. Your progress is saved to your account."
          )}
        </p>

        <div className="welcome-actions">
          <button className="primary-button auth-submit" type="button" autoFocus onClick={onContinue}>
            Continue <ArrowRight size={18} />
          </button>
          <button className="secondary-button" type="button" onClick={() => onSwitch("login")}>
            Sign in with a different account
          </button>
          <button className="secondary-button" type="button" onClick={() => onSwitch("register")}>
            Create a new account
          </button>
        </div>
      </div>
    </AuthShell>
  );
}

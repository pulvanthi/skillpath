import { useEffect, useRef, useState } from "react";
import { ArrowRight, Eye, EyeOff, GraduationCap, Lock, Mail } from "lucide-react";
import AuthShell from "./AuthShell";
import { getLastEmail, login, register } from "../utils/api";

// The multicolour Google "G" used on the "Continue with Google" button.
function GoogleG() {
  return (
    <svg width="20" height="20" viewBox="0 0 48 48" aria-hidden="true">
      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
      <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
      <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
    </svg>
  );
}

// First screen of the app. Shown whenever nobody is signed in.
//   - Sign in: loads the learner's saved progress from the database.
//   - Create account: starts a new account. If the email is already registered, the form
//     switches to Sign in by itself, keeping the email.
//   - "Keep me signed in": the login lasts 30 days on this device, so the learner is not asked
//     again next time. The email is remembered too. Passwords are never stored by the app.
export default function AuthScreen({ onSignedIn, notice = "", initialMode = "login", prefill = true }) {
  const [lastEmail] = useState(() => (prefill ? getLastEmail() : ""));
  const [mode, setMode] = useState(initialMode);
  const [email, setEmail] = useState(lastEmail);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");
  const [busy, setBusy] = useState(false);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const isRegister = mode === "register";

  // start typing in the first empty field (the password if the email is already filled in)
  useEffect(() => {
    (email ? passwordRef : emailRef).current?.focus();
  }, [mode]); // eslint-disable-line react-hooks/exhaustive-deps

  function switchMode(next) {
    setMode(next);
    setError("");
    setInfo("");
  }

  async function submit(event) {
    event.preventDefault();
    setBusy(true);
    setError("");
    setInfo("");
    try {
      if (isRegister) await register(email.trim(), password, remember);
      else await login(email.trim(), password, remember);
      onSignedIn();
    } catch (err) {
      if (isRegister && err.status === 409) {
        // the account already exists: move to Sign in and keep the email
        setMode("login");
        setPassword("");
        setInfo("You already have an account with this email. Enter your password to sign in.");
      } else {
        setError(err.message);
      }
    } finally {
      setBusy(false);
    }
  }

  return (
    <AuthShell>
      <form className="auth-card" onSubmit={submit}>
        <span className="auth-card-icon">
          <GraduationCap size={30} />
        </span>
        <h1>{isRegister ? "Create your account" : "Sign in to SkillPath"}</h1>
        <p>
          {isRegister
            ? "Your progress will be saved to your account."
            : lastEmail
              ? "Welcome back. Sign in to continue where you left off."
              : "Sign in to load your saved progress."}
        </p>

        {notice && <p className="security-error" role="alert">{notice}</p>}
        {info && <p className="auth-info" role="status">{info}</p>}

        <div className="auth-field">
          <Mail size={18} />
          <input
            ref={emailRef}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            aria-label="Email address"
            autoComplete="email"
            required
          />
        </div>

        <div className="auth-field">
          <Lock size={18} />
          <input
            ref={passwordRef}
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder={isRegister ? "Create a password (at least 8 characters)" : "Enter your password"}
            aria-label="Password"
            autoComplete={isRegister ? "new-password" : "current-password"}
            minLength={isRegister ? 8 : undefined}
            required
          />
          <button
            type="button"
            className="auth-eye"
            aria-label={showPassword ? "Hide password" : "Show password"}
            onClick={() => setShowPassword((value) => !value)}
          >
            {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
          </button>
        </div>

        <label className="auth-remember">
          <input
            type="checkbox"
            checked={remember}
            onChange={(e) => setRemember(e.target.checked)}
          />
          Keep me signed in on this device
        </label>

        {error && <p className="security-error" role="alert">{error}</p>}

        <button className="primary-button auth-submit" type="submit" disabled={busy}>
          {busy ? (
            "Please wait..."
          ) : (
            <>
              {isRegister ? "Create Account" : "Sign In"} <ArrowRight size={18} />
            </>
          )}
        </button>

        <div className="auth-divider">or</div>

        <button
          type="button"
          className="secondary-button auth-google"
          onClick={() => {
            // Google sign-in is not built yet: say so instead of doing nothing
            setError("");
            setInfo("Google sign-in is not available yet. Please use your email and password.");
          }}
        >
          <GoogleG /> Continue with Google
        </button>

        <p className="auth-switch">
          {isRegister ? "Already have an account? " : "Don't have an account? "}
          <button
            type="button"
            className="auth-link"
            onClick={() => switchMode(isRegister ? "login" : "register")}
          >
            {isRegister ? "Sign in" : "Create a new account"}
          </button>
        </p>

        {!remember && (
          <small className="auth-hint">
            You will be signed out when you close the browser. Use this on shared computers.
          </small>
        )}
      </form>
    </AuthShell>
  );
}

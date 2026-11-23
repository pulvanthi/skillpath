

import { useCallback, useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import LockScreen from "./components/LockScreen";
import AuthScreen from "./components/AuthScreen";
import WelcomeBack from "./components/WelcomeBack";
import { needsLock } from "./utils/security";
import { getToken, setToken } from "./utils/api";
import { clearLocalData, pullFromServer } from "./utils/sync";
import AppLayout from "./layouts/AppLayout";

import Home from "./pages/Home";
import LearningPaths from "./pages/LearningPaths";
import LearningPathDetails from "./pages/LearningPathDetails";
import Lessons from "./pages/Lessons";
import Certificate from "./pages/Certificate";
import QuizHistory from "./pages/QuizHistory";
import MyProgress from "./pages/MyProgress";
import Quizzes from "./pages/Quizzes";
import QuizTest from "./pages/QuizTest";
import Projects from "./pages/Projects";
import ProjectDetails from "./pages/ProjectDetails";
import Search from "./pages/Search";
import Practice from "./pages/Practice";
import Resources from "./pages/Resources";
import Bookmarks from "./pages/Bookmarks";
import Settings from "./pages/Settings";
import Profile from "./pages/Profile";

// Remembers, for this browser tab, that the learner already passed the start screen.
// Refreshing the page keeps it; opening SkillPath in a new tab or window shows it again.
const ENTERED_KEY = "skillpath-entered";

export default function App() {
  const [locked, setLocked] = useState(() => needsLock());
  const [signedIn, setSignedIn] = useState(() => !!getToken());
  const [entered, setEntered] = useState(() => {
    try {
      return sessionStorage.getItem(ENTERED_KEY) === "1";
    } catch {
      return false;
    }
  });
  const [ready, setReady] = useState(false);
  const [notice, setNotice] = useState("");
  const [authMode, setAuthMode] = useState("login"); // which form the sign-in screen opens on
  const [blankForm, setBlankForm] = useState(false); // true when switching account: no email prefilled

  const markEntered = useCallback(() => {
    try {
      sessionStorage.setItem(ENTERED_KEY, "1");
    } catch {
      // storage unavailable: the start screen will simply show again next time
    }
    setEntered(true);
  }, []);

  const signOut = useCallback((message = "") => {
    setToken("");
    clearLocalData();
    try {
      sessionStorage.removeItem(ENTERED_KEY);
    } catch {
      // ignore
    }
    setEntered(false);
    setReady(false);
    setSignedIn(false);
    setNotice(message);
    setAuthMode("login");
    setBlankForm(false);
  }, []);

  // "Sign in with a different account" / "Create a new account" on the start screen
  const switchAccount = useCallback(
    (mode) => {
      signOut();
      setAuthMode(mode);
      setBlankForm(true);
    },
    [signOut]
  );

  // After sign-in, load the user's data from PostgreSQL before showing any page.
  useEffect(() => {
    if (!signedIn) return;
    let cancelled = false;
    pullFromServer()
      .then(() => !cancelled && setReady(true))
      .catch((error) => {
        if (cancelled) return;
        if (error.status === 401) signOut("Your session expired. Please sign in again.");
        else {
          setNotice(error.message);
          setReady(true); // work offline with whatever is stored in this browser
        }
      });
    return () => {
      cancelled = true;
    };
  }, [signedIn, signOut]);

  useEffect(() => {
    const expired = () => signOut("Your session expired. Please sign in again.");
    const manual = () => signOut();
    window.addEventListener("skillpath-auth-expired", expired);
    window.addEventListener("skillpath-sign-out", manual);
    return () => {
      window.removeEventListener("skillpath-auth-expired", expired);
      window.removeEventListener("skillpath-sign-out", manual);
    };
  }, [signOut]);

  // 1. nobody signed in: Sign in / Create account
  if (!signedIn) {
    return (
      <AuthScreen
        key={`${authMode}-${blankForm}`}
        initialMode={authMode}
        prefill={!blankForm}
        notice={notice}
        onSignedIn={() => {
          setNotice("");
          markEntered();
          setSignedIn(true);
        }}
      />
    );
  }
  // 2. a saved login exists but SkillPath was just opened: start screen
  if (!entered) return <WelcomeBack onContinue={markEntered} onSwitch={switchAccount} />;
  if (!ready) return <div className="lock-screen"><p>Loading your data...</p></div>;
  if (locked) return <LockScreen onUnlock={() => setLocked(false)} />;

  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/:id" element={<ProjectDetails />} />
        <Route path="/search" element={<Search />} />
        <Route path="/" element={<Home />} />

        <Route
          path="/learning-paths"
          element={<LearningPaths />}
        />

        <Route
  path="/learning-paths/:slug"
  element={<LearningPathDetails />}
/>

        <Route path="/learning-paths/:slug/lessons" element={<Lessons />} />
        <Route path="/learning-paths/:slug/certificate" element={<Certificate />} />

        <Route path="/progress" element={<MyProgress />} />

        <Route path="/quizzes" element={<Quizzes />} />

        <Route path="/quizzes/:quizId/history" element={<QuizHistory />} />

        <Route
          path="/quizzes/:quizId"
          element={<QuizTest />}
        />

        <Route path="/practice" element={<Practice />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/bookmarks" element={<Bookmarks />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/profile" element={<Profile />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

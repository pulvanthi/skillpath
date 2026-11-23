import { useEffect, useState } from "react";
import { BookOpen, ChartNoAxesCombined, Code2, Gift, GraduationCap, Heart } from "lucide-react";
import HeroArt from "./HeroArt";
import "./AuthShell.css";

const FEATURES = [
  { icon: BookOpen, text: "Structured Learning Paths" },
  { icon: Code2, text: "Hands-on Projects" },
  { icon: ChartNoAxesCombined, text: "Track Your Progress" },
  { icon: Gift, text: "100% Free Resources" },
];

// Pictures tried for the illustration, best first:
//   /auth-hero.png       a clean, full illustration you save in public/ (shown as it is)
//   /auth-hero-crop.png  the illustration cut from the design picture (the text at its edge is hidden by CSS)
//   otherwise            the simple SVG drawing in HeroArt.jsx
const HERO_IMAGES = [
  { src: "/auth-hero.png", cropped: false },
  { src: "/auth-hero-crop.png", cropped: true },
];

function canLoad(src) {
  return new Promise((resolve) => {
    const probe = new window.Image();
    probe.onload = () => resolve(true);
    probe.onerror = () => resolve(false);
    probe.src = src;
  });
}

// Page frame for Sign in, Create account and Welcome back:
// a branded panel on the left and the form card on the right.
export default function AuthShell({ children }) {
  const [hero, setHero] = useState(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      for (const candidate of HERO_IMAGES) {
        if (await canLoad(candidate.src)) {
          if (!cancelled) setHero(candidate);
          return;
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="auth-page">
      <aside className="auth-hero">
        <div className="auth-brand">
          <span className="auth-brand-mark">
            <GraduationCap size={34} />
          </span>
          <div>
            <b>SkillPath</b>
            <small>Free Open Learning Hub</small>
          </div>
        </div>

        <div className="auth-hero-copy">
          <h2>
            Learn. Build. <span>Grow.</span>
          </h2>
          <p className="auth-lead">Your learning journey starts here!</p>
          <ul className="auth-features">
            {FEATURES.map(({ icon: Icon, text }) => (
              <li key={text}>
                <span>
                  <Icon size={20} />
                </span>
                <em>{text}</em>
              </li>
            ))}
          </ul>
        </div>

        <p className="auth-quote">
          Be the developer you want to be. <Heart size={16} />
        </p>

        {hero ? (
          <div className={hero.cropped ? "auth-art cropped" : "auth-art"}>
            <img src={hero.src} alt="" />
          </div>
        ) : (
          <div className="auth-art drawing">
            <HeroArt />
          </div>
        )}
      </aside>

      <main className="auth-panel">
        <p className="auth-tagline">
          Learn <i /> Build <i /> Grow
        </p>
        <div className="auth-mobile-brand">
          <GraduationCap size={22} /> SkillPath
        </div>
        {children}
      </main>
    </div>
  );
}

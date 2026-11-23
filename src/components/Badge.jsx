import { Award, Lock } from "lucide-react";
import "./Badge.css";

// Round badge. Earned = gold with an award icon; locked = grey with a padlock.
export default function Badge({ title, earned, size = 96 }) {
  return (
    <div
      className={earned ? "sp-badge earned" : "sp-badge locked"}
      style={{ width: size, height: size }}
      role="img"
      aria-label={earned ? `${title} badge earned` : `${title} badge locked`}
    >
      {earned ? <Award size={size * 0.5} /> : <Lock size={size * 0.4} />}
    </div>
  );
}

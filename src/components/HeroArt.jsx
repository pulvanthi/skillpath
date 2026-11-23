// Illustration for the sign-in page: a learner on a stack of books with a laptop.
// Drawn as SVG so it needs no image file. To use your own picture instead, save it as
// public/auth-hero.png and AuthShell will show that.
export default function HeroArt() {
  return (
    <svg viewBox="0 0 420 380" role="img" aria-label="A learner sitting on a stack of Java, Python and Web Development books with a laptop" className="auth-art-svg">
      <defs>
        <radialGradient id="ha-glow" cx="50%" cy="45%" r="55%">
          <stop offset="0%" stopColor="#c4b5fd" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#7c5cff" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="ha-hoodie" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <linearGradient id="ha-screen" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8b6cff" />
          <stop offset="100%" stopColor="#5b3df0" />
        </linearGradient>
      </defs>

      {/* glow and ground shadow */}
      <circle cx="215" cy="175" r="165" fill="url(#ha-glow)" />
      <ellipse cx="215" cy="348" rx="150" ry="12" fill="#14083f" opacity="0.35" />

      {/* floating tiles */}
      <g transform="rotate(-8 72 100)">
        <rect x="40" y="68" width="66" height="66" rx="14" fill="#ffffff" fillOpacity="0.12" stroke="#ffffff" strokeOpacity="0.35" />
        <text x="73" y="110" textAnchor="middle" fontSize="24" fontWeight="700" fill="#ffffff" fontFamily="monospace">{"</>"}</text>
      </g>
      <g transform="rotate(8 360 90)">
        <rect x="328" y="56" width="66" height="66" rx="14" fill="#ffffff" fillOpacity="0.12" stroke="#ffffff" strokeOpacity="0.35" />
        <rect x="342" y="92" width="8" height="16" rx="2" fill="#ffffff" />
        <rect x="357" y="84" width="8" height="24" rx="2" fill="#ffffff" />
        <rect x="372" y="74" width="8" height="34" rx="2" fill="#ffffff" />
        <polyline points="342,84 358,74 372,64" fill="none" stroke="#fcd34d" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      </g>

      {/* light bulb */}
      <g>
        <circle cx="205" cy="40" r="26" fill="#fde68a" fillOpacity="0.25" />
        <circle cx="205" cy="38" r="15" fill="#fcd34d" />
        <rect x="199" y="50" width="12" height="9" rx="2" fill="#e5e7eb" />
        <g stroke="#fde68a" strokeWidth="3" strokeLinecap="round">
          <line x1="205" y1="8" x2="205" y2="14" />
          <line x1="180" y1="20" x2="185" y2="25" />
          <line x1="230" y1="20" x2="225" y2="25" />
          <line x1="173" y1="40" x2="179" y2="40" />
          <line x1="237" y1="40" x2="231" y2="40" />
        </g>
      </g>

      {/* plant */}
      <g>
        <path d="M56 300 L96 300 L90 346 L62 346 Z" fill="#f1f5f9" />
        <ellipse cx="76" cy="300" rx="20" ry="5" fill="#cbd5e1" />
        <path d="M76 298 C58 270 52 248 62 232 C76 244 80 270 76 298 Z" fill="#22c55e" />
        <path d="M76 298 C94 266 104 246 96 228 C80 240 74 268 76 298 Z" fill="#16a34a" />
        <path d="M76 298 C70 276 76 258 84 246 C90 262 86 282 76 298 Z" fill="#4ade80" />
      </g>

      {/* books */}
      <g fontFamily="system-ui, sans-serif" fontWeight="700" fontSize="14" fill="#ffffff">
        <rect x="108" y="306" width="222" height="36" rx="7" fill="#f59e0b" />
        <rect x="318" y="310" width="12" height="28" rx="3" fill="#fde68a" />
        <text x="130" y="330">Web Development</text>

        <rect x="122" y="272" width="200" height="34" rx="7" fill="#2563eb" />
        <rect x="310" y="276" width="12" height="26" rx="3" fill="#bfdbfe" />
        <text x="146" y="294">Python</text>

        <rect x="112" y="238" width="212" height="34" rx="7" fill="#5b21b6" />
        <rect x="312" y="242" width="12" height="26" rx="3" fill="#ddd6fe" />
        <text x="136" y="260">Java</text>
      </g>

      {/* learner: legs, shoes, hoodie, arms, head, hair */}
      <g>
        <rect x="118" y="218" width="112" height="24" rx="12" fill="#3b82f6" />
        <rect x="108" y="226" width="34" height="16" rx="8" fill="#f8fafc" />
        <rect x="206" y="226" width="34" height="16" rx="8" fill="#f8fafc" />
        <rect x="140" y="152" width="74" height="84" rx="26" fill="url(#ha-hoodie)" />
        <path d="M166 152 C172 168 184 168 190 152" fill="none" stroke="#ede9fe" strokeWidth="3" strokeLinecap="round" />
        <line x1="158" y1="180" x2="222" y2="204" stroke="#7c3aed" strokeWidth="17" strokeLinecap="round" />
        <circle cx="226" cy="205" r="8" fill="#fde0c8" />
        <circle cx="176" cy="102" r="13" fill="#2b1b3a" />
        <rect x="147" y="106" width="56" height="62" rx="28" fill="#2b1b3a" />
        <circle cx="174" cy="132" r="25" fill="#fde0c8" />
        <path d="M148 128 C150 106 198 104 200 128 C190 118 160 118 148 128 Z" fill="#2b1b3a" />
        <circle cx="165" cy="136" r="2.4" fill="#2b1b3a" />
        <circle cx="183" cy="136" r="2.4" fill="#2b1b3a" />
        <path d="M167 146 Q174 152 181 146" fill="none" stroke="#c2410c" strokeWidth="2" strokeLinecap="round" />
        <circle cx="160" cy="143" r="3.5" fill="#fca5a5" fillOpacity="0.6" />
        <circle cx="188" cy="143" r="3.5" fill="#fca5a5" fillOpacity="0.6" />
      </g>

      {/* laptop */}
      <g>
        <rect x="222" y="148" width="118" height="82" rx="9" fill="#ddd6fe" />
        <rect x="229" y="155" width="104" height="68" rx="5" fill="url(#ha-screen)" />
        <path d="M281 172 L262 181 L281 190 L300 181 Z" fill="#ffffff" />
        <path d="M270 186 L270 196 C276 201 286 201 292 196 L292 186 L281 192 Z" fill="#ffffff" fillOpacity="0.85" />
        <rect x="212" y="228" width="138" height="11" rx="5" fill="#c4b5fd" />
      </g>
    </svg>
  );
}

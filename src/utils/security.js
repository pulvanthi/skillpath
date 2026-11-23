const KEY = "skillpath-security";
const SESSION_KEY = "skillpath-unlocked";

function read() {
  try {
    return JSON.parse(localStorage.getItem(KEY) || "null");
  } catch {
    return null;
  }
}

function write(data) {
  localStorage.setItem(KEY, JSON.stringify(data));
}

async function hash(password, salt) {
  const bytes = new TextEncoder().encode(`${salt}:${password}`);
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export function hasPassword() {
  return !!read()?.hash;
}

export function getLockOnOpen() {
  return !!read()?.lockOnOpen;
}

export function setLockOnOpen(value) {
  const data = read();
  if (data) write({ ...data, lockOnOpen: value });
}

export async function setPassword(password) {
  const salt = crypto.randomUUID();
  const existing = read();
  write({
    salt,
    hash: await hash(password, salt),
    lockOnOpen: existing?.lockOnOpen || false,
    changedAt: new Date().toISOString(),
  });
}

export async function verifyPassword(password) {
  const data = read();
  if (!data?.hash) return false;
  return (await hash(password, data.salt)) === data.hash;
}

export function removePassword() {
  try {
    localStorage.removeItem(KEY);
    sessionStorage.removeItem(SESSION_KEY);
  } catch {
    // ignore
  }
}

export function getChangedAt() {
  return read()?.changedAt || "";
}

export function isUnlocked() {
  try {
    return sessionStorage.getItem(SESSION_KEY) === "1";
  } catch {
    return false;
  }
}

export function markUnlocked() {
  try {
    sessionStorage.setItem(SESSION_KEY, "1");
  } catch {
    // ignore
  }
}

export function lockNow() {
  try {
    sessionStorage.removeItem(SESSION_KEY);
  } catch {
    // ignore
  }
}

export function needsLock() {
  return hasPassword() && getLockOnOpen() && !isUnlocked();
}

// Returns the checks a password passes and a 0-4 score
export function passwordChecks(password) {
  const checks = [
    { label: "At least 8 characters", ok: password.length >= 8 },
    { label: "An uppercase letter", ok: /[A-Z]/.test(password) },
    { label: "A lowercase letter", ok: /[a-z]/.test(password) },
    { label: "A number", ok: /\d/.test(password) },
    { label: "A symbol (e.g. ! @ #)", ok: /[^A-Za-z0-9]/.test(password) },
  ];
  const passed = checks.filter((c) => c.ok).length;
  let score = 0;
  if (password.length >= 8) score = Math.max(1, passed - 1);
  if (password.length >= 12 && passed >= 4) score = 4;
  score = Math.min(score, 4);
  if (password.length > 0 && password.length < 8) score = 0;
  const labels = ["Too weak", "Weak", "Fair", "Good", "Strong"];
  return { checks, score, label: labels[score] };
}

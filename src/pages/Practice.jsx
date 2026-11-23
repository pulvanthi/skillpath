import { useEffect, useRef, useState } from "react";

const jsChallenges = [
  {
    title: "Hello World",
    task: "Write a JavaScript statement that prints Hello, SkillPath!",
    starter: 'console.log("Hello, SkillPath!");',
    expected: "Hello, SkillPath!",
  },
  {
    title: "Sum of Two Numbers",
    task: "Declare a = 12 and b = 30, then print their sum.",
    starter: "const a = 12;\nconst b = 30;\n// print the sum below\n",
    expected: "42",
  },
  {
    title: "Even or Odd",
    task: 'Print "Even" if the number 18 is even, otherwise print "Odd".',
    starter: "const n = 18;\n// your code here\n",
    expected: "Even",
  },
  {
    title: "Count to 5",
    task: "Use a loop to print the numbers 1 to 5, one per line.",
    starter: "// your loop here\n",
    expected: "1\n2\n3\n4\n5",
  },
  {
    title: "Reverse a String",
    task: 'Print the reverse of "SkillPath".',
    starter: 'const text = "SkillPath";\n// your code here\n',
    expected: "htaPllikS",
  },
  {
    title: "Largest of Three",
    task: "Print the largest of the numbers 14, 87 and 52.",
    starter: "const a = 14;\nconst b = 87;\nconst c = 52;\n// your code here\n",
    expected: "87",
  },
  {
    title: "Factorial",
    task: "Print the factorial of 5 (5 × 4 × 3 × 2 × 1).",
    starter: "const n = 5;\n// your code here\n",
    expected: "120",
  },
  {
    title: "Multiplication Table",
    task: "Print the table of 3 from 3 × 1 to 3 × 5, one result per line.",
    starter: "// your loop here\n",
    expected: "3\n6\n9\n12\n15",
  },
  {
    title: "Sum of an Array",
    task: "Print the sum of the numbers in the array.",
    starter: "const numbers = [4, 8, 15, 16, 23, 42];\n// your code here\n",
    expected: "108",
  },
  {
    title: "Palindrome Check",
    task: 'Print true if "level" reads the same backwards, otherwise false.',
    starter: 'const word = "level";\n// your code here\n',
    expected: "true",
  },
  {
    title: "Count Vowels",
    task: 'Print how many vowels (a, e, i, o, u) are in "programming".',
    starter: 'const text = "programming";\n// your code here\n',
    expected: "3",
  },
  {
    title: "FizzBuzz (1 to 15)",
    task: 'For 1 to 15 print "Fizz" for multiples of 3, "Buzz" for multiples of 5, "FizzBuzz" for both, otherwise the number.',
    starter: "// your loop here\n",
    expected:
      "1\n2\nFizz\n4\nBuzz\nFizz\n7\n8\nFizz\nBuzz\n11\nFizz\n13\n14\nFizzBuzz",
  },
  {
    title: "Fibonacci",
    task: "Print the first 8 Fibonacci numbers separated by a space (0 1 1 2 …).",
    starter: "// your code here\n",
    expected: "0 1 1 2 3 5 8 13",
  },
  {
    title: "Filter Even Numbers",
    task: "Use filter to print only the even numbers of the array as JSON.",
    starter: "const numbers = [1, 2, 3, 4, 5, 6, 7, 8];\n// your code here\n",
    expected: "[2,4,6,8]",
  },
  {
    title: "Capitalize Words",
    task: 'Print "hello skillpath world" with each word capitalized.',
    starter: 'const sentence = "hello skillpath world";\n// your code here\n',
    expected: "Hello Skillpath World",
  },
];

// Other languages run on the public Judge0 CE service (ce.judge0.com).
const JUDGE0_URL =
  "https://ce.judge0.com/submissions?base64_encoded=false&wait=true";
const REMOTE_TIMEOUT_MS = 20000;

// Bodies for the first five challenges, wrapped in each language's boilerplate.
const bodies = {
  common: [
    "// print Hello, SkillPath!",
    "int a = 12;\n    int b = 30;\n    // print the sum below",
    "int n = 18;\n    // your code here",
    "// your loop here",
  ],
  java: 'String text = "SkillPath";\n        // your code here',
  c: 'char text[] = "SkillPath";\n    // your code here',
  cpp: 'string text = "SkillPath";\n    // your code here',
};

function wrap(language, body) {
  if (language === "java") {
    return `public class Main {\n    public static void main(String[] args) {\n        ${body.replace(/\n    /g, "\n        ")}\n    }\n}\n`;
  }
  if (language === "c") {
    return `#include <stdio.h>\n#include <string.h>\n\nint main() {\n    ${body}\n    return 0;\n}\n`;
  }
  return `#include <iostream>\n#include <string>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n    ${body}\n    return 0;\n}\n`;
}

const pythonStarters = [
  "# print Hello, SkillPath!\n",
  "a = 12\nb = 30\n# print the sum below\n",
  "n = 18\n# your code here\n",
  "# your loop here\n",
  'text = "SkillPath"\n# your code here\n',
];

const languages = {
  javascript: { name: "JavaScript", remoteId: null },
  python: { name: "Python", remoteId: 100 },
  java: { name: "Java", remoteId: 91 },
  c: { name: "C", remoteId: 103 },
  cpp: { name: "C++", remoteId: 105 },
};

function getChallenges(language) {
  if (language === "javascript") return jsChallenges;
  return jsChallenges.slice(0, 5).map((challenge, i) => {
    let starter;
    if (language === "python") {
      starter = pythonStarters[i];
    } else {
      const body = i === 4 ? bodies[language] : bodies.common[i];
      starter = wrap(language, body);
    }
    return { ...challenge, starter };
  });
}

// Runs inside a Web Worker: no DOM, no access to the page or its storage.
const workerSource = `
  const fmt = (v) => {
    if (typeof v === "string") return v;
    try {
      return v !== null && typeof v === "object" ? JSON.stringify(v) : String(v);
    } catch {
      return String(v);
    }
  };
  const send = (type) => (...args) =>
    self.postMessage({ type, text: args.map(fmt).join(" ") });
  console.log = send("log");
  console.info = send("log");
  console.warn = send("warn");
  console.error = send("error");
  self.onmessage = (event) => {
    try {
      (0, eval)(event.data);
    } catch (error) {
      self.postMessage({ type: "error", text: String(error) });
    }
    self.postMessage({ type: "done" });
  };
`;

const TIMEOUT_MS = 3000;

// Saved code and solved flags, one entry per challenge: { "javascript:0": { code, solved } }.
// utils/sync.js mirrors this key to PUT /practice/{key}, so progress follows the account.
const PRACTICE_KEY = "skillpath-practice";
const practiceKey = (language, index) => `${language}:${index}`;

function readPractice() {
  try {
    const value = JSON.parse(localStorage.getItem(PRACTICE_KEY) || "{}");
    return value && typeof value === "object" && !Array.isArray(value) ? value : {};
  } catch {
    return {};
  }
}

function savePractice(key, patch) {
  try {
    const all = readPractice();
    all[key] = { code: "", solved: false, ...all[key], ...patch };
    localStorage.setItem(PRACTICE_KEY, JSON.stringify(all));
  } catch {
    // storage unavailable: progress just won't be saved
  }
}

export default function Practice() {
  const [language, setLanguage] = useState("javascript");
  const [index, setIndex] = useState(0);
  const challenges = getChallenges(language);
  const challenge = challenges[index];

  const [code, setCode] = useState(
    () => readPractice()[practiceKey("javascript", 0)]?.code ?? challenge.starter
  );
  const [solved, setSolved] = useState(readPractice);
  const [output, setOutput] = useState([]);
  const [running, setRunning] = useState(false);
  const [result, setResult] = useState(null); // "pass" | "fail" | null

  const workerRef = useRef(null);
  const abortRef = useRef(null);
  const timersRef = useRef([]);
  const latest = useRef({});
  latest.current = { language, index, code };
  const pendingSave = useRef(null); // { key, code } waiting for the typing pause
  const saveTimer = useRef(null);

  function flushSave() {
    clearTimeout(saveTimer.current);
    if (pendingSave.current) {
      savePractice(pendingSave.current.key, { code: pendingSave.current.code });
      pendingSave.current = null;
    }
  }

  // every code change goes through here so it is saved after a short typing pause
  function updateCode(next) {
    setCode(next);
    pendingSave.current = { key: practiceKey(language, index), code: next };
    clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(flushSave, 800);
  }

  useEffect(() => flushSave, []);

  function stopWorker() {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
    workerRef.current?.terminate();
    workerRef.current = null;
    abortRef.current?.abort();
    abortRef.current = null;
  }

  useEffect(() => stopWorker, []);

  function selectChallenge(next) {
    stopWorker();
    flushSave();
    setIndex(next);
    setCode(readPractice()[practiceKey(language, next)]?.code ?? challenges[next].starter);
    setOutput([]);
    setResult(null);
    setRunning(false);
  }

  function selectLanguage(next) {
    stopWorker();
    flushSave();
    setLanguage(next);
    setIndex(0);
    setCode(readPractice()[practiceKey(next, 0)]?.code ?? getChallenges(next)[0].starter);
    setOutput([]);
    setResult(null);
    setRunning(false);
  }

  async function runRemote() {
    stopWorker();
    setOutput([]);
    setResult(null);
    setRunning(true);

    const controller = new AbortController();
    abortRef.current = controller;
    const timer = setTimeout(() => controller.abort(), REMOTE_TIMEOUT_MS);
    const lines = [];

    try {
      const response = await fetch(JUDGE0_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          language_id: languages[language].remoteId,
          source_code: code,
        }),
        signal: controller.signal,
      });
      if (!response.ok) throw new Error(`Service returned ${response.status}`);
      const data = await response.json();

      if (data.stdout) {
        data.stdout
          .replace(/\n$/, "")
          .split("\n")
          .forEach((text) => lines.push({ type: "log", text }));
      }
      if (data.compile_output) {
        lines.push({ type: "error", text: data.compile_output.trim() });
      }
      if (data.stderr) {
        lines.push({ type: "error", text: data.stderr.trim() });
      }
      if (data.message) {
        lines.push({ type: "error", text: data.message.trim() });
      }
      if (
        !data.compile_output &&
        !data.stderr &&
        data.status &&
        data.status.id > 4
      ) {
        lines.push({ type: "error", text: data.status.description });
      }
    } catch (error) {
      lines.push({
        type: "error",
        text:
          error.name === "AbortError"
            ? "The code did not finish in time, or the run was cancelled."
            : `Could not reach the code-run service. Check your internet connection and try again. (${error.message})`,
      });
    } finally {
      clearTimeout(timer);
    }

    if (abortRef.current !== controller) return; // a newer run or a switch took over
    abortRef.current = null;
    setOutput(lines);
    finish(lines);
  }

  function finish(lines) {
    stopWorker();
    setRunning(false);
    const printed = lines
      .filter((line) => line.type === "log")
      .map((line) => line.text)
      .join("\n")
      .trim();
    const hasError = lines.some((line) => line.type === "error");
    const passed = !hasError && printed === challenge.expected;
    setResult(passed ? "pass" : "fail");
    if (passed) {
      const current = latest.current;
      flushSave();
      savePractice(practiceKey(current.language, current.index), {
        code: current.code,
        solved: true,
      });
      setSolved(readPractice());
    }
  }

  function runCode() {
    if (language !== "javascript") {
      runRemote();
      return;
    }
    stopWorker();
    setOutput([]);
    setResult(null);
    setRunning(true);

    const lines = [];
    const url = URL.createObjectURL(
      new Blob([workerSource], { type: "text/javascript" })
    );
    const worker = new Worker(url);
    URL.revokeObjectURL(url);
    workerRef.current = worker;

    worker.onmessage = (event) => {
      const message = event.data;
      if (message.type === "done") {
        // short grace period so setTimeout-based output can still arrive
        timersRef.current.push(setTimeout(() => finish(lines), 400));
        return;
      }
      lines.push(message);
      setOutput([...lines]);
    };

    worker.onerror = (event) => {
      lines.push({ type: "error", text: event.message || "Script error" });
      setOutput([...lines]);
      finish(lines);
    };

    timersRef.current.push(
      setTimeout(() => {
        lines.push({
          type: "error",
          text: `Stopped: code ran longer than ${TIMEOUT_MS / 1000} seconds (infinite loop?).`,
        });
        setOutput([...lines]);
        finish(lines);
      }, TIMEOUT_MS)
    );

    worker.postMessage(code);
  }

  function handleKeyDown(event) {
    if ((event.ctrlKey || event.metaKey) && event.key === "Enter") {
      event.preventDefault();
      runCode();
      return;
    }
    if (event.key === "Tab") {
      event.preventDefault();
      const { selectionStart, selectionEnd } = event.target;
      const next = code.slice(0, selectionStart) + "  " + code.slice(selectionEnd);
      updateCode(next);
      requestAnimationFrame(() => {
        event.target.selectionStart = event.target.selectionEnd =
          selectionStart + 2;
      });
    }
  }

  return (
    <section className="content-page practice-page">
      <h1>Code Practice</h1>
      <p>Write code and practise programming concepts.</p>

      <div className="practice-languages" role="tablist" aria-label="Language">
        {Object.entries(languages).map(([key, lang]) => (
          <button
            key={key}
            role="tab"
            aria-selected={key === language}
            className={
              key === language ? "language-tab active" : "language-tab"
            }
            onClick={() => selectLanguage(key)}
          >
            {lang.name}
          </button>
        ))}
      </div>

      {language !== "javascript" && (
        <p className="practice-note">
          {languages[language].name} runs on the public Judge0 online service,
          so your code is sent over the internet to be run. Don’t paste
          anything private.
        </p>
      )}

      <div className="practice-tabs">
        {challenges.map((item, i) => (
          <button
            key={item.title}
            className={i === index ? "practice-tab active" : "practice-tab"}
            onClick={() => selectChallenge(i)}
          >
            {solved[practiceKey(language, i)]?.solved ? "✓ " : ""}
            {i + 1}. {item.title}
          </button>
        ))}
      </div>
      <p className="practice-note">
        Solved{" "}
        {challenges.filter((_, i) => solved[practiceKey(language, i)]?.solved).length} of{" "}
        {challenges.length} {languages[language].name} challenges. Your code is saved
        automatically.
      </p>

      <article className="learning-page-card">
        <h2>
          Challenge {index + 1}: {challenge.title}
        </h2>
        <p>{challenge.task}</p>

        <label htmlFor="code-editor">{languages[language].name} editor</label>
        <textarea
          id="code-editor"
          className="code-editor"
          value={code}
          onChange={(event) => updateCode(event.target.value)}
          onKeyDown={handleKeyDown}
          spellCheck="false"
        />

        <div className="practice-actions">
          <button
            className="primary-button"
            onClick={runCode}
            disabled={running}
          >
            {running ? "Running…" : "▶ Run Code"}
          </button>
          <button
            className="secondary-button"
            onClick={() => {
              updateCode(challenge.starter);
              setOutput([]);
              setResult(null);
            }}
          >
            Reset
          </button>
          <span className="practice-shortcut">Ctrl + Enter to run</span>
        </div>

        <h3 className="practice-output-title">Output</h3>
        <pre className="practice-output" aria-live="polite">
          {output.length === 0 ? (
            <span className="practice-placeholder">
              Click “Run Code” to see the output here.
            </span>
          ) : (
            output.map((line, i) => (
              <div key={i} className={`out-${line.type}`}>
                {line.text}
              </div>
            ))
          )}
        </pre>

        {result === "pass" && (
          <p className="practice-result pass">
            ✓ Correct! Your output matches the expected result.
          </p>
        )}
        {result === "fail" && (
          <p className="practice-result fail">
            ✗ Not quite. Expected output:{" "}
            <code>{challenge.expected.replace(/\n/g, " / ")}</code>
          </p>
        )}
      </article>
    </section>
  );
}

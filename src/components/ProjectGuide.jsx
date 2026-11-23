import { useState } from "react";
import {
  Code2,
  ChevronDown,
  ChevronUp,
  Copy,
  Check,
  ExternalLink,
  Sparkles,
  Clock,
  Wrench,
  MapPin,
} from "lucide-react";
import { projectGuides } from "../data/projectGuides";

function buildPrompts(courseTitle, project, guide, doneTitles) {
  const where = guide.where;
  const base = `I am a beginner learning ${courseTitle}. I am building the project "${project}". ${guide.summary}`;

  return {
    kickoff: `${base}

I will build it here: ${where}
Tools I plan to use: ${guide.tools.join(", ")}.

Please guide me step by step like a patient teacher:
1. First give me the folder structure and exact setup commands.
2. Then give me the code in small pieces, one file at a time.
3. Explain each part in simple words.
4. After every piece, tell me exactly how to run it and what I should see.
Do not give the whole project at once. Ask me to confirm before moving on.`,

    error: `${base}

I am stuck with an error.

The error message (copy the exact text):
[paste the error here]

My code (paste the file it points to):
[paste your code here]

What I was trying to do: [describe]

Please explain in simple words what the error means, show the corrected code, and tell me how to run it again.`,

    explain: `${base}

Here is code I wrote or copied:
[paste your code here]

Please explain it line by line in simple words, point out any mistakes or bad practices, and suggest 2 small improvements I can try myself.`,

    step: (step, number) => `${base}

I am on step ${number}: "${step.title}". ${step.detail}
${doneTitles.length ? `Steps I have already finished: ${doneTitles.join(", ")}.` : "This is my first step."}
I am working here: ${where}

Please give me the code for only this step, tell me which file to put it in, explain it in simple words, and tell me how to run it and what I should see. If I see something different, tell me what to check.`,
  };
}

function openLinks(prompt) {
  const q = encodeURIComponent(prompt);
  return {
    chatgpt: `https://chatgpt.com/?q=${q}`,
    claude: `https://claude.ai/new?q=${q}`,
  };
}

export default function ProjectGuide({ slug, courseTitle, project, index }) {
  const guide = projectGuides[slug]?.[project];

  const storageKey = `skillpath-project-${slug}-${project}`;
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState("");
  const [done, setDone] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(storageKey) || "[]");
    } catch {
      return [];
    }
  });

  if (!guide) {
    return (
      <article className="course-project-card">
        <div className="project-icon"><Code2 size={23} /></div>
        <div>
          <span>Project {index + 1}</span>
          <h3>{project}</h3>
          <p>Build this project using the concepts from your roadmap.</p>
        </div>
      </article>
    );
  }

  const doneTitles = guide.steps
    .filter((_, i) => done.includes(i))
    .map((s) => s.title);
  const prompts = buildPrompts(courseTitle, project, guide, doneTitles);
  const progress = Math.round((done.length / guide.steps.length) * 100);

  function toggleStep(i) {
    const next = done.includes(i) ? done.filter((d) => d !== i) : [...done, i];
    setDone(next);
    try {
      localStorage.setItem(storageKey, JSON.stringify(next));
    } catch {
      /* storage may be unavailable */
    }
  }

  async function copy(id, text) {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const area = document.createElement("textarea");
      area.value = text;
      document.body.appendChild(area);
      area.select();
      document.execCommand("copy");
      document.body.removeChild(area);
    }
    setCopied(id);
    setTimeout(() => setCopied(""), 1800);
  }

  function PromptButtons({ id, text }) {
    const links = openLinks(text);
    return (
      <div className="pg-actions">
        <button type="button" onClick={() => copy(id, text)}>
          {copied === id ? <Check size={14} /> : <Copy size={14} />}
          {copied === id ? "Copied!" : "Copy prompt"}
        </button>
        {text.length < 1800 && (
          <>
            <a href={links.chatgpt} target="_blank" rel="noreferrer">
              <ExternalLink size={14} /> Open in ChatGPT
            </a>
            <a href={links.claude} target="_blank" rel="noreferrer">
              <ExternalLink size={14} /> Open in Claude
            </a>
          </>
        )}
      </div>
    );
  }

  return (
    <article className={`pg-card${open ? " open" : ""}`}>
      <button
        type="button"
        className="pg-header"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <div className="project-icon"><Code2 size={23} /></div>

        <div className="pg-title">
          <span>Project {index + 1}</span>
          <h3>{project}</h3>
          <p>{guide.summary}</p>
          <div className="pg-meta">
            <em>{guide.level}</em>
            <span><Clock size={13} /> {guide.time}</span>
            {done.length > 0 && <span>{progress}% done</span>}
          </div>
        </div>

        <span className="pg-toggle">
          {open ? "Hide guide" : "Start building"}
          {open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </span>
      </button>

      {open && (
        <div className="pg-body">

          <section>
            <h4>What you will practise</h4>
            <div className="flow-chips">
              {guide.skills.map((s) => (
                <span className="chip topic" key={s}>{s}</span>
              ))}
            </div>
          </section>

          <section>
            <h4><MapPin size={15} /> Where to build it</h4>
            <p>{guide.where}</p>
            <h4 className="pg-sub"><Wrench size={15} /> Tools you need</h4>
            <div className="flow-chips">
              {guide.tools.map((t) => (
                <span className="chip tool" key={t}>{t}</span>
              ))}
            </div>
          </section>

          <section>
            <h4>Set up your computer</h4>
            <ol className="pg-setup">
              {guide.setup.map((line) => (
                <li key={line}>
                  {line.startsWith("$ ") ? (
                    <code>{line.slice(2)}</code>
                  ) : (
                    line
                  )}
                </li>
              ))}
            </ol>
          </section>

          <section className="pg-ai">
            <h4><Sparkles size={15} /> Build it with an AI helper</h4>
            <p>
              Use ChatGPT or Claude as your teacher. Copy a prompt, paste it
              into the chat, and follow the answer one small step at a time.
              Run the code after every step. If something breaks, paste the
              exact error back into the chat.
            </p>

            <div className="pg-prompt">
              <strong>1. Start the project</strong>
              <small>Gives you the folder structure, setup and first code.</small>
              <PromptButtons id="kickoff" text={prompts.kickoff} />
            </div>

            <div className="pg-prompt">
              <strong>2. I got an error</strong>
              <small>Paste the error and your code where marked.</small>
              <PromptButtons id="error" text={prompts.error} />
            </div>

            <div className="pg-prompt">
              <strong>3. Explain my code</strong>
              <small>Understand every line instead of just copying it.</small>
              <PromptButtons id="explain" text={prompts.explain} />
            </div>

            <ul className="pg-tips">
              <li>Ask for one step at a time and run it before asking for the next.</li>
              <li>Always paste the full error message, not just a description.</li>
              <li>Ask "why" until you understand. Do not copy code you cannot explain.</li>
              <li>Never share passwords, API keys or private data in the chat.</li>
            </ul>
          </section>

          <section>
            <h4>Build it step by step</h4>
            <div className="pg-progress">
              <div style={{ width: `${progress}%` }} />
            </div>

            <ol className="pg-steps">
              {guide.steps.map((step, i) => {
                const stepPrompt = prompts.step(step, i + 1);
                return (
                  <li key={step.title} className={done.includes(i) ? "done" : ""}>
                    <label>
                      <input
                        type="checkbox"
                        checked={done.includes(i)}
                        onChange={() => toggleStep(i)}
                      />
                      <span className="pg-step-text">
                        <strong>{i + 1}. {step.title}</strong>
                        <small>{step.detail}</small>
                      </span>
                    </label>
                    <PromptButtons id={`step-${i}`} text={stepPrompt} />
                  </li>
                );
              })}
            </ol>
          </section>

        </div>
      )}
    </article>
  );
}

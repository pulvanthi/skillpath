import { useEffect, useRef, useState } from "react";

const NOTES_KEY = "skillpath-notes"; // { "slug::lessonId": "text" }, mirrored to /notes by utils/sync.js

function readNotes() {
  try {
    const value = JSON.parse(localStorage.getItem(NOTES_KEY) || "{}");
    return value && typeof value === "object" && !Array.isArray(value) ? value : {};
  } catch {
    return {};
  }
}

function writeNote(noteKey, text) {
  try {
    const notes = readNotes();
    if (text.trim()) notes[noteKey] = text;
    else delete notes[noteKey];
    localStorage.setItem(NOTES_KEY, JSON.stringify(notes));
  } catch {
    // storage unavailable: the note just won't be saved
  }
}

// Personal notes for one lesson. Saves shortly after typing stops, and on blur/leave.
export default function LessonNote({ slug, lessonId }) {
  const noteKey = `${slug}::${lessonId}`;
  const [text, setText] = useState(() => readNotes()[noteKey] || "");
  const [saved, setSaved] = useState(true);
  const timer = useRef(null);
  const latest = useRef(text);
  const dirty = useRef(false);

  function flush() {
    clearTimeout(timer.current);
    if (dirty.current) {
      writeNote(noteKey, latest.current);
      dirty.current = false;
      setSaved(true);
    }
  }

  // save anything pending if the lesson is collapsed or the page is left
  useEffect(() => () => {
    clearTimeout(timer.current);
    if (dirty.current) writeNote(noteKey, latest.current);
  }, [noteKey]);

  function onChange(event) {
    const value = event.target.value;
    setText(value);
    latest.current = value;
    dirty.current = true;
    setSaved(false);
    clearTimeout(timer.current);
    timer.current = setTimeout(flush, 800);
  }

  return (
    <div className="lessons-note">
      <label htmlFor={`note-${noteKey}`}>My notes</label>
      <textarea
        id={`note-${noteKey}`}
        value={text}
        maxLength={20000}
        rows={4}
        placeholder="Write what you learned, questions, or code snippets..."
        onChange={onChange}
        onBlur={flush}
      />
      <small>{saved ? (text ? "Saved" : "") : "Saving..."}</small>
    </div>
  );
}

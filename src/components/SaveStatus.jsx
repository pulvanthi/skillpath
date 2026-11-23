import { useEffect, useState } from "react";
import { getSyncStatus, retryFailedSaves, SYNC_STATUS_EVENT } from "../utils/sync";
import "./SaveStatus.css";

// Small notice in the corner that shows whether changes reached the database:
//   "Saving..."  ->  "All changes saved" (disappears)  or  "Could not save ..." with a Retry button.
export default function SaveStatus() {
  const [status, setStatus] = useState(getSyncStatus);
  const [justSaved, setJustSaved] = useState(false);

  useEffect(() => {
    let timer;

    function onStatus(event) {
      const next = event.detail;
      setStatus(next);
      clearTimeout(timer);
      if (next.pending === 0 && next.failed === 0 && next.lastSaved) {
        setJustSaved(true);
        timer = setTimeout(() => setJustSaved(false), 2500);
      } else {
        setJustSaved(false);
      }
    }

    // retry automatically when the connection comes back
    const onOnline = () => getSyncStatus().failed && retryFailedSaves();

    // warn before closing the tab while changes are unsaved
    function onBeforeUnload(event) {
      const current = getSyncStatus();
      if (current.pending || current.failed) {
        event.preventDefault();
        event.returnValue = "";
      }
    }

    window.addEventListener(SYNC_STATUS_EVENT, onStatus);
    window.addEventListener("online", onOnline);
    window.addEventListener("beforeunload", onBeforeUnload);
    return () => {
      clearTimeout(timer);
      window.removeEventListener(SYNC_STATUS_EVENT, onStatus);
      window.removeEventListener("online", onOnline);
      window.removeEventListener("beforeunload", onBeforeUnload);
    };
  }, []);

  if (status.pending > 0) {
    return (
      <div className="save-status saving" role="status">
        Saving...
      </div>
    );
  }

  if (status.failed > 0) {
    return (
      <div className="save-status failed" role="alert">
        <span>
          Could not save {status.failed} change{status.failed === 1 ? "" : "s"} to your account.
          {status.message ? ` ${status.message}` : ""}
        </span>
        <button type="button" className="secondary-button" onClick={retryFailedSaves}>
          Retry
        </button>
      </div>
    );
  }

  return justSaved ? (
    <div className="save-status saved" role="status">
      All changes saved
    </div>
  ) : null;
}

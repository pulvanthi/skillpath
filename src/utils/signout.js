import { getSyncStatus } from "./sync";

// One place that every Sign out button uses. If some changes have not reached the database yet
// the learner is asked first, because signing out discards them. App.jsx listens for the event.
export function requestSignOut() {
  const { pending, failed } = getSyncStatus();
  if (
    (pending || failed) &&
    !window.confirm(
      "Some changes have not been saved to your account yet. Sign out anyway? Those changes will be lost."
    )
  ) {
    return;
  }
  window.dispatchEvent(new Event("skillpath-sign-out"));
}

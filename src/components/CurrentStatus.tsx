import type { CurrentSnapshot } from "../types/firelens";

function CurrentStatus({ snapshot }: { snapshot: CurrentSnapshot }) {
  return (
    <aside className="current-status" aria-labelledby="current-status-title">
      <div><span aria-hidden="true">i</span><strong id="current-status-title">Observed current activity unavailable</strong></div>
      <p>{snapshot.reason}</p>
    </aside>
  );
}

export default CurrentStatus;

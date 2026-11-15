import type { FireLensMonth } from "../types/firelens";
import {
  historicalExplanation,
  monitoringPriority,
  suggestedReview,
} from "../utils/explanations";

function OperationalBrief({ month }: { month: FireLensMonth }) {
  const priority = monitoringPriority(month);
  const labels = {
    routine: "Routine review",
    heightened: "Heightened review",
    priority: "Priority review",
  };

  return (
    <section className={`operational-brief operational-brief--${priority}`} aria-labelledby="brief-title">
      <div>
        <p className="section-label">Historical operational replay</p>
        <h2 id="brief-title">{labels[priority]}</h2>
      </div>
      <p>{historicalExplanation(month)}</p>
      <div className="recommended-action">
        <strong>Suggested use</strong>
        <span>{suggestedReview(month)}</span>
      </div>
    </section>
  );
}

export default OperationalBrief;

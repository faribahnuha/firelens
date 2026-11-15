import type { FireLensMonth } from "../types/firelens";

export type MonitoringPriority = "routine" | "heightened" | "priority";

export function monitoringPriority(month: FireLensMonth): MonitoringPriority {
  if (month.percentile >= 90) return "priority";
  if (month.percentile >= 75) return "heightened";
  return "routine";
}

export function historicalExplanation(month: FireLensMonth): string {
  const direction =
    month.anomaly_percent === null
      ? "could not be compared with a same-month median"
      : `${Math.abs(month.anomaly_percent).toFixed(0)}% ${month.anomaly_percent >= 0 ? "above" : "below"} the historical same-month median`;
  return `Activity reached the ${Math.round(month.percentile)}th historical percentile and was ${direction}. This is a historical replay, not a current emergency alert.`;
}

export function suggestedReview(month: FireLensMonth): string {
  const priority = monitoringPriority(month);
  if (priority === "priority") {
    return "Prioritize verification with authoritative local fire information and review where detected grid-cell activity is concentrated.";
  }
  if (priority === "heightened") {
    return "Increase monitoring attention and compare the detected pattern with authoritative local conditions.";
  }
  return "Continue routine monitoring and retain the month as part of the historical baseline.";
}

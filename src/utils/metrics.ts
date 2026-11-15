import type { ActivityMode } from "../state/useFireLensState";
import type { FireLensMonth } from "../types/firelens";
import {
  formatInteger,
  formatSignedDays,
  ordinal,
} from "./formatters";

export type MetricTone = "neutral" | "attention" | "positive";

export interface DashboardMetric {
  id: "activity" | "percentile" | "persistence" | "onset";
  label: string;
  value: string;
  detail: string;
  tone: MetricTone;
}

function percentileTone(percentile: number): MetricTone {
  return percentile >= 90 ? "attention" : "neutral";
}

export function createDashboardMetrics(
  month: FireLensMonth,
  mode: ActivityMode,
): DashboardMetric[] {
  const rawDetections =
    month.raw_modis_detections + month.raw_viirs_detections;
  const activityValue =
    mode === "harmonized" ? month.harmonized_fau : rawDetections;
  const onset = month.onset_days_difference;

  return [
    {
      id: "activity",
      label: mode === "harmonized" ? "Fire activity" : "Raw detections",
      value: formatInteger(activityValue),
      detail:
        mode === "harmonized"
          ? "active 5 km grid-cell days"
          : "MODIS + VIIRS detections",
      tone: "neutral",
    },
    {
      id: "percentile",
      label: "Historical percentile",
      value: ordinal(month.percentile),
      detail: `${month.anomaly_percent >= 0 ? "+" : ""}${month.anomaly_percent.toFixed(1)}% vs. same-month median`,
      tone: percentileTone(month.percentile),
    },
    {
      id: "persistence",
      label: "Persistence",
      value: `${formatInteger(month.persistence_days)} ${month.persistence_days === 1 ? "day" : "days"}`,
      detail: `${month.spatial_trend} spatial pattern`,
      tone: month.persistence_days >= 3 ? "attention" : "neutral",
    },
    {
      id: "onset",
      label: "Season timing",
      value: onset === null ? "Unavailable" : formatSignedDays(onset),
      detail:
        onset === null
          ? "No onset comparison for this month"
          : "relative to historical median onset",
      tone: onset !== null && onset < 0 ? "attention" : "neutral",
    },
  ];
}


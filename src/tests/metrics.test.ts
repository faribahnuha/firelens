import { describe, expect, it } from "vitest";
import type { FireLensMonth } from "../types/firelens";
import { createDashboardMetrics } from "../utils/metrics";

const month: FireLensMonth = {
  period: "2023-09",
  raw_modis_detections: 100,
  raw_viirs_detections: 300,
  modis_fau: 70,
  viirs_fau: 120,
  harmonized_fau: 120,
  historical_median: 80,
  anomaly_percent: 50,
  percentile: 94,
  quality: "high",
  sensors: ["MODIS", "VIIRS"],
  persistence_days: 5,
  spatial_trend: "expanding",
  onset_days_difference: -11,
  active_cells: 120,
  map_asset: null,
};

describe("createDashboardMetrics", () => {
  it("uses harmonized activity in harmonized mode", () => {
    const metrics = createDashboardMetrics(month, "harmonized");
    expect(metrics[0]).toMatchObject({
      label: "Fire activity",
      value: "120",
    });
  });

  it("sums sensor counts in raw mode", () => {
    const metrics = createDashboardMetrics(month, "raw");
    expect(metrics[0]).toMatchObject({
      label: "Raw detections",
      value: "400",
    });
  });

  it("describes early onset without reversing the sign", () => {
    const metrics = createDashboardMetrics(month, "harmonized");
    expect(metrics[3].value).toBe("11 days early");
  });

  it("shows unavailable instead of inventing persistence", () => {
    const withoutPersistence = { ...month, persistence_days: null };
    const metrics = createDashboardMetrics(withoutPersistence, "harmonized");
    expect(metrics[2].value).toBe("Unavailable");
  });
});

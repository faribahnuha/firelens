import { describe, expect, it } from "vitest";
import type { FireLensDataset } from "../types/firelens";
import { createMonthlyCsv } from "../utils/csvExport";

describe("createMonthlyCsv", () => {
  it("exports monthly evidence with a header", () => {
    const data = { region: { id: "test" }, months: [{ period: "2020-09", harmonized_fau: 12, raw_modis_detections: 3, raw_viirs_detections: 9, historical_median: 8, anomaly_percent: 50, percentile: 95, quality: "high" }] } as FireLensDataset;
    const csv = createMonthlyCsv(data);
    expect(csv).toContain("period,harmonized_fau");
    expect(csv).toContain("2020-09,12,3,9,8,50,95,high");
  });
});

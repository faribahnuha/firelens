import { describe, expect, it } from "vitest";
import { validateFireLensData } from "../data/validateFireLensData";

const validDataset = {
  meta: {
    schema_version: "1.0.0",
    is_mock: true,
    generated_at: "2026-11-14T00:00:00Z",
    data_through: "2024-12",
    source_label: "Test fixture",
  },
  region: {
    id: "test",
    name: "Test region",
    bounds: [-124, 32, -114, 42],
    grid_km: 5,
  },
  method: {
    unit: "active grid-cell day",
    baseline_years: [2003, 2023],
    overlap_years: [2012, 2023],
    confidence_filter: "Test filter",
    validation_mape: null,
    overlap_month_count: null,
  },
  months: [
    {
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
    },
  ],
  action_window: {
    start_mm_dd: "08-18",
    end_mm_dd: "09-12",
    median_onset_mm_dd: "08-29",
    selected_year: 2023,
    selected_onset_mm_dd: "08-18",
    days_from_median: -11,
  },
};

describe("validateFireLensData", () => {
  it("accepts the version 1 data contract", () => {
    expect(validateFireLensData(validDataset).region.id).toBe("test");
  });

  it("rejects invalid percentiles", () => {
    const invalid = structuredClone(validDataset);
    invalid.months[0].percentile = 101;

    expect(() => validateFireLensData(invalid)).toThrow(/percentile/);
  });

  it("rejects duplicate monthly periods", () => {
    const invalid = structuredClone(validDataset);
    invalid.months.push(structuredClone(invalid.months[0]));

    expect(() => validateFireLensData(invalid)).toThrow(/Duplicate month/);
  });
});


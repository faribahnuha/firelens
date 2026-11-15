import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import FireRhythmCalendar from "../components/FireRhythmCalendar";
import type { FireLensMonth } from "../types/firelens";

const months: FireLensMonth[] = [
  {
    period: "2023-01",
    raw_modis_detections: 10,
    raw_viirs_detections: 30,
    modis_fau: 8,
    viirs_fau: 20,
    harmonized_fau: 20,
    historical_median: 15,
    anomaly_percent: 33.3,
    percentile: 92,
    quality: "high",
    sensors: ["MODIS", "VIIRS"],
    persistence_days: 2,
    spatial_trend: "stable",
    onset_days_difference: null,
    active_cells: 20,
    map_asset: null,
  },
  {
    period: "2023-02",
    raw_modis_detections: 12,
    raw_viirs_detections: 38,
    modis_fau: 9,
    viirs_fau: 25,
    harmonized_fau: 25,
    historical_median: 18,
    anomaly_percent: 38.9,
    percentile: 95,
    quality: "high",
    sensors: ["MODIS", "VIIRS"],
    persistence_days: 3,
    spatial_trend: "expanding",
    onset_days_difference: null,
    active_cells: 25,
    map_asset: null,
  },
];

describe("FireRhythmCalendar", () => {
  it("reports the selected month when a cell is activated", () => {
    const onSelect = vi.fn();
    render(
      <FireRhythmCalendar
        months={months}
        selectedPeriod="2023-01"
        mode="harmonized"
        onSelect={onSelect}
      />,
    );

    fireEvent.click(screen.getByRole("button", { name: /February 2023/ }));
    expect(onSelect).toHaveBeenCalledWith("2023-02");
  });
});

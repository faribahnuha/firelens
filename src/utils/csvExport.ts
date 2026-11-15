import type { FireLensDataset } from "../types/firelens";

export function createMonthlyCsv(data: FireLensDataset): string {
  const headers = [
    "period",
    "harmonized_fau",
    "raw_modis_detections",
    "raw_viirs_detections",
    "historical_median",
    "anomaly_percent",
    "percentile",
    "quality",
  ];
  const rows = data.months.map((month) =>
    [
      month.period,
      month.harmonized_fau,
      month.raw_modis_detections,
      month.raw_viirs_detections,
      month.historical_median ?? "",
      month.anomaly_percent ?? "",
      month.percentile,
      month.quality,
    ].join(","),
  );
  return [headers.join(","), ...rows].join("\n");
}

export function downloadMonthlyCsv(data: FireLensDataset): void {
  const blob = new Blob([createMonthlyCsv(data)], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${data.region.id}-firelens-monthly.csv`;
  link.click();
  URL.revokeObjectURL(url);
}

export type DataQuality = "high" | "medium" | "low";

export type SpatialTrend =
  | "expanding"
  | "stable"
  | "contracting"
  | "unavailable";

export interface DatasetMeta {
  schema_version: "1.0.0";
  is_mock: boolean;
  generated_at: string;
  data_through: string;
  source_label: string;
}

export interface FireLensRegion {
  id: string;
  name: string;
  /** Geographic bounds ordered as west, south, east, north. */
  bounds: [number, number, number, number];
  grid_km: number;
}

export interface HarmonizationMethod {
  unit: "active grid-cell day";
  baseline_years: [number, number];
  overlap_years: [number, number];
  confidence_filter: string;
  validation_mape: number | null;
  overlap_month_count: number | null;
}

export interface FireLensMonth {
  period: string;
  raw_modis_detections: number;
  raw_viirs_detections: number;
  modis_fau: number;
  viirs_fau: number;
  harmonized_fau: number;
  historical_median: number;
  anomaly_percent: number;
  percentile: number;
  quality: DataQuality;
  sensors: string[];
  persistence_days: number;
  spatial_trend: SpatialTrend;
  /** Negative values mean earlier than the historical median. */
  onset_days_difference: number | null;
  active_cells: number;
  map_asset: string | null;
}

export interface HistoricalActionWindow {
  start_mm_dd: string;
  end_mm_dd: string;
  median_onset_mm_dd: string;
  selected_year: number | null;
  selected_onset_mm_dd: string | null;
  /** Negative values mean earlier than the historical median. */
  days_from_median: number | null;
}

export interface FireLensDataset {
  meta: DatasetMeta;
  region: FireLensRegion;
  method: HarmonizationMethod;
  months: FireLensMonth[];
  action_window: HistoricalActionWindow;
}


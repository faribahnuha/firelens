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
  source: string;
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
  overlap_years: number[];
  confidence_filter: string;
  validation_mape: number | null;
  validation_held_out_months: number | null;
}

export interface FireLensMonth {
  period: string;
  raw_modis_detections: number;
  raw_viirs_detections: number;
  modis_fau: number;
  viirs_fau: number | null;
  harmonized_fau: number;
  historical_median: number | null;
  anomaly_percent: number | null;
  percentile: number;
  quality: DataQuality;
  sensors: string[];
  persistence_days: number | null;
  spatial_trend: SpatialTrend | null;
  /** Negative values mean earlier than the historical median. */
  onset_days_difference: number | null;
  active_cells: number | null;
  map_asset: string | null;
}

export interface HistoricalActionWindow {
  start_mm_dd: string | null;
  end_mm_dd: string | null;
  median_onset_mm_dd: string | null;
  selected_year?: number | null;
  selected_onset_mm_dd?: string | null;
  /** Negative values mean earlier than the historical median. */
  days_from_median?: number | null;
}

export interface FireLensDataset {
  meta: DatasetMeta;
  region: FireLensRegion;
  method: HarmonizationMethod;
  months: FireLensMonth[];
  action_window: HistoricalActionWindow;
}

export type ReadinessCategory =
  | "routine_readiness"
  | "elevated_readiness"
  | "peak_season_readiness"
  | "unavailable";

export interface SeasonalForecast {
  target_month: string;
  predicted_fau: number | null;
  lower_prediction_bound: number | null;
  upper_prediction_bound: number | null;
  seasonal_rank_percentile: number | null;
  readiness_category: ReadinessCategory;
  confidence_level: string;
  training_period: {
    start: string | null;
    end: string;
    same_month_samples: number;
  };
}

export interface SeasonalOutlook {
  meta: {
    data_through: string;
    is_observed_current_activity: false;
    product_type: string;
    forecast_start_year?: number;
    forecast_end_year?: number;
  };
  region: FireLensRegion;
  forecast_method: string;
  held_out_error: {
    metric: string;
    value_fau: number;
    held_out_months: number;
  };
  confidence_level: string;
  forecasts: SeasonalForecast[];
  limitations: string[];
}

export interface CurrentSnapshot {
  status: "unavailable";
  reason: string;
  meta: { historical_data_through: string };
}


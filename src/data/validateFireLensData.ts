import type {
  DataQuality,
  FireLensDataset,
  SpatialTrend,
} from "../types/firelens";

const qualities = new Set<DataQuality>(["high", "medium", "low"]);
const spatialTrends = new Set<SpatialTrend>([
  "expanding",
  "stable",
  "contracting",
  "unavailable",
]);
const periodPattern = /^\d{4}-(0[1-9]|1[0-2])$/;
const monthDayPattern = /^(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function requireObject(
  value: unknown,
  path: string,
): Record<string, unknown> {
  if (!isObject(value)) {
    throw new Error(`${path} must be an object.`);
  }
  return value;
}

function requireString(value: unknown, path: string): string {
  if (typeof value !== "string" || value.trim() === "") {
    throw new Error(`${path} must be a non-empty string.`);
  }
  return value;
}

function requireFiniteNumber(value: unknown, path: string): number {
  if (typeof value !== "number" || !Number.isFinite(value)) {
    throw new Error(`${path} must be a finite number.`);
  }
  return value;
}

function requireNullableNumber(value: unknown, path: string): number | null {
  return value === null ? null : requireFiniteNumber(value, path);
}

function requireInteger(value: unknown, path: string): number {
  const number = requireFiniteNumber(value, path);
  if (!Number.isInteger(number)) {
    throw new Error(`${path} must be an integer.`);
  }
  return number;
}

function requireNumberArray(value: unknown, path: string): number[] {
  if (!Array.isArray(value) || value.length === 0) {
    throw new Error(`${path} must contain at least one number.`);
  }
  return value.map((entry, index) =>
    requireFiniteNumber(entry, `${path}[${index}]`),
  );
}

function requireMonthDay(value: unknown, path: string): string {
  const date = requireString(value, path);
  if (!monthDayPattern.test(date)) {
    throw new Error(`${path} must use MM-DD format.`);
  }
  return date;
}

export function validateFireLensData(value: unknown): FireLensDataset {
  const root = requireObject(value, "dataset");
  const meta = requireObject(root.meta, "meta");
  const region = requireObject(root.region, "region");
  const method = requireObject(root.method, "method");
  const actionWindow = requireObject(root.action_window, "action_window");

  if (meta.schema_version !== "1.0.0") {
    throw new Error("meta.schema_version must be 1.0.0.");
  }
  if (typeof meta.is_mock !== "boolean") {
    throw new Error("meta.is_mock must be a boolean.");
  }
  requireString(meta.generated_at, "meta.generated_at");
  requireString(meta.data_through, "meta.data_through");
  requireString(meta.source, "meta.source");

  requireString(region.id, "region.id");
  requireString(region.name, "region.name");
  if (!Array.isArray(region.bounds) || region.bounds.length !== 4) {
    throw new Error(
      "region.bounds must be [west, south, east, north].",
    );
  }
  const bounds = region.bounds.map((entry, index) =>
    requireFiniteNumber(entry, `region.bounds[${index}]`),
  );
  if (bounds[0] >= bounds[2] || bounds[1] >= bounds[3]) {
    throw new Error("region.bounds must have increasing coordinates.");
  }
  if (requireFiniteNumber(region.grid_km, "region.grid_km") <= 0) {
    throw new Error("region.grid_km must be greater than zero.");
  }

  if (method.unit !== "active grid-cell day") {
    throw new Error('method.unit must be "active grid-cell day".');
  }
  requireNumberArray(method.baseline_years, "method.baseline_years");
  requireNumberArray(method.overlap_years, "method.overlap_years");
  requireString(method.confidence_filter, "method.confidence_filter");
  requireNullableNumber(method.validation_mape, "method.validation_mape");
  if (method.validation_held_out_months !== null) {
    requireInteger(
      method.validation_held_out_months,
      "method.validation_held_out_months",
    );
  }

  if (!Array.isArray(root.months) || root.months.length === 0) {
    throw new Error("months must contain at least one monthly record.");
  }

  const periods = new Set<string>();
  root.months.forEach((entry, index) => {
    const month = requireObject(entry, `months[${index}]`);
    const period = requireString(month.period, `months[${index}].period`);
    if (!periodPattern.test(period)) {
      throw new Error(`months[${index}].period must use YYYY-MM format.`);
    }
    if (periods.has(period)) {
      throw new Error(`Duplicate month period: ${period}.`);
    }
    periods.add(period);

    [
      "raw_modis_detections",
      "raw_viirs_detections",
      "modis_fau",
      "harmonized_fau",
    ].forEach((field) => {
      const number = requireFiniteNumber(
        month[field],
        `months[${index}].${field}`,
      );
      if (number < 0) {
        throw new Error(`months[${index}].${field} cannot be negative.`);
      }
    });

    ["viirs_fau", "historical_median", "active_cells", "persistence_days"].forEach(
      (field) => {
        const number = requireNullableNumber(
          month[field],
          `months[${index}].${field}`,
        );
        if (number !== null && number < 0) {
          throw new Error(`months[${index}].${field} cannot be negative.`);
        }
      },
    );

    requireNullableNumber(
      month.anomaly_percent,
      `months[${index}].anomaly_percent`,
    );
    const percentile = requireFiniteNumber(
      month.percentile,
      `months[${index}].percentile`,
    );
    if (percentile < 0 || percentile > 100) {
      throw new Error(`months[${index}].percentile must be 0–100.`);
    }
    if (!qualities.has(month.quality as DataQuality)) {
      throw new Error(`months[${index}].quality is invalid.`);
    }
    if (
      !Array.isArray(month.sensors) ||
      !month.sensors.every((sensor) => typeof sensor === "string")
    ) {
      throw new Error(`months[${index}].sensors must be strings.`);
    }
    if (
      month.spatial_trend !== null &&
      !spatialTrends.has(month.spatial_trend as SpatialTrend)
    ) {
      throw new Error(`months[${index}].spatial_trend is invalid.`);
    }
    requireNullableNumber(
      month.onset_days_difference,
      `months[${index}].onset_days_difference`,
    );
    if (month.map_asset !== null) {
      requireString(month.map_asset, `months[${index}].map_asset`);
    }
  });

  if (actionWindow.start_mm_dd !== null) {
    requireMonthDay(actionWindow.start_mm_dd, "action_window.start_mm_dd");
  }
  if (actionWindow.end_mm_dd !== null) {
    requireMonthDay(actionWindow.end_mm_dd, "action_window.end_mm_dd");
  }
  if (actionWindow.median_onset_mm_dd !== null) {
    requireMonthDay(
      actionWindow.median_onset_mm_dd,
      "action_window.median_onset_mm_dd",
    );
  }
  if (
    actionWindow.selected_year !== undefined &&
    actionWindow.selected_year !== null
  ) {
    requireInteger(actionWindow.selected_year, "action_window.selected_year");
  }
  if (
    actionWindow.selected_onset_mm_dd !== undefined &&
    actionWindow.selected_onset_mm_dd !== null
  ) {
    requireMonthDay(
      actionWindow.selected_onset_mm_dd,
      "action_window.selected_onset_mm_dd",
    );
  }
  if (actionWindow.days_from_median !== undefined) {
    requireNullableNumber(
      actionWindow.days_from_median,
      "action_window.days_from_median",
    );
  }

  return value as FireLensDataset;
}


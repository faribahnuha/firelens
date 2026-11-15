import type {
  CurrentSnapshot,
  DecemberOutlook,
  ForecastEvaluation,
  PartialNovember,
  SeasonalOutlook,
} from "../types/firelens";

async function loadJson<T>(path: string): Promise<T> {
  const response = await fetch(`${import.meta.env.BASE_URL}${path}`);
  if (!response.ok) throw new Error(`Unable to load ${path}.`);
  return response.json() as Promise<T>;
}

export function loadSeasonalOutlook(): Promise<SeasonalOutlook> {
  return loadJson<SeasonalOutlook>("data/seasonal_outlook.json");
}

export function loadCurrentSnapshot(): Promise<CurrentSnapshot> {
  return loadJson<CurrentSnapshot>("data/current_snapshot.json");
}

export function loadForecastEvaluation(): Promise<ForecastEvaluation> {
  return loadJson<ForecastEvaluation>("data/forecast_vs_observed.json");
}

export function loadDecemberOutlook(): Promise<DecemberOutlook> {
  return loadJson<DecemberOutlook>("data/december_2026_outlook.json");
}

export function loadPartialNovember(): Promise<PartialNovember> {
  return loadJson<PartialNovember>("data/partial_november_2026.json");
}

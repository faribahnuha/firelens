import type { CurrentSnapshot, SeasonalOutlook } from "../types/firelens";

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

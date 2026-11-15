import type { FireLensDataset } from "../types/firelens";
import { validateFireLensData } from "./validateFireLensData";

const mockDatasetPath = "data/firelens.mock.json";

export async function loadFireLensData(): Promise<FireLensDataset> {
  const response = await fetch(
    `${import.meta.env.BASE_URL}${mockDatasetPath}`,
  );

  if (!response.ok) {
    throw new Error(
      `Unable to load FireLens data (HTTP ${response.status}).`,
    );
  }

  return validateFireLensData(await response.json());
}


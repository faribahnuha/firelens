import { useMemo, useState } from "react";
import type { FireLensDataset } from "../types/firelens";

export type ActivityMode = "harmonized" | "raw";

function defaultPeriod(data: FireLensDataset): string {
  const showcase = data.months.find((month) => month.map_asset !== null);
  return showcase?.period ?? data.months.at(-1)?.period ?? "";
}

export function useFireLensState(data: FireLensDataset) {
  const [selectedPeriod, setSelectedPeriod] = useState(() =>
    defaultPeriod(data),
  );
  const [activityMode, setActivityMode] =
    useState<ActivityMode>("harmonized");

  const selectedMonth = useMemo(
    () =>
      data.months.find((month) => month.period === selectedPeriod) ??
      data.months[0],
    [data.months, selectedPeriod],
  );

  return {
    selectedPeriod,
    setSelectedPeriod,
    selectedMonth,
    activityMode,
    setActivityMode,
  };
}


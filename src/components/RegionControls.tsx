import type { FireLensMonth, FireLensRegion } from "../types/firelens";
import { formatPeriod } from "../utils/formatters";

interface RegionControlsProps {
  region: FireLensRegion;
  months: FireLensMonth[];
  selectedPeriod: string;
  onPeriodChange: (period: string) => void;
}

function RegionControls({
  region,
  months,
  selectedPeriod,
  onPeriodChange,
}: RegionControlsProps) {
  const periods = [...months].sort((a, b) =>
    b.period.localeCompare(a.period),
  );

  return (
    <section className="control-panel" aria-label="Area and time controls">
      <label className="field">
        <span>Area of interest</span>
        <select value={region.id} disabled aria-describedby="region-note">
          <option value={region.id}>{region.name}</option>
        </select>
        <small id="region-note">Additional regions use the same contract.</small>
      </label>

      <label className="field">
        <span>Selected month</span>
        <select
          value={selectedPeriod}
          onChange={(event) => onPeriodChange(event.target.value)}
        >
          {periods.map((month) => (
            <option key={month.period} value={month.period}>
              {formatPeriod(month.period)}
            </option>
          ))}
        </select>
      </label>
    </section>
  );
}

export default RegionControls;


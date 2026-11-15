import type { ActivityMode } from "../state/useFireLensState";
import type { FireLensMonth } from "../types/firelens";
import { cividisColor, readableTextColor } from "../utils/colorScale";
import { formatInteger, formatPeriod } from "../utils/formatters";

const monthLabels = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
] as const;

interface FireRhythmCalendarProps {
  months: FireLensMonth[];
  selectedPeriod: string;
  mode: ActivityMode;
  onSelect: (period: string) => void;
}

function activityValue(month: FireLensMonth, mode: ActivityMode): number {
  return mode === "harmonized"
    ? month.harmonized_fau
    : month.raw_modis_detections + month.raw_viirs_detections;
}

function anomalySymbol(month: FireLensMonth): string {
  if (month.percentile >= 90) return "▲";
  if (month.percentile <= 25) return "▼";
  return "●";
}

function FireRhythmCalendar({
  months,
  selectedPeriod,
  mode,
  onSelect,
}: FireRhythmCalendarProps) {
  const years = [...new Set(months.map((month) => month.period.slice(0, 4)))].sort();
  const byPeriod = new Map(months.map((month) => [month.period, month]));
  const values = months.map((month) => activityValue(month, mode));
  const minimum = Math.min(...values);
  const maximum = Math.max(...values);

  return (
    <section className="calendar-card" aria-labelledby="calendar-title">
      <div className="visual-heading">
        <div>
          <p className="section-label">Historical pattern</p>
          <h2 id="calendar-title">Fire Rhythm Calendar</h2>
        </div>
        <div className="calendar-key" aria-label="Calendar symbol key">
          <span>▲ unusually high</span>
          <span>● usual range</span>
          <span>▼ unusually low</span>
        </div>
      </div>

      <p className="visual-description">
        Select any month to update the dashboard. Values show {mode === "harmonized" ? "harmonized fire activity units" : "raw satellite detections"}.
      </p>

      <div className="calendar-scroll" tabIndex={0} aria-label="Scrollable calendar">
        <div className="calendar-grid" role="grid" aria-label="Fire activity by year and month">
          <span className="calendar-corner" aria-hidden="true" />
          {monthLabels.map((label) => (
            <span className="calendar-month-label" key={label} role="columnheader">
              {label}
            </span>
          ))}

          {years.flatMap((year) => {
            const row = [
              <span className="calendar-year" key={`${year}-label`} role="rowheader">
                {year}
              </span>,
            ];

            monthLabels.forEach((_, index) => {
              const period = `${year}-${String(index + 1).padStart(2, "0")}`;
              const month = byPeriod.get(period);

              if (!month) {
                row.push(
                  <span className="calendar-cell calendar-cell--empty" key={period} aria-label={`${formatPeriod(period)} unavailable`} />,
                );
                return;
              }

              const value = activityValue(month, mode);
              const background = cividisColor(value, minimum, maximum);
              const symbol = anomalySymbol(month);
              const selected = period === selectedPeriod;

              row.push(
                <button
                  className="calendar-cell"
                  key={period}
                  type="button"
                  aria-current={selected ? "date" : undefined}
                  aria-label={`${formatPeriod(period)}: ${formatInteger(value)} ${mode === "harmonized" ? "fire activity units" : "raw detections"}, ${Math.round(month.percentile)}th percentile`}
                  onClick={() => onSelect(period)}
                  style={{ backgroundColor: background, color: readableTextColor(background) }}
                >
                  <span aria-hidden="true">{symbol}</span>
                  <strong>{formatInteger(value)}</strong>
                </button>,
              );
            });

            return row;
          })}
        </div>
      </div>

      <div className="color-legend" aria-label={`Color scale from ${formatInteger(minimum)} to ${formatInteger(maximum)}`}>
        <span>Lower activity</span>
        <span className="color-legend__ramp" aria-hidden="true" />
        <span>Higher activity</span>
      </div>

      <details className="calendar-table-details">
        <summary>View calendar as an accessible table</summary>
        <div className="table-scroll">
          <table>
            <caption>Fire activity by year and month</caption>
            <thead>
              <tr>
                <th scope="col">Year</th>
                {monthLabels.map((label) => <th scope="col" key={label}>{label}</th>)}
              </tr>
            </thead>
            <tbody>
              {years.map((year) => (
                <tr key={year}>
                  <th scope="row">{year}</th>
                  {monthLabels.map((_, index) => {
                    const period = `${year}-${String(index + 1).padStart(2, "0")}`;
                    const month = byPeriod.get(period);
                    return <td key={period}>{month ? formatInteger(activityValue(month, mode)) : "—"}</td>;
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </details>
    </section>
  );
}

export default FireRhythmCalendar;


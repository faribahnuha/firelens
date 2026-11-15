import { useState } from "react";
import type { SeasonalOutlook } from "../types/firelens";
import { formatInteger, formatPeriod, ordinal } from "../utils/formatters";

function SeasonalOutlookPanel({ outlook }: { outlook: SeasonalOutlook }) {
  const years = [...new Set(outlook.forecasts.map((item) => item.target_month.slice(0, 4)))].sort();
  const [year, setYear] = useState(years.at(-1) ?? "");
  const [month, setMonth] = useState("08");
  const period = `${year}-${month}`;
  const forecast = outlook.forecasts.find((item) => item.target_month === period) ?? outlook.forecasts[0];
  if (!forecast) return null;

  const labels = {
    routine_readiness: "Routine readiness",
    elevated_readiness: "Elevated readiness",
    peak_season_readiness: "Peak-season readiness",
    unavailable: "Unavailable",
  };

  return (
    <section className={`outlook-card outlook-card--${forecast.readiness_category}`} aria-labelledby="outlook-title">
      <div className="visual-heading">
        <div>
          <p className="section-label">Retrospective planning prediction</p>
          <h2 id="outlook-title">Seasonal Readiness Outlook</h2>
        </div>
        <div className="outlook-selects">
          <label className="outlook-select">Forecast year
            <select value={year} onChange={(event) => setYear(event.target.value)}>
              {years.map((item) => <option key={item} value={item}>{item}</option>)}
            </select>
          </label>
          <label className="outlook-select">Forecast month
            <select value={month} onChange={(event) => setMonth(event.target.value)}>
              {Array.from({ length: 12 }, (_, index) => String(index + 1).padStart(2, "0")).map((item) => <option key={item} value={item}>{formatPeriod(`2020-${item}`).replace(" 2020", "")}</option>)}
            </select>
          </label>
        </div>
      </div>
      <div className="outlook-result">
        <div><span>Readiness</span><strong>{labels[forecast.readiness_category]}</strong></div>
        <div><span>Predicted activity</span><strong>{forecast.predicted_fau === null ? "Unavailable" : `${formatInteger(forecast.predicted_fau)} FAUs`}</strong></div>
        <div><span>Seasonal rank</span><strong>{forecast.seasonal_rank_percentile === null ? "Unavailable" : ordinal(forecast.seasonal_rank_percentile)}</strong></div>
        <div><span>Confidence</span><strong>{forecast.confidence_level}</strong></div>
      </div>
      <p className="outlook-note">
        Planning outlook trained through {outlook.meta.data_through}; not observed current activity. Values repeat across 2023–2026 because no post-2022 observations, weather inputs, or trend model are used. Backtested MAE: {formatInteger(outlook.held_out_error.value_fau)} FAUs across {outlook.held_out_error.held_out_months} months.
      </p>
    </section>
  );
}

export default SeasonalOutlookPanel;

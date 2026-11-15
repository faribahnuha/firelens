import { useState } from "react";
import type { SeasonalOutlook } from "../types/firelens";
import { formatInteger, formatPeriod, ordinal } from "../utils/formatters";

function SeasonalOutlookPanel({ outlook }: { outlook: SeasonalOutlook }) {
  const peak = outlook.forecasts.find((item) => item.readiness_category === "peak_season_readiness");
  const [period, setPeriod] = useState(peak?.target_month ?? outlook.forecasts[0]?.target_month ?? "");
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
        <label className="outlook-select">Forecast month
          <select value={period} onChange={(event) => setPeriod(event.target.value)}>
            {outlook.forecasts.map((item) => <option key={item.target_month} value={item.target_month}>{formatPeriod(item.target_month)}</option>)}
          </select>
        </label>
      </div>
      <div className="outlook-result">
        <div><span>Readiness</span><strong>{labels[forecast.readiness_category]}</strong></div>
        <div><span>Predicted activity</span><strong>{forecast.predicted_fau === null ? "Unavailable" : `${formatInteger(forecast.predicted_fau)} FAUs`}</strong></div>
        <div><span>Seasonal rank</span><strong>{forecast.seasonal_rank_percentile === null ? "Unavailable" : ordinal(forecast.seasonal_rank_percentile)}</strong></div>
        <div><span>Confidence</span><strong>{forecast.confidence_level}</strong></div>
      </div>
      <p className="outlook-note">
        Planning outlook trained through {outlook.meta.data_through}; not observed current activity. Backtested MAE: {formatInteger(outlook.held_out_error.value_fau)} FAUs across {outlook.held_out_error.held_out_months} months.
      </p>
    </section>
  );
}

export default SeasonalOutlookPanel;

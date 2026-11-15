import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type {
  DecemberOutlook,
  ForecastEvaluation,
  PartialNovember,
} from "../types/firelens";
import { formatInteger, formatPeriod } from "../utils/formatters";

interface ForecastPerformancePanelProps {
  evaluation: ForecastEvaluation;
  outlook: DecemberOutlook;
  partialNovember: PartialNovember;
}

function ForecastPerformancePanel({
  evaluation,
  outlook,
  partialNovember,
}: ForecastPerformancePanelProps) {
  return (
    <section className="forecast-performance" aria-labelledby="forecast-performance-title">
      <div className="visual-heading">
        <div>
          <p className="section-label">Prediction tested against later observations</p>
          <h2 id="forecast-performance-title">Forecast vs. observed activity</h2>
        </div>
      </div>

      <div className="forecast-summary">
        <div><span>Evaluated months</span><strong>{evaluation.n_evaluated_months}</strong></div>
        <div><span>Mean absolute error</span><strong>{formatInteger(evaluation.mae_fau)} FAUs</strong></div>
        <div><span>Median absolute error</span><strong>{formatInteger(evaluation.median_absolute_error_fau)} FAUs</strong></div>
      </div>

      <div className="forecast-chart" role="img" aria-label="Predicted and observed monthly Fire Activity Units from January 2023 through October 2026">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={evaluation.months} margin={{ top: 10, right: 16, bottom: 8, left: 0 }}>
            <CartesianGrid stroke="#28505b" strokeDasharray="3 4" vertical={false} />
            <XAxis dataKey="period" stroke="#afc3c7" minTickGap={28} />
            <YAxis stroke="#afc3c7" width={48} tickFormatter={(value: number) => formatInteger(value)} />
            <Tooltip formatter={(value) => `${formatInteger(Number(value))} FAUs`} labelFormatter={(label) => formatPeriod(String(label))} contentStyle={{ background: "#0c2430", border: "1px solid #28505b" }} />
            <Legend />
            <Line type="monotone" dataKey="predicted_fau" name="Predicted" stroke="#7ee8fa" dot={false} strokeWidth={2} />
            <Line type="monotone" dataKey="observed_viirs_fau" name="Observed VIIRS" stroke="#f1ca50" dot={false} strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="december-outlook">
        <div>
          <p className="section-label">Future planning outlook</p>
          <h3>December 2026</h3>
          <p>Based on complete monthly data through October 2026. Partial November observations are excluded.</p>
        </div>
        <div><span>Predicted activity</span><strong>{formatInteger(outlook.predicted_fau)} FAUs</strong></div>
        <div><span>Heuristic range</span><strong>{formatInteger(outlook.heuristic_lower_bound)}–{formatInteger(outlook.heuristic_upper_bound)}</strong></div>
        <div><span>Confidence</span><strong>{outlook.meta.confidence_level}</strong></div>
      </div>

      <aside className="partial-warning">
        <strong>November 2026 is partial and excluded.</strong>
        <span>Available only through {partialNovember.available_through}. Missing days are not interpreted as zero.</span>
      </aside>
    </section>
  );
}

export default ForecastPerformancePanel;

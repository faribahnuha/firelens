import type { ActivityMode } from "../state/useFireLensState";
import type { FireLensMonth } from "../types/firelens";
import { createDashboardMetrics } from "../utils/metrics";
import MetricCard from "./MetricCard";

interface MetricGridProps {
  month: FireLensMonth;
  mode: ActivityMode;
}

function MetricGrid({ month, mode }: MetricGridProps) {
  const metrics = createDashboardMetrics(month, mode);

  return (
    <section className="metric-grid" aria-label="Selected month summary">
      {metrics.map((metric) => (
        <MetricCard key={metric.id} metric={metric} />
      ))}
    </section>
  );
}

export default MetricGrid;


import type { DashboardMetric } from "../utils/metrics";

interface MetricCardProps {
  metric: DashboardMetric;
}

function MetricCard({ metric }: MetricCardProps) {
  return (
    <article className={`metric-card metric-card--${metric.tone}`}>
      <p>{metric.label}</p>
      <strong>{metric.value}</strong>
      <span>{metric.detail}</span>
    </article>
  );
}

export default MetricCard;


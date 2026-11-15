import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { ActivityMode } from "../state/useFireLensState";
import type { FireLensMonth } from "../types/firelens";
import { formatInteger } from "../utils/formatters";

interface ActivityTimelineProps {
  months: FireLensMonth[];
  selectedPeriod: string;
  mode: ActivityMode;
}

function ActivityTimeline({ months, selectedPeriod, mode }: ActivityTimelineProps) {
  const annual = new Map<string, { year: string; raw: number; harmonized: number }>();

  months.forEach((month) => {
    const year = month.period.slice(0, 4);
    const current = annual.get(year) ?? { year, raw: 0, harmonized: 0 };
    current.raw += month.raw_modis_detections + month.raw_viirs_detections;
    current.harmonized += month.harmonized_fau;
    annual.set(year, current);
  });

  const data = [...annual.values()].sort((a, b) => a.year.localeCompare(b.year));
  const selectedYear = selectedPeriod.slice(0, 4);

  return (
    <section className="timeline-card" aria-labelledby="timeline-title">
      <div className="visual-heading">
        <div>
          <p className="section-label">Sensor transition</p>
          <h2 id="timeline-title">Raw vs. harmonized history</h2>
        </div>
      </div>
      <p className="visual-description">
        The selected mode is emphasized. Raw counts and harmonized activity use different units and are shown to reveal their contrasting shapes, not as equal quantities.
      </p>

      <div className="timeline-chart" role="img" aria-label="Annual raw detections and harmonized fire activity line chart">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 12, right: 18, bottom: 6, left: 0 }}>
            <CartesianGrid stroke="#28505b" strokeDasharray="3 4" vertical={false} />
            <XAxis dataKey="year" stroke="#afc3c7" tickLine={false} />
            <YAxis stroke="#afc3c7" tickLine={false} tickFormatter={(value: number) => formatInteger(value)} width={48} />
            <Tooltip
              contentStyle={{ background: "#0c2430", border: "1px solid #28505b", borderRadius: "8px" }}
              labelStyle={{ color: "#f4f7f6" }}
              formatter={(value) => formatInteger(Number(value))}
            />
            <Legend />
            <ReferenceLine x={selectedYear} stroke="#f1ca50" strokeWidth={2} strokeDasharray="4 4" />
            <Line
              type="monotone"
              dataKey="raw"
              name="Raw detections"
              stroke="#7ee8fa"
              strokeWidth={mode === "raw" ? 4 : 2}
              strokeOpacity={mode === "raw" ? 1 : 0.45}
              dot={{ r: mode === "raw" ? 4 : 2 }}
            />
            <Line
              type="monotone"
              dataKey="harmonized"
              name="Harmonized FAU"
              stroke="#f1ca50"
              strokeWidth={mode === "harmonized" ? 4 : 2}
              strokeOpacity={mode === "harmonized" ? 1 : 0.45}
              dot={{ r: mode === "harmonized" ? 4 : 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <details className="calendar-table-details">
        <summary>View annual values as a table</summary>
        <div className="table-scroll">
          <table>
            <caption>Annual raw detections and harmonized fire activity</caption>
            <thead><tr><th scope="col">Year</th><th scope="col">Raw detections</th><th scope="col">Harmonized FAU</th></tr></thead>
            <tbody>
              {data.map((row) => (
                <tr key={row.year}><th scope="row">{row.year}</th><td>{formatInteger(row.raw)}</td><td>{formatInteger(row.harmonized)}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
      </details>
    </section>
  );
}

export default ActivityTimeline;


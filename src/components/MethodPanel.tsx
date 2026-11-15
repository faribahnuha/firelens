import type { FireLensDataset } from "../types/firelens";

function MethodPanel({ data }: { data: FireLensDataset }) {
  return (
    <details className="method-panel">
      <summary>Method, validation, and limitations</summary>
      <div>
        <p><strong>Unit:</strong> One active 5 km grid-cell day.</p>
        <p><strong>Validation:</strong> {data.method.validation_mape?.toFixed(1) ?? "Unavailable"}% median absolute percentage error across {data.method.validation_held_out_months ?? "unavailable"} held-out months.</p>
        <p><strong>Coverage:</strong> Data through {data.meta.data_through}. Detection-only archives cannot prove that missing observations mean zero activity.</p>
        <p><strong>Limits:</strong> Hotspots are flagged pixels, not separate fires, burned area, emergency warnings, or evacuation guidance.</p>
      </div>
    </details>
  );
}

export default MethodPanel;

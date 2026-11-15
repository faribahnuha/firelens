import type { DatasetMeta } from "../types/firelens";

interface DataStatusProps {
  meta: DatasetMeta;
}

function DataStatus({ meta }: DataStatusProps) {
  return (
    <aside
      className={`data-status ${meta.is_mock ? "data-status--mock" : ""}`}
      aria-label="Dataset status"
    >
      <span className="data-status__symbol" aria-hidden="true">
        {meta.is_mock ? "!" : "✓"}
      </span>
      <div>
        <strong>
          {meta.is_mock ? "Demonstration data" : "Processed NASA data"}
        </strong>
        <span>{meta.source}</span>
      </div>
    </aside>
  );
}

export default DataStatus;


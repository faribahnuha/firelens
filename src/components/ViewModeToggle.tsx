import type { ActivityMode } from "../state/useFireLensState";

interface ViewModeToggleProps {
  mode: ActivityMode;
  onChange: (mode: ActivityMode) => void;
}

function ViewModeToggle({ mode, onChange }: ViewModeToggleProps) {
  return (
    <fieldset className="mode-toggle">
      <legend>Activity measure</legend>
      <div>
        <button
          type="button"
          aria-pressed={mode === "harmonized"}
          onClick={() => onChange("harmonized")}
        >
          Harmonized activity
        </button>
        <button
          type="button"
          aria-pressed={mode === "raw"}
          onClick={() => onChange("raw")}
        >
          Raw detections
        </button>
      </div>
      <p>
        {mode === "harmonized"
          ? "Sensor differences reduced for historical comparison."
          : "Original counts reveal why MODIS and VIIRS cannot be spliced directly."}
      </p>
    </fieldset>
  );
}

export default ViewModeToggle;


import { useEffect, useState } from "react";
import ActivityTimeline from "./components/ActivityTimeline";
import DataStatus from "./components/DataStatus";
import FireRhythmCalendar from "./components/FireRhythmCalendar";
import MetricGrid from "./components/MetricGrid";
import RegionControls from "./components/RegionControls";
import ViewModeToggle from "./components/ViewModeToggle";
import { loadFireLensData } from "./data/loadFireLensData";
import { useFireLensState } from "./state/useFireLensState";
import type { FireLensDataset } from "./types/firelens";
import { formatPeriod } from "./utils/formatters";

type LoadState =
  | { status: "loading" }
  | { status: "ready"; data: FireLensDataset }
  | { status: "error"; message: string };

function Dashboard({ data }: { data: FireLensDataset }) {
  const {
    selectedPeriod,
    setSelectedPeriod,
    selectedMonth,
    activityMode,
    setActivityMode,
  } = useFireLensState(data);

  return (
    <>
      <DataStatus meta={data.meta} />

      <div className="dashboard-heading">
        <div>
          <p className="section-label">Selected view</p>
          <h2>{formatPeriod(selectedMonth.period)}</h2>
          <p>{data.region.name}</p>
        </div>
        <ViewModeToggle mode={activityMode} onChange={setActivityMode} />
      </div>

      <RegionControls
        region={data.region}
        months={data.months}
        selectedPeriod={selectedPeriod}
        onPeriodChange={setSelectedPeriod}
      />

      <MetricGrid month={selectedMonth} mode={activityMode} />

      <div className="visual-stack">
        <FireRhythmCalendar
          months={data.months}
          selectedPeriod={selectedPeriod}
          mode={activityMode}
          onSelect={setSelectedPeriod}
        />
        <ActivityTimeline
          months={data.months}
          selectedPeriod={selectedPeriod}
          mode={activityMode}
        />
      </div>
    </>
  );
}

function App() {
  const [loadState, setLoadState] = useState<LoadState>({ status: "loading" });

  useEffect(() => {
    let active = true;

    loadFireLensData()
      .then((data) => {
        if (active) {
          setLoadState({ status: "ready", data });
        }
      })
      .catch((error: unknown) => {
        if (active) {
          setLoadState({
            status: "error",
            message:
              error instanceof Error ? error.message : "Unknown data error.",
          });
        }
      });

    return () => {
      active = false;
    };
  }, []);

  return (
    <div className="app-shell">
      <header className="site-header">
        <a className="brand" href="/" aria-label="FireLens home">
          <span className="brand-mark" aria-hidden="true">FL</span>
          <span>FireLens</span>
        </a>
        <span className="build-status">Data contract · v1.0.0</span>
      </header>

      <main id="main-content" className="foundation" tabIndex={-1}>
        <p className="eyebrow">NASA Space Apps Challenge · Interactive prototype</p>
        <h1>One fire history. Any satellite. Clearer decisions.</h1>
        <p className="intro">
          FireLens will transform MODIS and VIIRS hotspot observations into a
          comparable burning-activity calendar. Compare the corrected history
          with raw satellite detections and inspect the evidence behind each
          selected month.
        </p>

        {loadState.status === "loading" && (
          <p className="loading-message" role="status">
            Validating the FireLens dataset…
          </p>
        )}

        {loadState.status === "error" && (
          <section className="error-card" role="alert">
            <h2>Dataset could not be loaded</h2>
            <p>{loadState.message}</p>
          </section>
        )}

        {loadState.status === "ready" && <Dashboard data={loadState.data} />}
      </main>
    </div>
  );
}

export default App;


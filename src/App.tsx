import { useEffect, useState } from "react";
import ActivityTimeline from "./components/ActivityTimeline";
import ActivityMap from "./components/ActivityMap";
import CurrentStatus from "./components/CurrentStatus";
import DataStatus from "./components/DataStatus";
import FireRhythmCalendar from "./components/FireRhythmCalendar";
import MetricGrid from "./components/MetricGrid";
import MethodPanel from "./components/MethodPanel";
import OperationalBrief from "./components/OperationalBrief";
import RegionControls from "./components/RegionControls";
import ViewModeToggle from "./components/ViewModeToggle";
import SeasonalOutlookPanel from "./components/SeasonalOutlookPanel";
import { loadFireLensData } from "./data/loadFireLensData";
import { loadCurrentSnapshot, loadSeasonalOutlook } from "./data/loadSupplementalData";
import { useFireLensState } from "./state/useFireLensState";
import type { CurrentSnapshot, FireLensDataset, SeasonalOutlook } from "./types/firelens";
import { downloadMonthlyCsv } from "./utils/csvExport";
import { formatPeriod } from "./utils/formatters";

type LoadState =
  | { status: "loading" }
  | { status: "ready"; data: FireLensDataset; outlook: SeasonalOutlook; snapshot: CurrentSnapshot }
  | { status: "error"; message: string };

function Dashboard({ data, outlook, snapshot }: { data: FireLensDataset; outlook: SeasonalOutlook; snapshot: CurrentSnapshot }) {
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

      <OperationalBrief month={selectedMonth} />

      <div className="map-outlook-grid">
        <ActivityMap month={selectedMonth} region={data.region} />
        <SeasonalOutlookPanel outlook={outlook} />
      </div>

      <CurrentStatus snapshot={snapshot} />

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

      <div className="data-actions">
        <button type="button" onClick={() => downloadMonthlyCsv(data)}>Download monthly CSV</button>
        <MethodPanel data={data} />
      </div>
    </>
  );
}

function App() {
  const [loadState, setLoadState] = useState<LoadState>({ status: "loading" });

  useEffect(() => {
    let active = true;

    Promise.all([loadFireLensData(), loadSeasonalOutlook(), loadCurrentSnapshot()])
      .then(([data, outlook, snapshot]) => {
        if (active) {
          setLoadState({ status: "ready", data, outlook, snapshot });
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

        {loadState.status === "ready" && <Dashboard data={loadState.data} outlook={loadState.outlook} snapshot={loadState.snapshot} />}
      </main>
    </div>
  );
}

export default App;


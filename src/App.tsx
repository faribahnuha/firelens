import { useEffect, useState } from "react";
import DataStatus from "./components/DataStatus";
import { loadFireLensData } from "./data/loadFireLensData";
import type { FireLensDataset } from "./types/firelens";

type LoadState =
  | { status: "loading" }
  | { status: "ready"; data: FireLensDataset }
  | { status: "error"; message: string };

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
        <p className="eyebrow">NASA Space Apps Challenge · Step 2</p>
        <h1>One fire history. Any satellite. Clearer decisions.</h1>
        <p className="intro">
          FireLens will transform MODIS and VIIRS hotspot observations into a
          comparable burning-activity calendar. The shared data contract is now
          versioned, validated, and ready for Person A's pipeline output.
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

        {loadState.status === "ready" && (
          <>
            <DataStatus meta={loadState.data.meta} />
            <section
              className="foundation-card"
              aria-labelledby="next-step-title"
            >
              <span className="step-number" aria-hidden="true">02</span>
              <div>
                <h2 id="next-step-title">Data contract validated</h2>
                <p>
                  {loadState.data.months.length} monthly records loaded for{" "}
                  {loadState.data.region.name}. The dashboard will consume this
                  same structure when real NASA-derived data arrives.
                </p>
              </div>
            </section>
          </>
        )}
      </main>
    </div>
  );
}

export default App;


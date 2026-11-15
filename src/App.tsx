function App() {
  return (
    <div className="app-shell">
      <header className="site-header">
        <a className="brand" href="/" aria-label="FireLens home">
          <span className="brand-mark" aria-hidden="true">FL</span>
          <span>FireLens</span>
        </a>
        <span className="build-status">Foundation ready</span>
      </header>

      <main id="main-content" className="foundation" tabIndex={-1}>
        <p className="eyebrow">NASA Space Apps Challenge</p>
        <h1>One fire history. Any satellite. Clearer decisions.</h1>
        <p className="intro">
          FireLens will transform MODIS and VIIRS hotspot observations into a
          comparable burning-activity calendar. The application foundation is
          ready; the interactive dashboard comes next.
        </p>

        <section className="foundation-card" aria-labelledby="next-step-title">
          <span className="step-number" aria-hidden="true">01</span>
          <div>
            <h2 id="next-step-title">Project foundation</h2>
            <p>
              React, TypeScript, Vite, accessibility defaults, mapping, charts,
              and testing are configured in one static web project.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;


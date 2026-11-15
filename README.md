# FireLens

**One fire history. Any satellite. Clearer decisions.**

FireLens is a static decision-support prototype for the NASA Space Apps Challenge **Harmonization of MODIS and VIIRS Hot Spots** challenge. It converts incompatible NASA FIRMS hotspot observations into a comparable monthly record based on active 5 km grid-cell days.

## What FireLens does

- Harmonizes MODIS and VIIRS activity into a consistent historical index.
- Shows a selectable year-by-month Fire Rhythm Calendar.
- Demonstrates the sensor transition with raw and harmonized timelines.
- Replays September 2020 as a responder-oriented historical review.
- Maps 922 approximate activity-grid polygons for the showcase month.
- Extends observed activity through October 2026 and compares the 2022-trained forecast with 46 later observed months.
- Exports monthly evidence as CSV.
- Exposes validation, uncertainty, data freshness, and limitations.

## Verified showcase

For California in September 2020, the processed dataset reports 6,360 harmonized Fire Activity Units, the 100th historical same-month percentile, approximately 774% above the historical September median, and 922 mapped activity cells. These are activity-index measurements, not counts of separate fires, fire perimeters, or burned area.

## Forecast evaluation and outlook

The seasonal-median model was frozen using history through December 2022, then tested against 46 later observed months from January 2023 through October 2026. Its out-of-sample mean absolute error is approximately 139 FAUs and median absolute error is approximately 126 FAUs. The December 2026 planning outlook predicts 427 FAUs with low confidence and a heuristic range of 0–1,378 FAUs. Partial November 2026 observations are excluded.

The outlook is not observed current activity, a weather forecast, an emergency warning, evacuation guidance, or a prediction of individual fires.

## Method

One Fire Activity Unit represents one 5 km grid cell with one or more retained detections during one UTC day. Multiple detections inside the same cell-day do not inflate the main measure. Month-specific calibration factors are estimated from overlapping MODIS and VIIRS observations.

The harmonization validation reports a preliminary 13.6% median absolute percentage error across 132 held-out, detection-positive overlap months. This does not measure uncertainty from missing observations or undetected activity.

Documentation:

- [`docs/person-a/METHOD.md`](docs/person-a/METHOD.md)
- [`docs/person-a/DATA_SOURCES.md`](docs/person-a/DATA_SOURCES.md)
- [`docs/person-a/LIMITATIONS.md`](docs/person-a/LIMITATIONS.md)

## Technology

React, TypeScript, Vite, React-Leaflet, OpenStreetMap, Recharts, Python, Vitest, and static JSON/CSV/GeoJSON assets.

## Run locally

Requires Node.js 20.19 or newer.

```bash
npm install
npm run dev
```

```bash
npm test
npm run build
```

## Deployment

Import this repository into Vercel. Use `npm run build` and output directory `dist`.

## Credits

- NASA FIRMS/LANCE MODIS Collection 6.1 active-fire archive
- NASA FIRMS/LANCE VIIRS Suomi-NPP Collection 2 active-fire archive
- Map tiles © OpenStreetMap contributors

NASA FIRMS: https://firms.modaps.eosdis.nasa.gov/

This independent prototype is not an official NASA product and is not endorsed by NASA. NASA logos or mission marks are not used.

See [`AI_DISCLOSURE.md`](AI_DISCLOSURE.md).


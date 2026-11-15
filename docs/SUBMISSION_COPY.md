# NASA Space Apps Submission Copy

## Project Name

**FireLens — One Fire History, Any Satellite**

## Summary

FireLens is an interactive decision-support prototype that transforms NASA FIRMS MODIS and VIIRS hotspot observations into one comparable fire-activity history. Because VIIRS detects activity at a finer resolution than MODIS, raw hotspot counts create a misleading sensor-era jump. FireLens reduces this bias by aggregating observations into common 5 km active grid-cell days and applying transparent, month-specific calibration derived from overlapping observations. Users can explore California’s 2000–2022 Fire Rhythm Calendar, compare raw and harmonized trends, inspect a September 2020 historical responder replay, map detected activity cells, and download the evidence. A low-confidence, chronologically backtested Seasonal Readiness Outlook identifies historically more active planning periods without claiming to observe current conditions or predict individual fires. FireLens exposes its validation, uncertainty, source freshness, and limitations so responders and land managers can distinguish real changes in activity from changes in satellite technology.

## Project Details

FireLens creates a sensor-neutral fire-activity index from NASA FIRMS MODIS Collection 6.1 and VIIRS Suomi-NPP Collection 2 archives. Each retained detection is assigned to a common 5 km grid. Multiple detections in the same grid cell and UTC day become one Fire Activity Unit. Month-specific calibration factors are estimated from overlapping MODIS and VIIRS years.

The React and TypeScript application includes an interactive calendar, raw-versus-harmonized timeline, historical responder replay, September 2020 grid-cell map, CSV export, accessible table alternatives, and method panel. The California export contains 266 monthly records from November 2000 through December 2022. September 2020 reaches the 100th historical same-month percentile with 6,360 harmonized FAUs—approximately 774% above its historical September median.

The seasonal-median forecast was frozen using data through 2022 and evaluated against 46 later observed months from January 2023 through October 2026. It achieved a mean absolute error of approximately 139 FAUs and median absolute error of approximately 126 FAUs. A low-confidence December 2026 planning outlook predicts 427 FAUs with a heuristic range of 0–1,378 FAUs. Partial November observations are explicitly excluded.

The frontend uses React, TypeScript, Vite, React-Leaflet, OpenStreetMap, and Recharts. The preprocessing pipeline uses Python and reproducible static JSON, CSV, and GeoJSON outputs. The harmonization validation reports a preliminary 13.6% median absolute percentage error across 132 detection-positive held-out overlap months. Scientific limitations are displayed in the application.

## Project Demonstration

Add the complete public demonstration URL.

## Project

Add the complete public Vercel URL.

## Source Repository

https://github.com/faribahnuha/firelens


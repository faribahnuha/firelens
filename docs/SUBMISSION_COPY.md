# NASA Space Apps Submission Copy

## Project Name

**FireLens — One Fire History, Any Satellite**

## Summary

FireLens is an interactive decision-support prototype that transforms NASA FIRMS MODIS and VIIRS hotspot observations into one comparable fire-activity history. Because VIIRS detects activity at a finer resolution than MODIS, raw hotspot counts create a misleading sensor-era jump. FireLens reduces this bias by aggregating observations into common 5 km active grid-cell days and applying transparent, month-specific calibration derived from overlapping observations. Users can explore California’s 2000–2022 Fire Rhythm Calendar, compare raw and harmonized trends, inspect a September 2020 historical responder replay, map detected activity cells, and download the evidence. A low-confidence, chronologically backtested Seasonal Readiness Outlook identifies historically more active planning periods without claiming to observe current conditions or predict individual fires. FireLens exposes its validation, uncertainty, source freshness, and limitations so responders and land managers can distinguish real changes in activity from changes in satellite technology.

## Project Details

FireLens creates a sensor-neutral fire-activity index from NASA FIRMS MODIS Collection 6.1 and VIIRS Suomi-NPP Collection 2 archives. Each retained detection is assigned to a common 5 km grid. Multiple detections in the same grid cell and UTC day become one Fire Activity Unit. Month-specific calibration factors are estimated from overlapping MODIS and VIIRS years.

The React and TypeScript application includes an interactive calendar, raw-versus-harmonized timeline, historical responder replay, September 2020 grid-cell map, CSV export, accessible table alternatives, and method panel. The California export contains 266 monthly records from November 2000 through December 2022. September 2020 reaches the 100th historical same-month percentile with 6,360 harmonized FAUs—approximately 774% above its historical September median.

The retrospective 2023–2026 Seasonal Readiness Outlook compared three season-matched forecasting methods using chronological backtesting. The selected seasonal-median method had a mean absolute error of approximately 452 FAUs across 72 held-out months. August, September, and October are peak-season readiness periods. Monthly predictions repeat because the model uses no post-2022 observations, weather inputs, or trend model. The forecast is low confidence and is not current activity, evacuation guidance, or prediction of individual fires.

The frontend uses React, TypeScript, Vite, React-Leaflet, OpenStreetMap, and Recharts. The preprocessing pipeline uses Python and reproducible static JSON, CSV, and GeoJSON outputs. The harmonization validation reports a preliminary 13.6% median absolute percentage error across 132 detection-positive held-out overlap months. Scientific limitations are displayed in the application.

## Project Demonstration

Add the complete public demonstration URL.

## Project

Add the complete public Vercel URL.

## Source Repository

https://github.com/faribahnuha/firelens


# Limitations

- Satellite hotspots flag pixels and may reflect repeated detections; they are not counts of distinct fires or burned area.
- Clouds, smoke, sensor overpass times, outages, scan geometry, confidence filters, and thermal anomalies from non-fire sources affect detections.
- A 5 km cell-day reduces but does not remove resolution differences; the spherical-sinusoidal grid is an approximation and is not a rigorous equal-area land mask.
- Regional and seasonal calibration is not transferable without testing. Sparse or zero-denominator overlap periods make factors uncertain.
- Detection-only archives do not establish observation coverage. Missing periods cannot safely be interpreted as zero activity.
- The action window is a historical monitoring aid, not a weather forecast, emergency warning, or evacuation recommendation.
- Near-real-time data may be revised when standard science-quality products become available.

## 2000–2022 preliminary build
- Bounding-box filtering includes locations outside the California state polygon.
- Detection-only records do not prove cloud-free observation or complete monthly coverage. Inferred observed months are conditional on retained detections, so missing months and low-activity months can bias anomaly and calibration statistics.
- Median held-out percentage error is preliminary, not a demonstrated accuracy guarantee.
- Historical action-window values remain null until complete weekly coverage can be established.

## November 2026 final-mile review

The historical action-window fields are intentionally `null`. FIRMS hotspot CSVs contain positive detections, not an independent record of successful satellite observations on every day/week. Treating absent detections as observed zeros would risk a misleading onset estimate. A scientifically defensible action window needs a separate coverage assessment or documented zero-coverage assumptions, plus a minimum onset-year sample threshold. Do not present an illustrative window as an observed California result.

The showcase_cell_days.json asset contains 5-km projected cell indices, sensor-specific counts, and daily activity, not polygon geometry. The frontend must not plot cell IDs as latitude/longitude or imply they represent fire boundaries. Persistence is based on repeated active cell-days, not confirmed tracking of an individual fire. Spatial expansion remains unverified without a defined neighborhood algorithm and grid geometry.

### Final-mile caveats

- The GeoJSON contains approximate projected 5 km grid cells, not confirmed fire boundaries or burned area. The rectangular area of interest includes land outside California.
- A daily increase in active cells or an adjacent active cell is a **thermal-detection activity pattern**, not evidence of the physical spread of an individual wildfire.
- Provisional onset dates are derived from detections, not independently verified satellite observation coverage. The main JSON contract intentionally leaves `action_window` null.
- The validation metric is conditional on retained detection-positive overlap months; it does not quantify uncertainty from undetected activity or missing observation coverage.

## Optional current snapshot

The optional `current_snapshot.json` is a machine-readable **unavailable** status, not a current scientific finding. No near-real-time observation window, independent coverage confirmation, or current seasonal comparison was provided. Its scientific metrics and map path are intentionally null; the generated timestamp records file creation, not satellite acquisition.

### Seasonal outlook export

`seasonal_outlook.json` is a retrospective, as-of-2022 projection for 2023,
not observed current activity or a live forecast. The backtest evaluates
season-matched methods only on VIIRS-primary months, because the older MODIS
harmonized values use calibration factors estimated using later overlap years.
The seasonal forecast can still be biased by unverified satellite coverage,
changes in detection characteristics, regional heterogeneity, and changing
climate conditions. Its prediction bounds use held-out absolute errors as a
heuristic, not statistically calibrated predictive coverage. Readiness
categories rank the twelve forecast months against one another within the annual seasonal cycle, not against historical same-month anomaly thresholds; they are not emergency guidance.

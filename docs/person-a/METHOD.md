# FireLens method (first implementation)

- **Unit:** one 5 km spherical-sinusoidal grid cell active on one UTC day. Per-sensor cell-day activity is binary; raw detections and FRP remain separate. This is an activity index, not individual fire counts or burned area.
- **Preprocessing:** normalize field names; parse FIRMS acquisition dates (UTC); reject invalid coordinates, exact duplicate rows, and detections outside the bounding rectangle. When `type` is provided, retain vegetation-fire type `0`; otherwise non-fire thermal anomalies remain possible. VIIRS retains nominal/high; MODIS threshold defaults to 30 and is configurable.
- **Monthly calibration:** for each calendar month, take median over overlapping years of `VIIRS_FAU / MODIS_FAU`, with positive MODIS denominators. With fewer than three qualifying years, use the median pooled regional ratio and mark low quality. VIIRS is primary in overlapping/newer periods; older MODIS activity is multiplied by the factor.
- **Anomaly:** compare each month with other years of the same calendar month; percentile is empirical midrank. If historical median is zero, percentage anomaly is undefined (`null`). Baselines currently include all other available years, so incomplete coverage can bias the estimate.
- **Action window:** a testable helper identifies two consecutive weekly intervals above leave-one-year-out historical week-of-year 75th percentiles, and takes the 10th–90th percentile of onset weeks. The production exporter leaves this field null until complete observation coverage and harmonized daily history are verified.
- **Validation:** leave-one-year-out, median absolute percentage error for positive VIIRS FAU and positive MODIS FAU, using other years of the same calendar month. Excluded zero denominators and small overlap samples are disclosed in metadata.

This increment is a pipeline foundation, not a validated scientific finding.

## Final-mile exports (California)

`showcase.geojson` contains polygons constructed by inverting the same 5 km spherical sinusoidal grid used for aggregation. These are approximate grid cells, not wildfire perimeters and not California-boundary-clipped polygons. `daily_metrics.json` reports sensor-unioned active grid cells, newly active cells, and counts adjacent to the previous day's footprint. The `expansion_two_day_increase` indicator requires two consecutive increases in daily active-cell counts; it does not establish fire spread.

`action_window_provisional.json` applies a 75th percentile week-of-year threshold using 2013–2022 VIIRS detection-based activity, leaving out the target year when constructing its threshold. Two consecutive elevated seven-day bins define a candidate onset. The middle 80% of qualifying onset weeks defines a provisional historical window. Weeks with no retained detections are treated as zero **only for this exploratory calculation**; no independent cloud/overpass/coverage record was available. Consequently the top-level `action_window` dates remain null. Do not claim this provisional window is a verified operational monitoring aid.

The source CSVs and the rectangular California bounds are required to reproduce the analysis. Original NASA download ZIPs are included under `data-pipeline/raw/nasa-original-downloads/`; extract the documented CSVs to reproduce the analysis. To regenerate the final-mile outputs from extracted CSVs, first run `src/build.py` with matching region arguments and `--end-date 2022-12-31`, then run `src/finish.py --modis PATH --viirs PATH --output output/california`.

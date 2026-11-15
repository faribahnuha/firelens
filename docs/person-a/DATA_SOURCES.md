# Data provenance checklist

Source: NASA FIRMS / LANCE active-fire and thermal anomaly products, https://firms.modaps.eosdis.nasa.gov/download/

The original NASA FIRMS download ZIPs are bundled in `data-pipeline/raw/nasa-original-downloads/`. Before generating final assets, record exact MODIS and VIIRS product names, platform(s), collection/version, file hashes, download date, archive URLs, temporal coverage, geographic bounds, filtering rules, and any gaps or replacement of near-real-time records with science-quality data. Keep raw CSVs out of version control if large. Do not claim a continuous record merely because the archive has rows in some months.

## Newly uploaded official archive
- NASA FIRMS MODIS C6.1, archive request `850310`, file `fire_archive_M-C61_850310.csv`; observations in the archive span 2000-11-02 through 2026-08-31. A separate NRT file was supplied and **not** used.
- NASA FIRMS VIIRS Suomi-NPP C2, archive request `850301`, file `fire_archive_SV-C2_850301.csv` (previously supplied).
- Current California build uses only observations through 2022-12-31, to avoid incomplete 2023 overlap.
- All three original NASA download ZIPs are bundled unchanged in `data-pipeline/raw/nasa-original-downloads/`. Extract the relevant archive CSVs to reproduce the outputs.

import { useEffect, useState } from "react";
import type { FeatureCollection } from "geojson";
import { GeoJSON, MapContainer, TileLayer } from "react-leaflet";
import type { FireLensMonth, FireLensRegion } from "../types/firelens";

interface ActivityMapProps {
  month: FireLensMonth;
  region: FireLensRegion;
}

function ActivityMap({ month, region }: ActivityMapProps) {
  const [geojson, setGeojson] = useState<FeatureCollection | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setGeojson(null);
    setError(null);
    if (!month.map_asset) return;
    fetch(`${import.meta.env.BASE_URL}${month.map_asset}`)
      .then((response) => {
        if (!response.ok) throw new Error("Map data could not be loaded.");
        return response.json() as Promise<FeatureCollection>;
      })
      .then(setGeojson)
      .catch((caught: unknown) =>
        setError(caught instanceof Error ? caught.message : "Map data error."),
      );
  }, [month.map_asset]);

  return (
    <section className="map-card" aria-labelledby="map-title">
      <div className="visual-heading">
        <div>
          <p className="section-label">Detected grid-cell activity</p>
          <h2 id="map-title">Historical activity map</h2>
        </div>
      </div>
      <p className="visual-description">
        Approximate 5 km activity cells—not fire perimeters or burned area. Map geometry is available for the September 2020 showcase.
      </p>
      {!month.map_asset && <div className="map-empty">No spatial asset was exported for this month. Select September 2020.</div>}
      {error && <div className="map-empty" role="alert">{error}</div>}
      {month.map_asset && !error && (
        <MapContainer
          className="activity-map"
          bounds={[[region.bounds[1], region.bounds[0]], [region.bounds[3], region.bounds[2]]]}
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {geojson && (
            <GeoJSON
              key={month.period}
              data={geojson}
              style={{ color: "#f1ca50", weight: 0.7, fillColor: "#f1ca50", fillOpacity: 0.48 }}
            />
          )}
        </MapContainer>
      )}
    </section>
  );
}

export default ActivityMap;

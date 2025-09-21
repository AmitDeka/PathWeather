"use client";

import { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { LoaderCircleIcon } from "lucide-react";

try {
  delete L.Icon.Default.prototype._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: new URL(
      "leaflet/dist/images/marker-icon-2x.png",
      import.meta.url
    ).toString(),
    iconUrl: new URL(
      "leaflet/dist/images/marker-icon.png",
      import.meta.url
    ).toString(),
    shadowUrl: new URL(
      "leaflet/dist/images/marker-shadow.png",
      import.meta.url
    ).toString(),
  });
} catch (err) {
  console.log(err);
}

function haversine([lat1, lon1], [lat2, lon2]) {
  const toRad = (v) => (v * Math.PI) / 180;
  const R = 6371;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  return R * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
}

async function geocode(place) {
  if (!place || !place.trim()) return null;
  const url = `/api/geocode?place=${encodeURIComponent(place)}`;
  const res = await fetch(url);
  if (!res.ok) {
    console.error(`Geocoding failed for: ${place}`);
    return null;
  }

  const data = await res.json();
  if (!data || data.length === 0) return null;

  return { name: place, lat: Number(data[0].lat), lon: Number(data[0].lon) };
}

async function getForecastAt(lat, lon, targetTime) {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,weathercode&timezone=UTC`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Weather fetch failed");
  const data = await res.json();
  if (!data.hourly || !data.hourly.time) return null;

  const times = data.hourly.time;
  const temps = data.hourly.temperature_2m;
  const codes = data.hourly.weathercode;

  const target = new Date(targetTime).toISOString();
  let closestIndex = 0;
  let bestDiff = Infinity;
  for (let i = 0; i < times.length; i++) {
    const diff = Math.abs(
      new Date(times[i]).getTime() - new Date(target).getTime()
    );
    if (diff < bestDiff) {
      bestDiff = diff;
      closestIndex = i;
    }
  }

  return {
    time: times[closestIndex],
    temp: temps[closestIndex],
    code: codes[closestIndex],
  };
}

async function getRoute(coords) {
  if (coords.length < 2) return null;
  const coordStr = coords.map((c) => `${c.lon},${c.lat}`).join(";");
  const url = `https://router.project-osrm.org/route/v1/driving/${coordStr}?overview=full&geometries=geojson`;

  const res = await fetch(url);
  if (!res.ok) throw new Error("Route fetch failed");
  const data = await res.json();
  if (!data.routes || !data.routes[0]) return null;

  return data.routes[0].geometry.coordinates.map(([lon, lat]) => [lat, lon]);
}

function sampleRouteByDistance(routeCoords, speedKmH) {
  if (!routeCoords || routeCoords.length < 2) return [];

  const stepKm = speedKmH / 2;
  const result = [routeCoords[0]];
  let last = routeCoords[0];
  let accumulated = 0;

  for (let i = 1; i < routeCoords.length; i++) {
    const d = haversine(last, routeCoords[i]);
    accumulated += d;

    if (accumulated >= stepKm) {
      result.push(routeCoords[i]);
      accumulated = 0;
    }

    last = routeCoords[i];
  }

  const lastPoint = routeCoords[routeCoords.length - 1];
  const [rlat, rlon] = result[result.length - 1];
  if (rlat !== lastPoint[0] || rlon !== lastPoint[1]) {
    result.push(lastPoint);
  }

  return result;
}

const weatherText = {
  0: "Clear",
  1: "Mainly clear",
  2: "Partly cloudy",
  3: "Cloudy",
  45: "Fog",
  48: "Rime fog",
  51: "Light drizzle",
  53: "Moderate drizzle",
  55: "Dense drizzle",
  61: "Slight rain",
  63: "Moderate rain",
  65: "Heavy rain",
  71: "Slight snow",
  73: "Moderate snow",
  75: "Heavy snow",
  95: "Thunderstorm",
};

export default function Map({ trip }) {
  const [points, setPoints] = useState([]);
  const [route, setRoute] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!trip) {
      setPoints([]);
      setRoute(null);
      return;
    }

    let cancelled = false;
    async function load() {
      setLoading(true);
      setError("");
      setPoints([]);
      setRoute(null);

      try {
        const speed = Number(trip.speed);
        if (!speed || speed <= 0) {
          throw new Error("⚠️ Speed must be greater than 0 km/h");
        }

        const places = [trip.from, ...(trip.stops || []), trip.to].filter(
          Boolean
        );

        const coords = [];
        for (const p of places) {
          const g = await geocode(p);
          if (!g) throw new Error(`Could not find location: ${p}`);
          coords.push(g);
          await new Promise((r) => setTimeout(r, 1000));
        }

        let startTs = Date.now();

        if (trip.departure?.type === "scheduled") {
          if (trip.departure.date && trip.departure.time) {
            const iso = `${trip.departure.date}T${trip.departure.time}:00`;
            const d = new Date(iso);
            if (!isNaN(d)) {
              startTs = d.getTime();
            } else {
              throw new Error("⚠️ Invalid scheduled date or time.");
            }
          }
        }

        const now = Date.now();
        const fifteenDaysInMillis = 15 * 24 * 3600 * 1000;

        if (startTs > now + fifteenDaysInMillis) {
          throw new Error(
            "⚠️ Cannot fetch weather more than 15 days in the future."
          );
        }

        const routeCoords = await getRoute(coords);
        if (!routeCoords) throw new Error("No route found");

        const sampled = sampleRouteByDistance(routeCoords, speed);

        const results = [];
        let currentTs = startTs;
        for (let i = 0; i < sampled.length; i++) {
          if (i > 0) {
            const distKm = haversine(sampled[i - 1], sampled[i]);
            const hours = distKm / speed;
            currentTs = currentTs + Math.round(hours * 3600 * 1000);
          }

          const [lat, lon] = sampled[i];
          const weather = await getForecastAt(lat, lon, currentTs);
          results.push({
            name: `Point ${i + 1}`,
            lat,
            lon,
            eta: new Date(currentTs).toISOString(),
            weather,
          });

          await new Promise((r) => setTimeout(r, 100));
        }

        if (!cancelled) {
          setPoints(results);
          setRoute(routeCoords);
        }
      } catch (err) {
        console.error(err);
        if (!cancelled) setError(err.message || "Failed to load route/weather");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [trip]);

  if (!trip) {
    return (
      <div className="lg:col-span-3 flex items-center justify-center h-[600px] bg-secondary rounded-xl overflow-hidden shadow">
        <p className="text-secondary-foreground">
          Enter a route and click Find Weather
        </p>
      </div>
    );
  }

  return (
    <div className="lg:col-span-3 h-[600px]">
      <div className="h-full w-full rounded-xl overflow-hidden shadow">
        {loading && (
          <div className="p-4 bg-secondary h-full flex items-center justify-center">
            <p className="inline-flex items-center text-primary">
              <LoaderCircleIcon className="animate-spin me-1 size-4" /> Loading
              route and weather…
            </p>
          </div>
        )}

        {error && (
          <div className="p-4 bg-red-50 text-red-800">Error: {error}</div>
        )}

        {points.length > 0 && (
          <MapContainer
            center={[points[0].lat, points[0].lon]}
            zoom={10}
            zoomControl={true}
            style={{ width: "100%", height: "100%" }}>
            <TileLayer
              attribution='&copy; <a href="https://osm.org">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {route && <Polyline positions={route} color="#3ab57e" weight={4} />}

            {points.map((p, i) => (
              <Marker key={i} position={[p.lat, p.lon]}>
                <Popup>
                  <div style={{ minWidth: 200 }}>
                    <h3 className="text-lg font-bold text-primary font-sans leading-none">
                      {p.name}
                    </h3>
                    <p className="text-sm leading-none text-muted-foreground font-medium">
                      ETA:{" "}
                      {new Date(p.eta).toLocaleString("en-GB", {
                        hour12: true,
                      })}
                    </p>
                    <div className="mt-4">
                      <h4 className="text-sm font-bold mb-2 font-sans leading-none">
                        Temperature: {p.weather ? `${p.weather.temp}°C` : "—"}
                      </h4>
                      <p className="text-base leading-0  text-primary font-semibold">
                        {p.weather
                          ? weatherText[p.weather.code] ||
                            `Code ${p.weather.code}`
                          : ""}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Forecast time:{" "}
                        {new Date(p.weather?.time).toLocaleString("en-GB")}
                      </p>
                    </div>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        )}

        {!loading && points.length === 0 && !error && (
          <div className="p-6 text-center text-muted-foreground">
            No route data yet — make sure you entered From and To and clicked
            Find Weather.
          </div>
        )}
      </div>
    </div>
  );
}

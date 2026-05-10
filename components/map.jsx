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

  const distanceStepKm = 10;
  const timeStepMin = 15;

  const distancePerTimeStep = (speedKmH * timeStepMin) / 60;

  const stepKm = Math.min(distanceStepKm, distancePerTimeStep);

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

  //  Show points at avg. speed by 2
  // const stepKm = speedKmH / 2;
  // const result = [routeCoords[0]];
  // let last = routeCoords[0];
  // let accumulated = 0;
  // for (let i = 1; i < routeCoords.length; i++) {
  //   const d = haversine(last, routeCoords[i]);
  //   accumulated += d;

  //   if (accumulated >= stepKm) {
  //     result.push(routeCoords[i]);
  //     accumulated = 0;
  //   }

  //   last = routeCoords[i];
  // }
  // const lastPoint = routeCoords[routeCoords.length - 1];
  // const [rlat, rlon] = result[result.length - 1];
  // if (rlat !== lastPoint[0] || rlon !== lastPoint[1]) {
  //   result.push(lastPoint);
  // }

  return result;
}

const weatherText = {
  0:  "Clear",
  1:  "Mainly clear",
  2:  "Partly cloudy",
  3:  "Cloudy",
  45: "Fog",
  48: "Rime fog",
  51: "Light drizzle",
  53: "Moderate drizzle",
  55: "Dense drizzle",
  56: "Light freezing drizzle",
  57: "Dense freezing drizzle",
  61: "Slight rain",
  63: "Moderate rain",
  65: "Heavy rain",
  66: "Light freezing rain",
  67: "Heavy freezing rain",
  71: "Slight snow",
  73: "Moderate snow",
  75: "Heavy snow",
  77: "Snow grains",
  80: "Slight rain showers",
  81: "Moderate rain showers",
  82: "Violent rain showers",
  85: "Slight snow showers",
  86: "Heavy snow showers",
  95: "Thunderstorm",
  96: "Thunderstorm with slight hail",
  99: "Thunderstorm with heavy hail",
};

const weatherEmoji = {
  0:  "☀️",
  1:  "🌤️",
  2:  "⛅",
  3:  "☁️",
  45: "🌫️",
  48: "🌫️",
  51: "🌦️",
  53: "🌦️",
  55: "🌦️",
  56: "🌨️",
  57: "🌨️",
  61: "🌧️",
  63: "🌧️",
  65: "🌧️",
  66: "🌧️",
  67: "🌧️",
  71: "❄️",
  73: "❄️",
  75: "❄️",
  77: "🌨️",
  80: "🌧️",
  81: "🌧️",
  82: "🌧️",
  85: "🌨️",
  86: "🌨️",
  95: "⛈️",
  96: "⛈️",
  99: "⛈️",
};

function createWeatherIcon(code, tempC) {
  const emoji = weatherEmoji[code] ?? "🌡️";
  const temp  = tempC != null ? `${Math.round(tempC)}°C` : "";
  const html = `
    <div style="
      display:flex;flex-direction:column;align-items:center;
      background:white;border-radius:12px;
      padding:4px 7px;box-shadow:0 2px 6px rgba(0,0,0,0.25);
      border:1.5px solid #e2e8f0;white-space:nowrap;
      font-family:sans-serif;line-height:1;
    ">
      <span style="font-size:20px;line-height:1.2">${emoji}</span>
      <span style="font-size:10px;font-weight:600;color:#334155;margin-top:2px">${temp}</span>
    </div>
    <div style="
      width:0;height:0;margin:0 auto;
      border-left:6px solid transparent;
      border-right:6px solid transparent;
      border-top:7px solid #e2e8f0;
    "></div>`;
  return L.divIcon({
    html,
    className: "",
    iconSize: [52, 54],
    iconAnchor: [26, 54],
    popupAnchor: [0, -56],
  });
}

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

        const allPlaceNames = [trip.from, ...(trip.stops || []), trip.to].filter(Boolean);
        const allCoords = [trip.fromCoord, ...(trip.stopCoords || []), trip.toCoord];

        const coords = [];
        for (let i = 0; i < allPlaceNames.length; i++) {
          const preResolved = allCoords[i];
          if (preResolved && typeof preResolved.lat === "number") {
            // Already resolved via autocomplete — use directly, no API call needed
            coords.push({ name: allPlaceNames[i], lat: preResolved.lat, lon: preResolved.lon });
          } else {
            // Fall back to geocode API (e.g. URL-loaded trip without autocomplete selection)
            const g = await geocode(allPlaceNames[i]);
            if (!g) throw new Error(`Could not find location: ${allPlaceNames[i]}`);
            coords.push(g);
            await new Promise((r) => setTimeout(r, 1000));
          }
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

        // Build a label lookup: for each sampled point find if it's near a key waypoint
        const lastIdx = sampled.length - 1;

        // Helper: short display name (first segment before the first comma)
        const shortName = (full) => full?.split(",")[0]?.trim() || full;

        // Pre-compute the closest sampled index for each coord waypoint (stop detection)
        const waypointLabels = {};
        coords.forEach((c, wi) => {
          let best = 0;
          let bestDist = Infinity;
          for (let si = 0; si < sampled.length; si++) {
            const d = haversine(sampled[si], [c.lat, c.lon]);
            if (d < bestDist) { bestDist = d; best = si; }
          }
          // Only mark as a stop if it's actually close (within 5 km)
          if (bestDist < 5) waypointLabels[best] = wi;
        });

        const results = [];
        let currentTs = startTs;
        let intermediateCount = 0;
        for (let i = 0; i < sampled.length; i++) {
          if (i > 0) {
            const distKm = haversine(sampled[i - 1], sampled[i]);
            const hours = distKm / speed;
            currentTs = currentTs + Math.round(hours * 3600 * 1000);
          }

          const [lat, lon] = sampled[i];
          const weather = await getForecastAt(lat, lon, currentTs);

          // Determine label
          let name;
          if (i === 0) {
            name = `📍 ${shortName(trip.from)}`;
          } else if (i === lastIdx) {
            name = `🏁 ${shortName(trip.to)}`;
          } else if (waypointLabels[i] !== undefined) {
            const wi = waypointLabels[i];
            const isStop = wi > 0 && wi < coords.length - 1;
            if (isStop) {
              const stopNum = wi; // stop index (1-based among stops)
              name = `🛑 Stop ${stopNum} — ${shortName(coords[wi].name)}`;
            } else {
              intermediateCount++;
              name = `Point ${intermediateCount}`;
            }
          } else {
            intermediateCount++;
            name = `Point ${intermediateCount}`;
          }

          results.push({
            name,
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
    <div className="lg:col-span-3 h-[600px]" id="map-container">
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
              <Marker
                key={i}
                position={[p.lat, p.lon]}
                icon={createWeatherIcon(p.weather?.code, p.weather?.temp)}
              >
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

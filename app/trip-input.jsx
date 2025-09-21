"use client";

import InputCard from "@/components/input-card";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function TripInput() {
  const router = useRouter();
  const [trip, setTrip] = useState({
    from: "",
    to: "",
    stops: [],
    departure: { type: "now", date: "", time: "" },
    speed: 60,
  });

  const searchParams = useSearchParams();
  useEffect(() => {
    if (!searchParams) return;

    const from = searchParams.get("from") || "";
    const to = searchParams.get("to") || "";
    const stops = searchParams.getAll("stops") || [];
    const speed = searchParams.get("speed") || "normal";
    const departureType = searchParams.get("departureType") || "now";
    const date = searchParams.get("date") || "";
    const time = searchParams.get("time") || "";

    setTrip({
      from,
      to,
      stops,
      speed,
      departure: { type: departureType, date, time },
    });
  }, [searchParams]);

  const handleFindAndSyncURL = () => {
    setSubmittedTrip({ ...trip });

    const params = new URLSearchParams();
    if (trip.from) params.set("from", trip.from);
    if (trip.to) params.set("to", trip.to);
    if (trip.speed) params.set("speed", String(trip.speed));
    if (trip.departure.type) params.set("departureType", trip.departure.type);
    if (trip.departure.type === "scheduled") {
      if (trip.departure.date) params.set("date", trip.departure.date);
      if (trip.departure.time) params.set("time", trip.departure.time);
    }
    trip.stops.forEach((stop) => {
      if (stop) params.append("stops", stop);
    });

    router.push(`?${params.toString()}`);
  };

  return (
    <InputCard trip={trip} setTrip={setTrip} onFind={handleFindAndSyncURL} />
  );
}

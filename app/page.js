"use client";

import InputCard from "@/components/input-card";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

const Map = dynamic(() => import("@/components/map"), { ssr: false });

export default function Home() {
  const [trip, setTrip] = useState({
    from: "",
    to: "",
    stops: [],
    departure: { type: "now", date: "", time: "" },
    speed: 60,
  });

  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const fromParam = searchParams.get("from") || "";
    const toParam = searchParams.get("to") || "";
    const speedParam = searchParams.get("speed") || "";
    const departureType = searchParams.get("departureType") || "now";
    const dateParam = searchParams.get("date") || "";
    const timeParam = searchParams.get("time") || "";
    const stopsParam = searchParams.getAll("stops");

    setTrip({
      from: fromParam,
      to: toParam,
      speed: speedParam,
      stops: stopsParam,
      departure: {
        type: departureType,
        date: dateParam,
        time: timeParam,
      },
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

  const [submittedTrip, setSubmittedTrip] = useState(null);

  return (
    <section className="min-h-screen font-sans px-4 py-6">
      <div className="container mx-auto max-w-7xl grid gap-4 lg:grid-cols-5 xl:grid-cols-5">
        <InputCard
          trip={trip}
          setTrip={setTrip}
          onFind={handleFindAndSyncURL}
        />
        <Map trip={submittedTrip} />
      </div>
    </section>
  );
}

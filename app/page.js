"use client";

import InputCard from "@/components/input-card";
import dynamic from "next/dynamic";
// import Map from "@/components/map";
import { useState } from "react";

const Map = dynamic(() => import("@/components/map"), { ssr: false });

export default function Home() {
  const [trip, setTrip] = useState({
    from: "",
    to: "",
    stops: [],
    departure: { type: "now", date: "", time: "" },
    speed: 60,
  });

  const [submittedTrip, setSubmittedTrip] = useState(null);

  return (
    <section className="min-h-screen font-sans px-4 py-6">
      <div className="container mx-auto max-w-7xl grid gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        <InputCard
          trip={trip}
          setTrip={setTrip}
          onFind={() => setSubmittedTrip({ ...trip })}
        />
        <Map trip={submittedTrip} />
      </div>
    </section>
  );
}

"use client";

import dynamic from "next/dynamic";
import { useState, Suspense } from "react";
import TripInput from "./trip-input";

const Map = dynamic(() => import("@/components/map"), { ssr: false });

export default function Home() {
  // useEffect(() => {
  //   const fromParam = searchParams.get("from") || "";
  //   const toParam = searchParams.get("to") || "";
  //   const speedParam = searchParams.get("speed") || "";
  //   const departureType = searchParams.get("departureType") || "now";
  //   const dateParam = searchParams.get("date") || "";
  //   const timeParam = searchParams.get("time") || "";
  //   const stopsParam = searchParams.getAll("stops");

  //   setTrip({
  //     from: fromParam,
  //     to: toParam,
  //     speed: speedParam,
  //     stops: stopsParam,
  //     departure: {
  //       type: departureType,
  //       date: dateParam,
  //       time: timeParam,
  //     },
  //   });
  // }, [searchParams]);

  const [submittedTrip, setSubmittedTrip] = useState(null);

  return (
    <section className="min-h-screen font-sans px-4 py-6">
      <div className="container mx-auto max-w-7xl grid gap-4 lg:grid-cols-5 xl:grid-cols-5">
        <Suspense fallback={<div>Loading...</div>}>
          <TripInput />
        </Suspense>
        <Map trip={submittedTrip} />
      </div>
    </section>
  );
}

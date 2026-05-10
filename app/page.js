"use client";

import dynamic from "next/dynamic";
import { useState, Suspense } from "react";
import TripInput from "./trip-input";
import { Card, CardContent } from "@/components/ui/card";
import { ShieldCheck, CloudRain, Clock, Navigation } from "lucide-react";
import Link from "next/link";

const Map = dynamic(() => import("@/components/map"), { ssr: false });

export default function Home() {
  const [submittedTrip, setSubmittedTrip] = useState(null);

  return (
    <main className="min-h-screen font-sans bg-background selection:bg-primary/20">
      <section className="px-4 pt-12 pb-20">
        <div className="container mx-auto max-w-7xl grid grid-cols-1 gap-8 lg:grid-cols-5">
          <Suspense fallback={<div>Loading...</div>}>
            <TripInput setSubmittedTrip={setSubmittedTrip} />
          </Suspense>
          <Map trip={submittedTrip} />
        </div>
      </section>

      {/* High-Value Content Sections */}
      <section className="bg-secondary/30 border-y border-border/50 py-24">
        <div className="container mx-auto max-w-7xl px-6 space-y-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold tracking-wider uppercase">
                Why PathWeather?
              </div>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
                Plan Smarter. <br />
                <span className="text-muted-foreground">Drive Safer.</span>
              </h2>
              <p className="text-xl text-muted-foreground leading-relaxed font-medium">
                Standard weather apps tell you what the weather is *now*. PathWeather tells you what it will be *then* — exactly when you arrive at each waypoint.
              </p>
              <div className="pt-4 flex flex-wrap gap-4">
                <Link href="/weather-guide" className="px-6 py-3 rounded-full bg-primary text-primary-foreground font-bold hover:bg-primary/90 transition-all shadow-md shadow-primary/20">
                  Read the Guide
                </Link>
                <Link href="/about" className="px-6 py-3 rounded-full bg-background border border-border font-bold hover:bg-secondary transition-all">
                  About the App
                </Link>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              {[
                { icon: ShieldCheck, title: "Safety First", desc: "Avoid dangerous conditions before they start." },
                { icon: CloudRain, title: "Live Forecasts", desc: "Latest data from global weather models." },
                { icon: Clock, title: "ETA Sync", desc: "Forecasts mapped to your arrival time." },
                { icon: Navigation, title: "Multi-Stop", desc: "Complex journey planning made easy." }
              ].map((item, i) => (
                <Card key={i} className="group p-8 border-none shadow-sm hover:shadow-xl transition-all duration-500">
                  <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                    <item.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </Card>
              ))}
            </div>
          </div>

          <div className="space-y-12">
            <div className="text-center space-y-4 max-w-3xl mx-auto">
              <h2 className="text-4xl font-bold tracking-tight">Essential Safety Tips</h2>
              <p className="text-xl text-muted-foreground">
                Our tool helps you plan, but safe driving requires more than just knowing the weather.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { 
                  title: "Pre-Trip Inspection", 
                  content: "Check your tire pressure, fluid levels, and lights. A well-maintained vehicle is your first line of defense against unexpected weather changes."
                },
                { 
                  title: "Emergency Essentials", 
                  content: "Always carry water, first-aid kits, and blankets. If heading into snow regions, include a small shovel and traction mats in your trunk."
                },
                { 
                  title: "Listen to the Road", 
                  content: "If visibility drops or the road feels unsafe, don't push through. Find the nearest safe stop and wait for conditions to improve."
                }
              ].map((tip, i) => (
                <div key={i} className="group p-1">
                  <div className="h-full p-8 rounded-3xl bg-background border border-border/50 group-hover:border-primary/30 transition-colors duration-500">
                    <div className="text-5xl font-black text-primary/10 mb-6 group-hover:text-primary/20 transition-colors">0{i+1}</div>
                    <h3 className="font-bold text-xl mb-4 text-foreground">{tip.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{tip.content}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

"use client";

import { Clock, MapPin, Plus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

export default function InputCard({ trip, setTrip, onFind }) {
  const addStop = () =>
    setTrip({ ...trip, stops: [...(trip.stops || []), ""] });

  const updateStop = (i, value) => {
    const s = [...(trip.stops || [])];
    s[i] = value;
    setTrip({ ...trip, stops: s });
  };

  const removeStop = (i) =>
    setTrip({
      ...trip,
      stops: (trip.stops || []).filter((_, idx) => idx !== i),
    });

  const speedNum = Number(trip.speed);
  const speedInvalid = !Number.isFinite(speedNum) || speedNum <= 0;
  const routeInvalid = !trip.from?.trim() || !trip.to?.trim();

  return (
    <div className="space-y-6 xl:col-span-2">
      <div className="space-y-2">
        <h1 className="text-2xl lg:text-3xl font-bold">Plan Smarter Trips</h1>
        <p className="lg:text-lg text-muted-foreground">
          Map your journey and know the forecast before you go
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" /> Route Details
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="from">From</Label>
            <Input
              id="from"
              value={trip.from}
              onChange={(e) => setTrip({ ...trip, from: e.target.value })}
              placeholder="Enter departure location"
            />
          </div>

          {(trip.stops || []).map((stop, i) => (
            <div key={i} className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Stop {i + 1}</Label>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeStop(i)}
                  className="text-destructive">
                  Remove
                </Button>
              </div>
              <Input
                value={stop}
                onChange={(e) => updateStop(i, e.target.value)}
                placeholder="Enter stop location"
              />
            </div>
          ))}

          <Button variant="outline" onClick={addStop} className="w-full">
            <Plus className="h-4 w-4" /> Add Stop
          </Button>

          <div className="space-y-2">
            <Label htmlFor="to">To</Label>
            <Input
              id="to"
              value={trip.to}
              onChange={(e) => setTrip({ ...trip, to: e.target.value })}
              placeholder="Enter destination"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" /> Departure Time
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="flex gap-4">
            <Button
              variant={trip.departure.type === "now" ? "default" : "outline"}
              onClick={() =>
                setTrip({
                  ...trip,
                  departure: { type: "now", date: "", time: "" },
                })
              }
              className="flex-1">
              Leave Now
            </Button>

            <Button
              variant={
                trip.departure.type === "scheduled" ? "default" : "outline"
              }
              onClick={() =>
                setTrip({
                  ...trip,
                  departure: { ...trip.departure, type: "scheduled" },
                })
              }
              className="flex-1">
              Schedule
            </Button>
          </div>

          {trip.departure.type === "scheduled" && (
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Date</Label>
                <Input
                  type="date"
                  value={trip.departure.date}
                  onChange={(e) =>
                    setTrip({
                      ...trip,
                      departure: { ...trip.departure, date: e.target.value },
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>Time</Label>
                <Input
                  type="time"
                  value={trip.departure.time}
                  onChange={(e) =>
                    setTrip({
                      ...trip,
                      departure: { ...trip.departure, time: e.target.value },
                    })
                  }
                />
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Preferences</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Average Speed (km/h)</Label>
            <Input
              type="number"
              min="1"
              step="1"
              value={trip.speed ?? 60}
              onChange={(e) => {
                const value =
                  e.target.value === "" ? "" : parseFloat(e.target.value);
                setTrip({ ...trip, speed: value });
              }}
            />
            {speedInvalid && (
              <p className="text-sm text-destructive mt-1">
                Average speed must be a positive number greater than 0.
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      <Button
        onClick={onFind}
        className="w-full"
        size="lg"
        disabled={speedInvalid || routeInvalid}>
        Find Weather
      </Button>
    </div>
  );
}

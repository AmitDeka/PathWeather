"use client";

import { Clock, MapPin, Plus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import LocationInput from "./location-input";

export default function InputCard({ trip, setTrip, onFind }) {
  const addStop = () =>
    setTrip({ ...trip, stops: [...(trip.stops || []), ""], stopCoords: [...(trip.stopCoords || []), null] });

  const updateStop = (i, value) => {
    const s = [...(trip.stops || [])];
    s[i] = value;
    setTrip({ ...trip, stops: s });
  };

  const updateStopCoord = (i, coord) => {
    const sc = [...(trip.stopCoords || [])];
    sc[i] = coord;
    setTrip({ ...trip, stopCoords: sc });
  };

  const removeStop = (i) => {
    const stops = (trip.stops || []).filter((_, idx) => idx !== i);
    const stopCoords = (trip.stopCoords || []).filter((_, idx) => idx !== i);
    setTrip({ ...trip, stops, stopCoords });
  };

  const speedNum = Number(trip.speed);
  const speedInvalid = !Number.isFinite(speedNum) || speedNum <= 0;
  const routeInvalid = !trip.from?.trim() || !trip.to?.trim();

  const today = new Date();
  const todayString = today.toLocaleDateString("en-CA");
  const fifteenDaysFromNow = new Date();
  fifteenDaysFromNow.setDate(today.getDate() + 15);
  const maxDateString = fifteenDaysFromNow.toLocaleDateString("en-CA");

  return (
    <div className="space-y-6 lg:col-span-2">
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
            <LocationInput
              id="from"
              value={trip.from}
              placeholder="Enter departure location"
              onChange={(text) => setTrip((prev) => ({ ...prev, from: text, fromCoord: null }))}
              onSelect={(coord) => setTrip((prev) => ({ ...prev, fromCoord: coord }))}
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
              <LocationInput
                value={stop}
                placeholder="Enter stop location"
                onChange={(text) =>
                  setTrip((prev) => {
                    const s = [...(prev.stops || [])];
                    s[i] = text;
                    return { ...prev, stops: s };
                  })
                }
                onSelect={(coord) =>
                  setTrip((prev) => {
                    const sc = [...(prev.stopCoords || [])];
                    sc[i] = coord;
                    return { ...prev, stopCoords: sc };
                  })
                }
              />
            </div>
          ))}

          <Button variant="outline" onClick={addStop} className="w-full">
            <Plus className="h-4 w-4" /> Add Stop
          </Button>

          <div className="space-y-2">
            <Label htmlFor="to">To</Label>
            <LocationInput
              id="to"
              value={trip.to}
              placeholder="Enter destination"
              onChange={(text) => setTrip((prev) => ({ ...prev, to: text, toCoord: null }))}
              onSelect={(coord) => setTrip((prev) => ({ ...prev, toCoord: coord }))}
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
                <Label htmlFor="deptDate">Date</Label>
                <input
                  id="deptDate"
                  type="date"
                  value={trip.departure.date}
                  min={todayString}
                  max={maxDateString}
                  className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                  onChange={(e) => {
                    const selectedDate = e.target.value;
                    const today = new Date().toISOString().split("T")[0];
                    const currentTime = new Date().toISOString().slice(11, 16);

                    let fixedTime = trip.departure.time;
                    if (
                      selectedDate === today &&
                      fixedTime &&
                      fixedTime < currentTime
                    ) {
                      fixedTime = "";
                    }

                    setTrip({
                      ...trip,
                      departure: {
                        ...trip.departure,
                        date: selectedDate,
                        time: fixedTime,
                      },
                    });
                  }}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="deptTime">Time</Label>
                <input
                  id="deptTime"
                  type="time"
                  value={trip.departure.time}
                  min={
                    trip.departure.date === todayString
                      ? new Date().toLocaleTimeString("en-GB", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })
                      : "00:00"
                  }
                  max="23:59"
                  className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                  onChange={(e) => {
                    const selectedTime = e.target.value;
                    const today = new Date().toISOString().split("T")[0];
                    const currentTime = new Date().toISOString().slice(11, 16);

                    if (
                      trip.departure.date === today &&
                      selectedTime < currentTime
                    ) {
                      alert("You cannot select a past time for today");
                      return;
                    }

                    setTrip({
                      ...trip,
                      departure: { ...trip.departure, time: selectedTime },
                    });
                  }}
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
            <Label htmlFor="speed">Average Speed (km/h)</Label>
            <input
              id="speed"
              type="number"
              min="1"
              step="1"
              value={trip.speed ?? 60}
              className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
              onChange={(e) => {
                const raw = e.target.value;
                const value = raw === "" ? null : parseFloat(raw);
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

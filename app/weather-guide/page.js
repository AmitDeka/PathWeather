import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CloudRain, Snowflake, Wind, EyeOff, AlertTriangle } from "lucide-react";

export const metadata = {
  title: "Safe Driving Weather Guide | PathWeather",
  description: "Learn how to stay safe while driving in rain, snow, fog, and wind with our comprehensive guide.",
};

export default function WeatherGuide() {
  return (
    <main className="container mx-auto max-w-5xl px-6 py-20 min-h-screen space-y-24">
      <div className="text-center space-y-6 max-w-3xl mx-auto">
        <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold tracking-wider uppercase">
          Educational Resource
        </div>
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-foreground">Safe Driving Guide</h1>
        <p className="text-xl text-muted-foreground leading-relaxed">
          Knowledge is your best safety feature. Understand how different weather conditions affect your vehicle and how to respond effectively.
        </p>
      </div>

      <div className="grid gap-12">
        {/* Rain and Hydroplaning */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 items-start">
          <div className="md:col-span-2 space-y-4">
            <div className="h-16 w-16 rounded-3xl bg-blue-500/10 flex items-center justify-center">
              <CloudRain className="h-8 w-8 text-blue-500" />
            </div>
            <h2 className="text-3xl font-bold">Heavy Rain</h2>
            <p className="text-muted-foreground leading-relaxed">
              Rain reduces visibility and traction, making control more difficult and increasing stopping distances.
            </p>
          </div>
          <Card className="md:col-span-3 p-8 border-none bg-secondary/30">
            <h3 className="text-xl font-bold mb-4">The Danger of Hydroplaning</h3>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Hydroplaning occurs when a layer of water builds up between the wheels and the road surface, leading to a loss of traction.
            </p>
            <ul className="space-y-4">
              {[
                { title: "Slow Down", desc: "Most hydroplaning occurs at speeds above 55 km/h." },
                { title: "Avoid Standing Water", desc: "Drive in the tracks of the car in front of you." },
                { title: "Don't Panic", desc: "Take your foot off the gas but do not hit the brakes suddenly." }
              ].map((item, i) => (
                <li key={i} className="flex gap-4">
                  <div className="h-6 w-6 rounded-full bg-primary/20 flex-shrink-0 flex items-center justify-center text-[10px] font-bold text-primary">0{i+1}</div>
                  <div>
                    <span className="font-bold text-foreground">{item.title}:</span> <span className="text-muted-foreground">{item.desc}</span>
                  </div>
                </li>
              ))}
            </ul>
          </Card>
        </div>

        <div className="h-[1px] bg-border/50" />

        {/* Snow and Ice */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 items-start">
          <div className="md:col-span-2 space-y-4">
            <div className="h-16 w-16 rounded-3xl bg-slate-500/10 flex items-center justify-center">
              <Snowflake className="h-8 w-8 text-slate-500" />
            </div>
            <h2 className="text-3xl font-bold">Snow & Ice</h2>
            <p className="text-muted-foreground leading-relaxed">
              Winter conditions require extreme caution as traction can be virtually non-existent on icy surfaces.
            </p>
          </div>
          <Card className="md:col-span-3 p-8 border-none bg-secondary/30">
            <h3 className="text-xl font-bold mb-4">Traction and Braking</h3>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Snow and ice can increase braking distances by up to ten times compared to dry pavement.
            </p>
            <ul className="space-y-4">
              {[
                { title: "Following Distance", desc: "Give yourself at least 8-10 seconds of space." },
                { title: "Threshold Braking", desc: "Press firmly and don't pump the brakes if you have ABS." },
                { title: "Watch for Black Ice", desc: "Bridges and overpasses freeze faster than normal roads." }
              ].map((item, i) => (
                <li key={i} className="flex gap-4">
                  <div className="h-6 w-6 rounded-full bg-primary/20 flex-shrink-0 flex items-center justify-center text-[10px] font-bold text-primary">0{i+1}</div>
                  <div>
                    <span className="font-bold text-foreground">{item.title}:</span> <span className="text-muted-foreground">{item.desc}</span>
                  </div>
                </li>
              ))}
            </ul>
          </Card>
        </div>

        <div className="h-[1px] bg-border/50" />

        {/* High Winds */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 items-start">
          <div className="md:col-span-2 space-y-4">
            <div className="h-16 w-16 rounded-3xl bg-amber-600/10 flex items-center justify-center">
              <Wind className="h-8 w-8 text-amber-600" />
            </div>
            <h2 className="text-3xl font-bold">High Winds</h2>
            <p className="text-muted-foreground leading-relaxed">
              Wind gusts can push vehicles out of their lane, especially high-profile trucks and SUVs.
            </p>
          </div>
          <Card className="md:col-span-3 p-8 border-none bg-secondary/30">
            <h3 className="text-xl font-bold mb-4">Impact on Stability</h3>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Keep both hands on the wheel and be ready for sudden gusts that can push your vehicle.
            </p>
            <ul className="space-y-4">
              {[
                { title: "Steady Hands", desc: "Anticipate the push and pull of the wind." },
                { title: "Give Space", desc: "Large vehicles are more susceptible to wind gusts." },
                { title: "Watch for Debris", desc: "Winds can blow branches or litter into your path." }
              ].map((item, i) => (
                <li key={i} className="flex gap-4">
                  <div className="h-6 w-6 rounded-full bg-primary/20 flex-shrink-0 flex items-center justify-center text-[10px] font-bold text-primary">0{i+1}</div>
                  <div>
                    <span className="font-bold text-foreground">{item.title}:</span> <span className="text-muted-foreground">{item.desc}</span>
                  </div>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </div>

      <Card className="bg-primary text-primary-foreground p-12 rounded-3xl border-none shadow-2xl shadow-primary/20">
        <div className="flex flex-col md:flex-row items-center gap-10">
          <div className="h-20 w-20 rounded-full bg-white/20 flex items-center justify-center shrink-0">
            <AlertTriangle className="h-10 w-10 text-white" />
          </div>
          <div className="space-y-4 text-center md:text-left">
            <h2 className="text-3xl font-bold tracking-tight">The Golden Rule: If in Doubt, Stop.</h2>
            <p className="text-lg opacity-90 leading-relaxed">
              No destination is worth your safety. Use PathWeather to find the nearest town or rest area and wait for conditions to improve. Your life is more important than your schedule.
            </p>
          </div>
        </div>
      </Card>
    </main>
  );
}

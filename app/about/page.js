import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Info, Map as MapIcon, Cloud, HelpCircle } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export const metadata = {
  title: "About Us | PathWeather",
  description: "Learn more about PathWeather, our mission, and find answers to frequently asked questions.",
};

export default function AboutUs() {
  return (
    <main className="container mx-auto max-w-4xl px-4 py-12 min-h-screen">
      <Card className="shadow-lg border-none bg-card/50 backdrop-blur-sm">
        <CardHeader className="text-center pb-8 border-b">
          <CardTitle className="text-4xl font-bold tracking-tight">About PathWeather</CardTitle>
          <p className="text-muted-foreground mt-2">Your companion for safe and informed travel.</p>
        </CardHeader>
        <CardContent className="space-y-12 pt-8">
          <section className="grid gap-6 md:grid-cols-3">
            <div className="flex flex-col items-center text-center p-4">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <MapIcon className="text-primary h-6 w-6" />
              </div>
              <h3 className="font-bold text-lg">Smart Routing</h3>
              <p className="text-sm text-muted-foreground">Find the best path with multiple stops supported.</p>
            </div>
            <div className="flex flex-col items-center text-center p-4">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Cloud className="text-primary h-6 w-6" />
              </div>
              <h3 className="font-bold text-lg">Precise Weather</h3>
              <p className="text-sm text-muted-foreground">Real-time weather data at every stage of your trip.</p>
            </div>
            <div className="flex flex-col items-center text-center p-4">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Info className="text-primary h-6 w-6" />
              </div>
              <h3 className="font-bold text-lg">ETA Aware</h3>
              <p className="text-sm text-muted-foreground">Forecasts are timed exactly to when you'll be there.</p>
            </div>
          </section>

          <section className="prose prose-slate dark:prose-invert max-w-none text-foreground/80 leading-relaxed">
            <h2 className="text-2xl font-semibold text-foreground">Our Mission</h2>
            <p>
              Travel planning often misses one crucial detail: how the weather changes as you move. A sunny start can lead to a snowy mountain pass hours later. PathWeather was created to solve this problem by providing a granular, time-aware weather forecast along your entire driving route.
            </p>
            <p>
              By combining high-quality routing data with precise meteorological forecasts, we help you make informed decisions about when to leave, which path to take, and what to expect on the road.
            </p>
          </section>

          <section className="space-y-6">
            <div className="flex items-center gap-2 border-b pb-2">
              <HelpCircle className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>
            </div>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>How accurate is the weather data?</AccordionTrigger>
                <AccordionContent>
                  We use the Open-Meteo API, which aggregates data from global weather models (GFS, ECMWF, ICON). While highly accurate, weather is inherently unpredictable; we recommend checking official local forecasts for critical travel decisions.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>Does it account for traffic delays?</AccordionTrigger>
                <AccordionContent>
                  Currently, we calculate ETAs based on your provided average speed and the shortest route. Real-time traffic isn't factored in yet, but it's a feature we are looking to implement in the future.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>Can I plan trips more than 15 days in advance?</AccordionTrigger>
                <AccordionContent>
                  No, weather models are only reliable for up to 15 days. Beyond that, the data becomes statistically insignificant for precise planning.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger>Is PathWeather free to use?</AccordionTrigger>
                <AccordionContent>
                  Yes! PathWeather is a free tool. We support our development and hosting costs through minimal, non-intrusive advertising.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </section>
        </CardContent>
      </Card>
    </main>
  );
}

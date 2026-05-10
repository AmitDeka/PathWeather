import { GoogleAnalytics } from "@next/third-parties/google";
import Script from "next/script";
import { Raleway, Merienda } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/global/navbar";
import { Footer } from "@/components/global/footer";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { ThemeProvider } from "./utils/theme-provider";
import CookieConsent from "@/components/cookie-consent";

const meriendaCursiv = Merienda({
  variable: "--font-merienda-cursiv",
  weight: ["700"],
});

const raleway = Raleway({
  variable: "--font-raleway-sans",
  subsets: ["latin"],
  preload: true,
  weight: ["400", "500", "600", "700"],
});

export const metadata = {
  title: "PathWeather | Weather Forecasts Along Your Driving Route",
  description:
    "Plan smarter road trips. Get weather forecasts for every point along your journey. Avoid rain, snow, and storms with our interactive driving weather map.",
  keywords: "driving weather, road trip planner, route weather, weather along path, trip weather forecast, PathWeather",
  openGraph: {
    title: "PathWeather | Weather Forecasts Along Your Driving Route",
    description:
      "Plan smarter road trips. Enter your start, end, and stops to get a weather forecast for every point along your journey.",
    url: "https://path-weather.vercel.app",
    siteName: "PathWeather",
    images: [
      {
        url: "https://path-weather.vercel.app/PathWeather.jpg",
        width: 1200,
        height: 630,
        alt: "PathWeather Driving Forecast",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PathWeather | Weather Forecasts Along Your Driving Route",
    description:
      "Plan smarter road trips. Enter your start, end, and stops to get a weather forecast for every point along your journey.",
    images: ["https://path-weather.vercel.app/PathWeather.jpg"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${meriendaCursiv.variable} ${raleway.variable} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Navbar />
          {children}
          <CookieConsent />
          <SpeedInsights />
          <Footer />
        </ThemeProvider>
      </body>
      <GoogleAnalytics gaId="G-JCS9ESZPXP" />
      <Script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1410161371665210"
        crossOrigin="anonymous"
        strategy="afterInteractive"
      />
    </html>
  );
}

import { GoogleAnalytics } from "@next/third-parties/google";
import { Raleway, Merienda } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/global/navbar";
import { Footer } from "@/components/global/footer";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { ThemeProvider } from "./utils/theme-provider";

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
  title: "PathWeather || Get Forecasts Along Your Driving Route",
  description:
    "Plan smarter road trips. Enter your start, end, and stops to get a weather forecast for every point along your journey. Avoid rain and snow with our driving weather map.",
  openGraph: {
    title: "PathWeather || Get Forecasts Along Your Driving Route",
    description:
      "Plan smarter road trips. Enter your start, end, and stops to get a weather forecast for every point along your journey.",
    url: "https://path-weather.vercel.app/",
    siteName: "PathWeather",
    images: [
      {
        url: "/PathWeather.jpg",
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
    title: "PathWeather || Get Forecasts Along Your Driving Route",
    description:
      "Plan smarter road trips. Enter your start, end, and stops to get a weather forecast for every point along your journey.",
    images: ["/PathWeather.jpg"],
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
          <SpeedInsights />
          <Footer />
        </ThemeProvider>
      </body>
      <GoogleAnalytics gaId="G-JCS9ESZPXP" />
    </html>
  );
}

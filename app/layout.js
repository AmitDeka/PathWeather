import { Raleway, Merienda } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/global/navbar";
import { Footer } from "@/components/global/footer";
import { Analytics } from "@vercel/analytics/next";
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
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${meriendaCursiv.variable} ${raleway.variable} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Navbar />
          {children}
          <Analytics />
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}

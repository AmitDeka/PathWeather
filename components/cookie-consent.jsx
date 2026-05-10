"use client";

import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import Link from "next/link";
import { X } from "lucide-react";

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const accept = () => {
    localStorage.setItem("cookie-consent", "true");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 left-6 right-6 z-50 flex justify-center pointer-events-none">
      <Card className="max-w-2xl w-full p-4 shadow-2xl border-primary/20 bg-card/95 backdrop-blur-md pointer-events-auto animate-in slide-in-from-bottom-10">
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <div className="flex-1 text-center sm:text-left">
            <h3 className="font-bold text-lg leading-none mb-2">Cookies & Privacy</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              We use cookies to improve your experience and show relevant ads via Google AdSense. 
              By using our site, you agree to our <Link href="/privacy" className="text-primary hover:underline font-medium">Privacy Policy</Link>.
            </p>
          </div>
          <div className="flex gap-2 shrink-0">
            <Button variant="outline" size="sm" onClick={() => setIsVisible(false)}>
              Decline
            </Button>
            <Button size="sm" onClick={accept}>
              Accept All
            </Button>
          </div>
          <button 
            onClick={() => setIsVisible(false)}
            className="absolute top-2 right-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </Card>
    </div>
  );
}

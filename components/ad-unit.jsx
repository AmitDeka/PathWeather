"use client";

import { useEffect, useRef } from "react";

/**
 * AdUnit — renders a single Google AdSense ad slot.
 *
 * Props:
 *   slot       – Ad slot ID from your AdSense dashboard (required)
 *   format     – "auto" | "rectangle" | "horizontal" | "vertical"  (default: "auto")
 *   responsive – whether to use data-full-width-responsive (default: true)
 *   className  – optional wrapper class
 *
 * Usage:
 *   <AdUnit slot="1234567890" format="horizontal" />
 */
export default function AdUnit({
  slot,
  format = "auto",
  responsive = true,
  className = "",
}) {
  const adRef = useRef(null);
  const pushed = useRef(false);

  useEffect(() => {
    if (pushed.current) return;
    try {
      const adsbygoogle = window.adsbygoogle || [];
      adsbygoogle.push({});
      pushed.current = true;
    } catch (e) {
      console.error("AdSense error:", e);
    }
  }, []);

  return (
    <div className={className}>
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-1410161371665210"
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive ? "true" : "false"}
      />
    </div>
  );
}

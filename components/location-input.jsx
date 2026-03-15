"use client";

import { useEffect, useRef, useState } from "react";
import { Input } from "./ui/input";
import { LoaderCircleIcon } from "lucide-react";

/**
 * LocationInput
 *
 * Props:
 *  id         – forwarded to <Input>
 *  value      – controlled text value
 *  onChange   – (text: string) => void  — called whenever the raw text changes
 *  onSelect   – ({ name, displayName, lat, lon }) => void — called when user picks a suggestion
 *  placeholder
 */
export default function LocationInput({
  id,
  value,
  onChange,
  onSelect,
  placeholder,
}) {
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const debounceRef = useRef(null);
  const containerRef = useRef(null);
  const activeRequestRef = useRef(0);

  // Fetch suggestions whenever value changes (debounced 350 ms)
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    if (!value || value.trim().length < 2) {
      activeRequestRef.current++; // invalidate any in-flight fetch
      setSuggestions([]);
      setOpen(false);
      setLoading(false);
      return;
    }

    debounceRef.current = setTimeout(async () => {
      const requestId = ++activeRequestRef.current;
      setLoading(true);
      try {
        const res = await fetch(
          `/api/geocode?place=${encodeURIComponent(value.trim())}&limit=5`
        );
        if (!res.ok) throw new Error("fetch failed");
        const data = await res.json();
        if (requestId !== activeRequestRef.current) return; // stale
        if (Array.isArray(data) && data.length > 0) {
          setSuggestions(data);
          setOpen(true);
        } else {
          setSuggestions([]);
          setOpen(false);
        }
      } catch {
        if (requestId === activeRequestRef.current) {
          setSuggestions([]);
          setOpen(false);
        }
      } finally {
        if (requestId === activeRequestRef.current) setLoading(false);
      }
    }, 350);

    return () => clearTimeout(debounceRef.current);
  }, [value]);

  // Close on outside click
  useEffect(() => {
    function handleClick(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  function handleSelect(item) {
    const displayName = item.display_name;
    onChange(displayName);
    onSelect({
      displayName,
      lat: Number(item.lat),
      lon: Number(item.lon),
    });
    setSuggestions([]);
    setOpen(false);
  }

  function handleKeyDown(e) {
    if (e.key === "Escape") {
      setOpen(false);
    }
  }

  return (
    <div ref={containerRef} className="relative">
      <div className="relative">
        <Input
          id={id}
          value={value}
          placeholder={placeholder}
          autoComplete="off"
          onChange={(e) => {
            onChange(e.target.value);
          }}
          onKeyDown={handleKeyDown}
          onFocus={() => {
            if (suggestions.length > 0) setOpen(true);
          }}
        />
        {loading && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none">
            <LoaderCircleIcon className="animate-spin size-4" />
          </span>
        )}
      </div>

      {open && suggestions.length > 0 && (
        <ul className="absolute z-50 mt-1 w-full rounded-lg border border-border bg-popover shadow-md overflow-hidden">
          {suggestions.map((item) => (
            <li key={item.place_id}>
              <button
                type="button"
                className="w-full text-left px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground transition-colors leading-snug cursor-pointer"
                onClick={() => handleSelect(item)}
              >
                {item.display_name}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

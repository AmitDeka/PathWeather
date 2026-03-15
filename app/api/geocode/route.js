import { NextResponse } from "next/server";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const place = searchParams.get("place");
  const limitParam = parseInt(searchParams.get("limit") ?? "1", 10);
  const limit = Math.min(Math.max(limitParam, 1), 5);

  if (!place) {
    return NextResponse.json(
      { error: "Missing 'place' parameter" },
      { status: 400 }
    );
  }

  const nominatimUrl = `https://nominatim.openstreetmap.org/search?format=json&limit=${limit}&q=${encodeURIComponent(
    place
  )}`;

  try {
    const response = await fetch(nominatimUrl, {
      headers: {
        "User-Agent": "PathWeather/1.21 (amitdeka13@gmail.com)",
        "Accept-Language": "en",
      },
    });

    if (!response.ok) {
      throw new Error(`Nominatim API failed with status: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Geocode API route error:", error);
    return NextResponse.json(
      { error: "Failed to fetch geocoding data." },
      { status: 500 }
    );
  }
}

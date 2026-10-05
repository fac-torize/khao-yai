import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";
// Area reference: verified Yung Khaow location on Wongnai; this is regional weather, not the resort's exact position.
export async function GET() {
  try {
    const response = await fetch(
      "https://api.open-meteo.com/v1/forecast?latitude=14.630809&longitude=101.410794&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_max,weather_code&timezone=Asia%2FBangkok&forecast_days=16",
      { signal: AbortSignal.timeout(10000), cache: "no-store" },
    );
    if (!response.ok) throw new Error("Weather unavailable");
    const data = await response.json();
    if (
      !Array.isArray(data?.daily?.time) ||
      !Array.isArray(data?.daily?.temperature_2m_max) ||
      !Array.isArray(data?.daily?.precipitation_probability_max)
    )
      throw new Error("Invalid weather response");
    return NextResponse.json({
      fetchedAt: new Date().toISOString(),
      source: "Open-Meteo",
      daily: data.daily,
    });
  } catch {
    return NextResponse.json(
      { error: "ไม่สามารถอัปเดตพยากรณ์ได้ในขณะนี้" },
      { status: 502 },
    );
  }
}

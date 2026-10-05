import { getPlace, mapLink, type Place, type TripDay } from "./data";
import { positions } from "./place-media";

// Let Maps resolve the road access for named venues, especially the waterfall.
export function navigationLink(place: Place) {
  if (!positions[place.id]) return mapLink(place);
  const params = new URLSearchParams({
    api: "1", destination: place.query, travelmode: "driving", dir_action: "navigate",
  });
  return `https://www.google.com/maps/dir/?${params}`;
}

export function dayRouteLinks(day: TripDay) {
  const stops = day.stops.filter((stop, i, all) =>
    positions[stop.id] && (i === 0 || stop.id !== all[i - 1].id),
  );
  const routes: { url: string; label: string; summary: string }[] = [];
  // Mobile Maps URLs support three intermediate waypoints. Share the boundary stop.
  for (let start = 0; start < stops.length - 1; start += 4) {
    const part = stops.slice(start, start + 5).map(s => getPlace(s.id));
    const params = new URLSearchParams({
      api: "1", origin: part[0].query, destination: part.at(-1)!.query, travelmode: "driving",
    });
    if (part.length > 2) params.set("waypoints", part.slice(1, -1).map(p => p.query).join("|"));
    routes.push({
      url: `https://www.google.com/maps/dir/?${params}`,
      label: `เปิดเส้นทาง${stops.length > 5 ? ` ช่วงที่ ${routes.length + 1}` : "ทั้งวัน"}`,
      summary: part.map(p => p.name).join(" → "),
    });
  }
  return routes;
}

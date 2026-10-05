# เขาใหญ่, ไม่ต้องรีบ

Thai itinerary for October 8–10, 2026, with atta Lakeside Resort as the base. Built with Next.js 16 and React 19.

## Run locally

```sh
bun install
bun dev
```

Open the local URL printed by Next.js. Production: `bun run build` then `bun start`.

## Features

- Three daily itineraries with optional stops and space to rest.
- All five restaurants and six cafés requested by the traveler.
- Venue photos with original-source attribution. Saalow links to the original gallery because its author forbids unapproved image reuse.
- Google Maps embedded per venue with external navigation links. Map searches should be checked before driving.
- Open-Meteo regional forecast refreshed on page load; timestamped saved data when the weather request fails. Dates outside the forecast window show no data.
- Search, venue filters, factual references, and printing.

## Data integrity

Sources checked October 5, 2026. `app/data.ts` keeps links alongside venue information. `public/places/image-origins.json` records original image URLs. Photos remain the property of their respective owners; attribution is not a general redistribution license.

Itinerary stop times are suggestions. Driving times of 2/14/23 minutes are user-provided, not verified routing results. The year and private-car travel are disclosed assumptions. Mallorka is a tentative match for “Mellorka”; two similarly named Nam Pla Phrik venues require traveler confirmation. Coppia opening times and access should be confirmed by phone.

Weather is for the Pak Chong area at the sourced Yung Khaow location (14.630809, 101.410794), not atta's exact position. Provider grid coordinates can differ. `app/weather-snapshot.json` is the timestamped response initially obtained from Open-Meteo. `/api/weather` refreshes it on demand without credentials and reports failure rather than fabricating data.

Google Maps and weather refresh require network access. Maps blocked by browser privacy settings can still be opened using the external navigation links.

## Typography

Noto Sans Thai, self-hosted from Google Fonts. SIL Open Font License; see `public/fonts/OFL.txt`.

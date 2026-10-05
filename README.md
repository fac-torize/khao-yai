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
- All five restaurants and six cafés requested by the traveler, plus Km.30 viewpoint and Haew Suwat Waterfall. Day two visits the park in the morning; cafés remain rainy-day alternatives.
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

## Overview map and photo galleries

The overview uses Leaflet with OpenStreetMap tiles and colors for each day. Marker labels show day.stop order; connectors indicate the suggested visit sequence, not road routing. Venue coordinates and evidence are recorded in `app/place-media.ts`. The atta coordinate was verified directly in Google Maps; the hotel's old short link points to Kirimaya instead. Saalow uses the shared The Creek campus marker, explicitly labeled; ambiguous Nam Pla Phrik remains unpinned. Mallorka appears as a day-two rainy-day alternative. The Haew Suwat marker locates the waterfall itself, not its parking area.

The two park attractions each have two real photos from the official park website; restaurant, café, and hotel galleries have three distinct photos, thumbnails, and a full-size keyboard-accessible gallery. Safari's additional pictures are drinks from its official website, labeled as such. Saalow still opens its author's original multi-photo gallery rather than copying prohibited images. Extra image origins remain in `public/places/image-origins.json`.

## Travel controls

The park/rainy-day switch changes day two's itinerary, overview markers and visit sequence, driving links, and printed itinerary together. The rain option is traveler-selected; weather never changes the plan automatically. Compact mode removes galleries and collapses descriptive copy while keeping navigation and expandable details. These two display preferences are stored locally; blocked storage does not disable controls.

Single-stop navigation uses Google Maps directions URLs with named destinations. Day routes include optional stops and exclude the ambiguous Nam Pla Phrik; consecutive hotel duplicates are removed. Routes split at four legs (three intermediate waypoints), sharing a boundary stop, to accommodate mobile browser limits documented at https://developers.google.com/maps/documentation/urls/get-started. No driving duration is inferred.

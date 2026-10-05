"use client";
import { useEffect, useRef, useState } from "react";
import type { Map as LeafletMap, LayerGroup } from "leaflet";
import { getPlace, mapLink, type TripDay } from "./data";
import { dayColors, positions } from "./place-media";

export default function TripOverview({ days }: { days: TripDay[] }) {
  const [filter, setFilter] = useState(-1);
  const [ready, setReady] = useState(false);
  const [layoutVersion, setLayoutVersion] = useState(0);
  const [failed, setFailed] = useState(false);
  const [tileFailed, setTileFailed] = useState(false);
  const host = useRef<HTMLDivElement>(null);
  const map = useRef<LeafletMap | null>(null);
  const layer = useRef<LayerGroup | null>(null);
  const api = useRef<typeof import("leaflet") | null>(null);
  const active = filter === -1 ? [0, 1, 2] : [filter];
  useEffect(() => {
    let disposed = false;
    let resize: ResizeObserver | undefined;
    import("leaflet")
      .then((L) => {
        if (disposed || !host.current) return;
        api.current = L;
        const m = L.map(host.current, {
          scrollWheelZoom: false,
          zoomControl: true,
        });
        map.current = m;
        L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          maxZoom: 19,
        })
          .on("tileerror", () => {
            if (!disposed) setTileFailed(true);
          })
          .addTo(m);
        L.control.scale({ imperial: false }).addTo(m);
        layer.current = L.layerGroup().addTo(m);
        resize = new ResizeObserver(() => {
          m.invalidateSize();
          if (!disposed) setLayoutVersion((v) => v + 1);
        });
        resize.observe(host.current);
        setReady(true);
      })
      .catch(() => {
        if (!disposed) setFailed(true);
      });
    return () => {
      disposed = true;
      resize?.disconnect();
      map.current?.remove();
      map.current = null;
    };
  }, []);
  useEffect(() => {
    const L = api.current;
    const m = map.current;
    const group = layer.current;
    if (!ready || !L || !m || !group) return;
    group.clearLayers();
    const selected = filter === -1 ? [0, 1, 2] : [filter];
    const all: [number, number][] = [];
    const pins = new globalThis.Map<
      string,
      {
        ids: Set<string>;
        visits: {
          day: number;
          step: number;
          time: string;
          optional: boolean;
        }[];
      }
    >();
    selected.forEach((d) => {
      const path: [number, number][] = [];
      days[d].stops.forEach((s, i) => {
        const p = positions[s.id];
        if (!p) return;
        const xy: [number, number] = [p.lat, p.lng];
        path.push(xy);
        all.push(xy);
        const key = `${p.lat},${p.lng}`;
        let pin = pins.get(key);
        if (!pin) {
          pin = { ids: new Set(), visits: [] };
          pins.set(key, pin);
        }
        pin.ids.add(s.id);
        pin.visits.push({
          day: d,
          step: i + 1,
          time: s.time,
          optional: !!s.optional,
        });
      });
      if (path.length > 1)
        L.polyline(path, {
          color: dayColors[d],
          weight: 4,
          opacity: 0.7,
          dashArray: d === 2 ? "7 8" : undefined,
        }).addTo(group);
    });
    if (filter === -1 || filter === 1) {
      const p = positions.mallorka;
      all.push([p.lat, p.lng]);
      L.marker([p.lat, p.lng], {
        icon: L.divIcon({
          className: "overview-marker alternative-marker",
          html: "<span>สลับ</span>",
          iconSize: [44, 30],
          iconAnchor: [22, 15],
        }),
        title: "Mallorka · ตัวเลือกสลับวันที่ 2",
      })
        .bindPopup(
          "<strong>Mallorka Khaoyai</strong><p>คาเฟ่สำรองแทนเที่ยวอุทยานในวันที่ 2 หากฝนหนักหรือพื้นที่ปิด</p>",
        )
        .addTo(group);
    }
    if (all.length)
      m.fitBounds(L.latLngBounds(all), {
        padding: [45, 45],
        maxZoom: 14,
        animate: false,
      });
    // Keep the geographic anchor exact; displace only the label to avoid collisions.
    const occupied: { x: number; y: number; width: number; height: number }[] =
      [];
    if (filter === -1 || filter === 1) {
      const alternative = m.latLngToContainerPoint([
        positions.mallorka.lat,
        positions.mallorka.lng,
      ]);
      occupied.push({
        x: alternative.x - 22,
        y: alternative.y - 15,
        width: 44,
        height: 30,
      });
    }
    const offsets = [
      [0, -25],
      [0, 25],
      [-54, 0],
      [54, 0],
      [0, -65],
      [0, 65],
      [-75, -40],
      [75, 40],
      [-75, 40],
      [75, -40],
      [0, -105],
      [0, 105],
    ];
    pins.forEach((pin) => {
      const ids = [...pin.ids];
      const p = positions[ids[0]];
      const title = ids.map((id) => getPlace(id).name).join(" / ");
      const colors = [...new Set(pin.visits.map((v) => v.day))];
      const label = ids.includes("atta")
        ? "atta"
        : pin.visits.map((v) => `${v.day + 1}.${v.step}`).join(" / ");
      const width = ids.includes("atta") ? 52 : 70;
      const point = m.latLngToContainerPoint([p.lat, p.lng]);
      const size = m.getSize();
      const offset =
        offsets.find(([dx, dy]) => {
          const x = point.x + dx - width / 2,
            y = point.y + dy - 17;
          return (
            x >= 8 &&
            y >= 8 &&
            x + width <= size.x - 8 &&
            y + 34 <= size.y - 8 &&
            !occupied.some(
              (b) =>
                x < b.x + b.width + 5 &&
                x + width + 5 > b.x &&
                y < b.y + b.height + 5 &&
                y + 39 > b.y,
            )
          );
        }) || offsets[0];
      const [dx, dy] = offset;
      occupied.push({
        x: point.x + dx - width / 2,
        y: point.y + dy - 17,
        width,
        height: 34,
      });
      const fill =
        colors.length > 1
          ? `linear-gradient(90deg,${colors.map((c, i) => `${dayColors[c]} ${(i / colors.length) * 100}% ${((i + 1) / colors.length) * 100}%`).join(",")})`
          : dayColors[colors[0]];
      const icon = L.divIcon({
        className: "overview-marker spaced-marker",
        html: `<svg class="marker-leader" width="240" height="240" viewBox="0 0 240 240" aria-hidden="true"><line x1="120" y1="120" x2="${120 + dx}" y2="${120 + dy}" stroke="${dayColors[colors[0]]}" stroke-width="1.5"/><circle cx="120" cy="120" r="4" fill="${dayColors[colors[0]]}" stroke="white" stroke-width="1.5"/></svg><span style="left:${dx}px;top:${dy}px;width:${width}px;background:${fill}">${label}</span>`,
        iconSize: [1, 1],
        iconAnchor: [0, 0],
      });
      const popup = document.createElement("div");
      const heading = document.createElement("strong");
      heading.textContent = title;
      popup.append(heading);
      pin.visits.forEach((v) => {
        const row = document.createElement("p");
        row.textContent = `วันที่ ${v.day + 1} · จุดที่ ${v.step} · ${v.time}${v.optional ? " (ตัวเลือก)" : ""}`;
        popup.append(row);
      });
      ids.forEach((id) => {
        const point = positions[id];
        if (point.note) {
          const n = document.createElement("p");
          n.textContent = point.note;
          popup.append(n);
        }
        const a = document.createElement("a");
        a.href = mapLink(getPlace(id));
        a.target = "_blank";
        a.rel = "noreferrer";
        a.textContent = `เปิด Maps · ${getPlace(id).name}`;
        popup.append(a);
        popup.append(document.createElement("br"));
      });
      const source = document.createElement("a");
      source.href = p.source;
      source.target = "_blank";
      source.rel = "noreferrer";
      source.textContent = "แหล่งพิกัด";
      popup.append(source);
      L.marker([p.lat, p.lng], { icon, title })
        .bindPopup(popup)
        .bindTooltip(title, { direction: "top", offset: [0, -17] })
        .addTo(group);
    });
  }, [filter, ready, layoutVersion, days]);
  return (
    <section className="trip-overview" aria-label="แผนที่ภาพรวมสามวัน">
      <div className="overview-heading">
        <div>
          <h2>ทั้งทริป ในแผนที่เดียว</h2>
          <p>ดูว่าร้านไหนอยู่โซนเดียวกัน และแต่ละวันแวะตามลำดับไหน</p>
        </div>
        <div className="overview-filters" aria-label="เลือกวันบนแผนที่">
          <button
            className={filter === -1 ? "selected" : ""}
            aria-pressed={filter === -1}
            onClick={() => setFilter(-1)}
          >
            ทั้ง 3 วัน
          </button>
          {days.map((d, i) => (
            <button
              key={d.date}
              className={filter === i ? "selected" : ""}
              aria-pressed={filter === i}
              onClick={() => setFilter(i)}
            >
              <span style={{ background: dayColors[i] }} />
              {d.date} ต.ค.
            </button>
          ))}
        </div>
      </div>
      <div className="overview-layout">
        <div className="overview-map-wrap">
          <div
            className="overview-map"
            ref={host}
            aria-label="แผนที่ OpenStreetMap แสดงจุดแวะและเส้นเชื่อมตามวัน"
          />
          {!ready && (
            <div className="map-loading" role="status">
              {failed
                ? "แผนที่โหลดไม่ได้ ดูรายชื่อและเปิด Google Maps ด้านข้างได้"
                : "กำลังเปิดแผนที่ภาพรวม…"}
            </div>
          )}
          {tileFailed && (
            <p className="tile-notice" role="status">
              แผนที่พื้นหลังบางส่วนโหลดไม่ได้ ยังดูหมุดและเปิด Maps
              จากรายชื่อได้
            </p>
          )}
          <div className="overview-map-note">
            เลขหมุด = วัน.ลำดับแวะ · เส้นแสดงลำดับ ไม่ใช่เส้นทางขับรถ
          </div>
        </div>
        <div className="overview-schedule">
          {active.map((d) => (
            <section key={d} className="overview-day">
              <h3>
                <span style={{ background: dayColors[d] }} />
                วันที่ {d + 1} · {days[d].date} ตุลาคม
              </h3>
              <ol>
                {days[d].stops.map((s, i) => (
                  <li key={`${s.id}-${i}`}>
                    <span
                      className="overview-step"
                      style={{ color: dayColors[d] }}
                    >
                      {i + 1}
                    </span>
                    <a
                      href={mapLink(getPlace(s.id))}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <strong>{getPlace(s.id).name}</strong>
                      <small>
                        {s.time}
                        {s.optional ? " · ตัวเลือก" : ""}
                        {!positions[s.id]
                          ? " · ยังไม่ปักหมุด รอยืนยันร้าน"
                          : ""}
                        {s.id === "saalow"
                          ? " · หมุดบริเวณเดียวกับจ้ำเข่า"
                          : ""}
                      </small>
                    </a>
                  </li>
                ))}
              </ol>
            </section>
          ))}
        </div>
      </div>
      <p className="overview-footnote">
        atta เป็นฐานทุกวัน · Saalow ใช้หมุดบริเวณเดียวกับจ้ำเข่า ·
        น้ำปลาพริกยังไม่ปักหมุดเพราะมีสองรายการชื่อคล้ายกัน · Mallorka
        คือคาเฟ่สำรองวันที่ 2
      </p>
    </section>
  );
}

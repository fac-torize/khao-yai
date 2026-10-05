"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import VenueGallery from "./venue-gallery";
const TripOverview = dynamic(() => import("./trip-overview"), {
  ssr: false,
  loading: () => (
    <div className="overview-placeholder">กำลังเปิดแผนที่ภาพรวม…</div>
  ),
});
import { days, places, getPlace, mapLink, getTripDays, type Place } from "./data";
import { navigationLink, dayRouteLinks } from "./travel-links";
import snapshot from "./weather-snapshot.json";

function Icon({ name, size = 20 }: { name: string; size?: number }) {
  const shapes: Record<string, React.ReactNode> = {
    mountain: (
      <>
        <path d="m2 19 7-13 5 8 3-5 5 10Z" />
        <path d="m6 12 3 2 3-2" />
      </>
    ),
    arrow: (
      <>
        <path d="M5 12h14m-5-5 5 5-5 5" />
      </>
    ),
    pin: (
      <>
        <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z" />
        <circle cx="12" cy="10" r="2.5" />
      </>
    ),
    clock: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </>
    ),
    coffee: (
      <>
        <path d="M4 9h13v7a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4Z" />
        <path d="M17 10h2a3 3 0 0 1 0 6h-2M7 3v3m4-3v3m4-3v3" />
      </>
    ),
    food: (
      <>
        <path d="M5 3v6m3-6v6m-6-6v6a3 3 0 0 0 6 0M5 12v9M18 3v18m0-18c-5 4-5 10 0 10" />
      </>
    ),
    rain: (
      <>
        <path d="M6 15a5 5 0 1 1 1-10 6 6 0 0 1 11 3 3.5 3.5 0 0 1 0 7ZM8 18l-1 3m5-3-1 3m5-3-1 3" />
      </>
    ),
    sun: (
      <>
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1 1m12 12 1 1M5 19l1-1M18 6l1-1" />
      </>
    ),
    external: (
      <>
        <path d="M14 3h7v7m0-7-11 11M10 3H3v18h18v-7" />
      </>
    ),
    check: <path d="m5 12 4 4L19 6" />,
    search: (
      <>
        <circle cx="10.5" cy="10.5" r="6.5" />
        <path d="m16 16 5 5" />
      </>
    ),
    print: (
      <>
        <path d="M6 9V3h12v6M6 17H3V9h18v8h-3M6 14h12v7H6Z" />
      </>
    ),
    book: (
      <>
        <path d="M12 5C8 2 4 3 2 4v16c4-2 7-1 10 1 3-2 6-3 10-1V4c-2-1-6-2-10 1Zm0 0v16" />
      </>
    ),
    bed: (
      <>
        <path d="M3 5v16m18-8v8M3 17h18M3 13h18v4M6 8h6v5H6Zm6 1h6a3 3 0 0 1 3 3v1" />
      </>
    ),
  };
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {shapes[name] || shapes.pin}
    </svg>
  );
}
function Photo({
  place,
  className = "",
  priority = false,
}: {
  place: Place;
  className?: string;
  priority?: boolean;
}) {
  return place.image ? (
    <Image
      src={`/places/${place.image}.jpg`}
      alt={`ภาพจริงของ ${place.name}`}
      fill
      sizes="(max-width: 700px) 100vw, 500px"
      className={className}
      priority={priority}
    />
  ) : (
    <a
      className="photo-unavailable"
      href={place.source}
      target="_blank"
      rel="noreferrer"
    >
      <Icon name="coffee" size={32} />
      <span>
        ดูภาพจริงที่ต้นฉบับ <Icon name="external" size={14} />
      </span>
    </a>
  );
}
const weatherSource =
  "https://api.open-meteo.com/v1/forecast?latitude=14.630809&longitude=101.410794&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_max,weather_code&timezone=Asia%2FBangkok&forecast_days=16";
function Weather() {
  const [data, setData] = useState(snapshot);
  const [status, setStatus] = useState<"loading" | "fresh" | "saved">(
    "loading",
  );
  useEffect(() => {
    const controller = new AbortController();
    fetch("/api/weather", { signal: controller.signal })
      .then((r) => {
        if (!r.ok) throw Error();
        return r.json();
      })
      .then((r) => {
        setData(r);
        setStatus("fresh");
      })
      .catch(() => {
        if (!controller.signal.aborted) setStatus("saved");
      });
    return () => controller.abort();
  }, []);
  const stamp = new Date(data.fetchedAt).toLocaleString("th-TH", {
    dateStyle: "short",
    timeStyle: "short",
    timeZone: "Asia/Bangkok",
  });
  return (
    <section className="weather" aria-label="พยากรณ์อากาศ">
      <div className="section-inline">
        <h3>อากาศระหว่างทริป</h3>
        <Icon name="rain" />
      </div>
      <p className="muted">พื้นที่ปากช่อง · พยากรณ์จาก Open-Meteo</p>
      <div className="weather-days">
        {days.map((day) => {
          const i = data.daily.time.indexOf(
            `2026-10-${day.date.padStart(2, "0")}`,
          );
          const found = i >= 0;
          const rain = found
            ? data.daily.precipitation_probability_max[i]
            : null;
          return (
            <div key={day.date}>
              <span>{day.date} ต.ค.</span>
              <Icon
                name={rain !== null && rain > 20 ? "rain" : "sun"}
                size={27}
              />
              <strong>
                {found
                  ? `${Math.round(data.daily.temperature_2m_min[i])}–${Math.round(data.daily.temperature_2m_max[i])}°`
                  : "ไม่มีข้อมูล"}
              </strong>
              <small>
                {rain !== null ? `โอกาสฝน ${rain}%` : "นอกช่วงพยากรณ์"}
              </small>
            </div>
          );
        })}
      </div>
      <p className="weather-tip">
        พกร่มไว้สักคัน และมีแผนสำรองในร่ม
        <br />
        พยากรณ์พื้นที่โดยรอบ อากาศที่ atta อาจต่างกัน
      </p>
      <a
        href={weatherSource}
        target="_blank"
        rel="noreferrer"
        className="source"
      >
        {status === "loading"
          ? "กำลังอัปเดต · "
          : status === "saved"
            ? "อัปเดตไม่ได้ · ข้อมูลที่บันทึกไว้ "
            : "อัปเดต "}{" "}
        {stamp} <Icon name="external" size={12} />
      </a>
    </section>
  );
}
function VenueInfo({ place }: { place: Place }) {
  return (
    <div className="venue-facts">
      <p>
        <Icon name="clock" size={15} />
        {place.hours}
      </p>
      {place.travel && (
        <p>
          <Icon name="pin" size={15} />
          {place.travel}
        </p>
      )}
      {place.note && (
        <p className="uncertain">
          {place.note.startsWith("แหล่งเวลา:") ? (
            <a
              href={place.note.replace("แหล่งเวลา:", "").trim()}
              target="_blank"
              rel="noreferrer"
            >
              แหล่งเวลาเปิด · Wongnai
            </a>
          ) : (
            place.note
          )}
        </p>
      )}
      <div className="venue-actions">
        <a href={mapLink(place)} target="_blank" rel="noreferrer">
          เปิด Google Maps <Icon name="external" size={13} />
        </a>
        <a href={place.source} target="_blank" rel="noreferrer">
          แหล่งข้อมูล / ภาพ <Icon name="external" size={13} />
        </a>
        {place.phone && <a href={`tel:${place.phone}`}>โทรสอบถาม</a>}
      </div>
      <small>
        {place.photoSource ? (
          <a href={place.photoSource} target="_blank" rel="noreferrer">
            {place.credit} <Icon name="external" size={10} />
          </a>
        ) : (
          place.credit
        )}
      </small>
    </div>
  );
}
export default function Home() {
  const [day, setDay] = useState(0);
  const [view, setView] = useState("plan");
  const [selected, setSelected] = useState("atta");
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [expanded, setExpanded] = useState<string | null>(null);
  const [rainy, setRainy] = useState(false);
  const [compact, setCompact] = useState(false);
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("khao-yai-display-v1") || "{}");
      if (typeof saved.rainy === "boolean") setRainy(saved.rainy);
      if (typeof saved.compact === "boolean") setCompact(saved.compact);
    } catch { /* Display controls still work if storage is unavailable. */ }
  }, []);
  function saveDisplay(nextRainy: boolean, nextCompact: boolean) {
    try { localStorage.setItem("khao-yai-display-v1", JSON.stringify({ rainy: nextRainy, compact: nextCompact })); } catch {}
  }
  const tripDays = getTripDays(rainy);
  const current = tripDays[day];
  const routes = dayRouteLinks(current);
  const selectedPlace = getPlace(selected);
  const listed = places.filter(
    (p) =>
      p.kind !== "stay" &&
      (filter === "all" || p.kind === filter) &&
      `${p.name} ${p.english} ${p.area}`
        .toLowerCase()
        .includes(search.toLowerCase()),
  );
  function chooseView(value: string) {
    setView(value);
    setExpanded(null);
  }
  const map = (
    <section className="map-panel" id="trip-map">
      <div className="section-inline">
        <div>
          <h3>แวะไหน อยู่ตรงไหน</h3>
          <p className="muted">เลือกสถานที่เพื่อดูบนแผนที่จริง</p>
        </div>
        <Icon name="pin" />
      </div>
      <label className="sr-only" htmlFor="map-place">
        เลือกสถานที่บนแผนที่
      </label>
      <select
        id="map-place"
        value={selected}
        onChange={(e) => setSelected(e.target.value)}
      >
        {places.map((p) => (
          <option value={p.id} key={p.id}>
            {p.name}
          </option>
        ))}
      </select>
      <iframe
        key={selected}
        title={`แผนที่ ${selectedPlace.name}`}
        src={`https://www.google.com/maps?q=${encodeURIComponent(selectedPlace.query)}&output=embed`}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      />
      <div className="map-bottom">
        <div>
          <strong>{selectedPlace.name}</strong>
          <span>{selectedPlace.area}</span>
        </div>
        <a
          className="round-link"
          href={navigationLink(selectedPlace)}
          target="_blank"
          rel="noreferrer"
          aria-label={`เปิดนำทางไป ${selectedPlace.name}`}
        >
          <Icon name="arrow" />
        </a>
      </div>
      <p className="map-caution">
        แผนที่ค้นหาตามชื่อร้าน ตรวจสอบหมุดก่อนนำทาง โดยเฉพาะน้ำปลาพริก
      </p>
    </section>
  );
  return (
    <>
      <a className="skip-link" href="#main">
        ข้ามไปเนื้อหา
      </a>
      <header className="topbar">
        <a href="#" className="brand" onClick={() => chooseView("plan")}>
          <span className="brand-mark">
            <Icon name="mountain" size={27} />
          </span>
          <span>
            เขาใหญ่<span className="brand-small">a little getaway</span>
          </span>
        </a>
        <nav aria-label="เมนูหลัก">
          {[
            ["plan", "แพลนทริป"],
            ["places", "สถานที่ทั้งหมด"],
            ["map", "แผนที่"],
            ["sources", "ข้อมูลอ้างอิง"],
          ].map(([id, label]) => (
            <button
              key={id}
              className={view === id ? "active" : ""}
              onClick={() => chooseView(id)}
            >
              {label}
            </button>
          ))}
        </nav>
        <button
          aria-label="เก็บแพลนทั้งสามวันเป็น PDF"
          className="print-button"
          onClick={() => window.print()}
        >
          <Icon name="print" size={17} />
          <span>เก็บแพลนเป็น PDF</span>
        </button>
      </header>
      <section className="hero">
        <Image
          src="/places/atta.jpg"
          alt="ทะเลสาบและอาคารของ atta Lakeside Resort ภาพจากเว็บไซต์ Kirimaya"
          fill
          priority
          sizes="100vw"
        />
        <div className="hero-shade" />
        <div className="hero-content">
          <h1>
            เขาใหญ่
            <br />
            <em>ไปพักใจสักสามวัน</em>
          </h1>
          <p>
            กาแฟดี ๆ อาหารอร่อย และเวลาไม่ต้องรีบ
            <br />
            ทริปเล็ก ๆ ที่มี atta เป็นบ้านของเรา
          </p>
          <div className="hero-chips">
            <span>
              <Icon name="clock" size={16} />
              8–10 ตุลาคม 2569
            </span>
            <span>
              <Icon name="bed" size={17} />
              atta Lakeside Resort
            </span>
          </div>
        </div>
        <a
          className="hero-credit"
          href="https://www.kirimaya.com/resorts/atta/"
          target="_blank"
          rel="noreferrer"
        >
          ภาพสถานที่จริง · Kirimaya <Icon name="external" size={12} />
        </a>
      </section>
      <main id="main">
        <div className="trip-intro">
          <div>
            <Icon name="book" size={20} />
            <p>
              3 วัน 2 คืน <span> / </span> กินดี จิบช้า พักเต็มที่
            </p>
          </div>
          <p>
            ปี 2026 · สมมติว่าใช้รถส่วนตัว{" "}
            <a href="#notes" onClick={() => chooseView("sources")}>
              อ่านเงื่อนไขแพลน <Icon name="arrow" size={15} />
            </a>
          </p>
        </div>
        {(view === "plan" || view === "map") && (
          <>
            <section className="trip-controls" aria-label="ตัวเลือกแพลนทริป">
              <div className="control-group">
                <span>แพลนวันที่ 9 ต.ค.</span>
                <div className="segmented-control">
                  {[false, true].map(value => (
                    <button key={String(value)} aria-pressed={rainy === value}
                      onClick={() => { setRainy(value); setExpanded(null); saveDisplay(value, compact); }}>
                      <Icon name={value ? "rain" : "mountain"} size={17} />
                      {value ? "แพลนฝนตก" : "เที่ยวอุทยาน"}
                    </button>
                  ))}
                </div>
                <small role="status">{rainy ? "Safari + ไทรสุกแทนอุทยาน · วันที่ 8 และ 10 ใช้แพลนเดิม" : "จุดชมวิว กม.30 + น้ำตกเหวสุวัต"}</small>
              </div>
              {view === "plan" && <div className="control-group">
                <span>การแสดงแพลน</span>
                <div className="segmented-control">
                  {[false, true].map(value => (
                    <button key={String(value)} aria-pressed={compact === value}
                      onClick={() => { setCompact(value); saveDisplay(rainy, value); }}>
                      {value ? "ดูแบบย่อ" : "ดูพร้อมรูป"}
                    </button>
                  ))}
                </div>
                <small>แบบย่อซ่อนรูป เปิดรายละเอียดแต่ละจุดได้</small>
              </div>}
            </section>
            <TripOverview days={tripDays} />
          </>
        )}
        {view === "plan" && (
          <div className="main-grid">
            <section className="itinerary">
              <div className="heading-row">
                <h2>สามวันของเรา</h2>
                <span>เลือกวัน แล้วออกไปเที่ยวกัน</span>
              </div>
              <div className="day-tabs" role="tablist" aria-label="วันเดินทาง">
                {days.map((d, i) => (
                  <button
                    role="tab"
                    tabIndex={i === day ? 0 : -1}
                    aria-selected={i === day}
                    aria-controls="day-panel"
                    id={`day-tab-${i}`}
                    key={d.date}
                    className={i === day ? "selected" : ""}
                    onKeyDown={(e) => {
                      if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
                        e.preventDefault();
                        const next =
                          (day + (e.key === "ArrowRight" ? 1 : 2)) % 3;
                        setDay(next);
                        setExpanded(null);
                        document.getElementById(`day-tab-${next}`)?.focus();
                      }
                    }}
                    onClick={() => {
                      setDay(i);
                      setExpanded(null);
                    }}
                  >
                    <span className="day-date">
                      {d.date}
                      <small>ต.ค.</small>
                    </span>
                    <span>
                      <strong>วันที่ {i + 1}</strong>
                      <small>{d.day}</small>
                    </span>
                    <Icon name="arrow" size={18} />
                  </button>
                ))}
              </div>
              <div
                id="day-panel"
                role="tabpanel"
                aria-labelledby={`day-tab-${day}`}
                className={`day-content ${compact ? "compact-plan" : ""}`}
              >
                <div className="day-title">
                  <h3>{current.title}</h3>
                  <p>
                    <Icon name="pin" size={15} />
                    {current.subtitle}
                  </p>
                </div>
                <div className="daily-routes" aria-label="เส้นทางขับรถตามแพลน">
                  {routes.map(route => (
                    <a key={route.url} href={route.url} target="_blank" rel="noreferrer" title={route.summary}>
                      <Icon name="pin" size={17} />{route.label}<Icon name="external" size={14} />
                    </a>
                  ))}
                  <small>ตามลำดับแวะที่เลือก รวมจุดเสริม · {routes.length > 1 ? "แบ่งสองช่วงให้เปิดบนมือถือได้ครบ · " : ""}{current.stops.some(s => s.id === "nampla") ? "น้ำปลาพริกยังไม่รวมเพราะรอยืนยันร้าน" : "เปิด Google Maps เพื่อดูเส้นทางขับรถ"}</small>
                </div>
                <div className="planning-note">
                  <span className="dot" />
                  เวลาต่อไปนี้เป็นแพลนเสนอ
                  ไม่ใช่เวลาการจองหรือเวลาเดินทางที่ยืนยันแล้ว
                </div>
                <div className="timeline">
                  {current.stops.map((stop, i) => {
                    const p = getPlace(stop.id);
                    const key = `${day}-${rainy}-${stop.id}-${i}`;
                    return (
                      <article
                        className={`stop ${stop.optional ? "optional" : ""}`}
                        key={key}
                      >
                        <div className="time">
                          <span>{stop.time}</span>
                          <span className="timeline-dot">
                            <Icon
                              name={
                                p.kind === "food"
                                  ? "food"
                                  : p.kind === "stay"
                                    ? "bed"
                                    : p.kind === "sight"
                                      ? "pin"
                                      : "coffee"
                              }
                              size={15}
                            />
                          </span>
                        </div>
                        <div className="stop-body">
                          <div className="stop-text">
                            <div className="stop-label">
                              {stop.label}
                              {stop.optional && (
                                <span className="optional-tag">ตัวเลือก</span>
                              )}
                            </div>
                            <h4>{p.name}</h4>
                            {(!compact || expanded === key) && <p>{stop.text}</p>}
                            <div className="stop-actions">
                              <a className="navigate-stop" href={navigationLink(p)} target="_blank" rel="noreferrer"
                                aria-label={`${p.id === "nampla" ? "ค้นหาร้าน" : "นำทางไป"} ${p.name}`}>
                                <Icon name="arrow" size={15} />{p.id === "nampla" ? "ค้นหาร้าน" : "นำทาง"}
                              </a>
                              <button
                                aria-expanded={expanded === key}
                                onClick={() =>
                                  setExpanded(expanded === key ? null : key)
                                }
                              >
                                รายละเอียด {expanded === key ? "−" : "+"}
                              </button>
                              <button
                                onClick={() => {
                                  setSelected(p.id);
                                  document
                                    .getElementById("trip-map")
                                    ?.scrollIntoView({
                                      behavior: "smooth",
                                      block: "center",
                                    });
                                }}
                              >
                                <Icon name="pin" size={13} />
                                ดูแผนที่
                              </button>
                            </div>
                          </div>
                          {!compact && <div className="stop-gallery">
                            <VenueGallery place={p} />
                          </div>}
                          {expanded === key && <VenueInfo place={p} />}
                        </div>
                      </article>
                    );
                  })}
                </div>
                <div className="day-advice">
                  <Icon name="sun" size={23} />
                  <div>
                    <strong>เผื่อที่ว่างให้ความสบาย</strong>
                    <p>{current.note}</p>
                  </div>
                </div>
                {day === 1 && (
                  <div className="swap">
                    <span>อยากเปลี่ยนบรรยากาศ?</span>
                    <button
                      onClick={() => {
                        chooseView("places");
                        setFilter("cafe");
                        setSearch("");
                      }}
                    >
                      ดูคาเฟ่สำรอง หากเที่ยวอุทยานไม่ได้{" "}
                      <Icon name="arrow" size={16} />
                    </button>
                  </div>
                )}
              </div>
            </section>
            <aside>
              <Weather />
              {map}
              <section className="hotel">
                <div className="hotel-image">
                  <Photo place={getPlace("atta")} />
                </div>
                <div className="hotel-body">
                  <span>บ้านของเราในทริปนี้</span>
                  <h3>atta Lakeside Resort</h3>
                  <p>
                    เช็กอิน 15:00 · เช็กเอาต์ 12:00
                    <br />
                    ช่วงบ่ายของวันที่สอง เก็บไว้พักที่นี่
                  </p>
                  <a
                    href={getPlace("atta").source}
                    target="_blank"
                    rel="noreferrer"
                  >
                    ข้อมูลจากเว็บไซต์โรงแรม <Icon name="external" size={13} />
                  </a>
                </div>
              </section>
            </aside>
          </div>
        )}
        {view === "places" && (
          <section className="all-places">
            <div className="heading-row">
              <div>
                <h2>ทุกที่ที่อยากไป</h2>
                <p className="muted">
                  ร้านอาหาร 5 แห่ง คาเฟ่ 6 แห่ง และที่เที่ยวธรรมชาติ 2 จุด
                </p>
              </div>
              <span>ภาพจริง พร้อมแหล่งอ้างอิง</span>
            </div>
            <div className="filters">
              <div>
                {[
                  ["all", "ทั้งหมด"],
                  ["food", "ร้านอาหาร"],
                  ["cafe", "คาเฟ่"],
                  ["sight", "ที่เที่ยว"],
                ].map(([id, label]) => (
                  <button
                    key={id}
                    aria-pressed={filter === id}
                    className={filter === id ? "selected" : ""}
                    onClick={() => setFilter(id)}
                  >
                    {label}
                  </button>
                ))}
              </div>
              <label>
                <Icon name="search" size={18} />
                <input
                  aria-label="ค้นหาสถานที่"
                  placeholder="ค้นหาร้านหรือโซน…"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </label>
            </div>
            <div className="venue-grid">
              {listed.map((p) => (
                <article className="venue" key={p.id}>
                  <div className="venue-gallery-wrap">
                    <VenueGallery place={p} />
                    <span className="venue-kind">
                      {p.kind === "food" ? "ร้านอาหาร" : p.kind === "sight" ? "ที่เที่ยว" : "คาเฟ่"}
                    </span>
                  </div>
                  <div className="venue-body">
                    <p className="venue-area">{p.area}</p>
                    <h3>{p.name}</h3>
                    <p>{p.description}</p>
                    <VenueInfo place={p} />
                    <a className="venue-navigation" href={navigationLink(p)} target="_blank" rel="noreferrer">
                      <Icon name="arrow" size={16} />{p.id === "nampla" ? "ค้นหาร้านใน Google Maps" : `นำทางไป ${p.name}`}
                    </a>
                    <button
                      className="map-venue"
                      onClick={() => {
                        setSelected(p.id);
                        chooseView("map");
                      }}
                    >
                      ดูตำแหน่งบนแผนที่ <Icon name="arrow" size={16} />
                    </button>
                  </div>
                </article>
              ))}
            </div>
            {listed.length === 0 && (
              <p className="empty">
                ไม่พบร้านตามคำค้น ลองชื่ออื่นหรือเลือก “ทั้งหมด”
              </p>
            )}
          </section>
        )}
        {view === "map" && (
          <section className="map-view">
            <div className="heading-row">
              <div>
                <h2>เขาใหญ่ ในแต่ละจุดแวะ</h2>
                <p className="muted">
                  แผนที่จริงจาก Google Maps · เลือกร้านทางซ้ายเพื่อดูตำแหน่ง
                </p>
              </div>
            </div>
            <div className="map-view-grid">
              <div className="map-list">
                {places.map((p) => (
                  <button
                    key={p.id}
                    className={selected === p.id ? "selected" : ""}
                    onClick={() => setSelected(p.id)}
                  >
                    <Icon
                      name={
                        p.kind === "food"
                          ? "food"
                          : p.kind === "stay"
                            ? "bed"
                            : p.kind === "sight" ? "pin" : "coffee"
                      }
                      size={18}
                    />
                    <span>
                      <strong>{p.name}</strong>
                      <small>{p.area}</small>
                    </span>
                    <Icon name="arrow" size={16} />
                  </button>
                ))}
              </div>
              <div>
                {map}
                <VenueInfo place={selectedPlace} />
              </div>
            </div>
          </section>
        )}
        {view === "sources" && (
          <section className="references" id="notes">
            <h2>ข้อมูลจริง แพลนที่ปรับได้</h2>
            <p className="reference-lead">
              ข้อมูลสถานที่และพยากรณ์แยกจากเวลาที่เราเสนอ
              เพื่อให้รู้ว่าอะไรตรวจสอบแล้ว และอะไรยังต้องยืนยัน
            </p>
            <div className="reference-notes">
              <article>
                <h3>ตั้งต้นจากอะไร</h3>
                <p>
                  ทริป 8–10 ตุลาคม 2026 (2569) พัก atta ตามที่คุณระบุ
                  ปีและรถส่วนตัวเป็นสมมติฐานที่แจ้งไว้ ยังไม่ทราบต้นทาง จำนวนคน
                  และเวลาถึงปากช่อง
                </p>
              </article>
              <article>
                <h3>เวลาในแพลน</h3>
                <p>
                  เวลาแวะเป็นข้อเสนอ ไม่ได้จองโต๊ะหรือคำนวณเวลารถสด ระยะ 2 นาที
                  (ครัวกำปั่น), 23 นาที (ยุ้งข้าว), 14 นาที (น้ำปลาพริก)
                  มาจากข้อความของคุณ ไม่ใช่ผลตรวจสอบเส้นทาง
                </p>
              </article>
              <article>
                <h3>ชื่อที่ต้องยืนยัน</h3>
                <p>
                  Mellorka น่าจะหมายถึง Mallorka Khaoyai
                  ส่วนน้ำปลาพริกพบสองรายการ:{" "}
                  <a
                    href="https://www.wongnai.com/restaurants/2033883lM"
                    target="_blank"
                    rel="noreferrer"
                  >
                    ครัวน้ำปลาพริก เขาใหญ่
                  </a>{" "}
                  และ{" "}
                  <a
                    href="https://www.wongnai.com/restaurants/1784838xR"
                    target="_blank"
                    rel="noreferrer"
                  >
                    ครัวน้ำปลาพริก ณ เขาใหญ่
                  </a>{" "}
                  จึงยังไม่ยืนยันร้านในแพลน
                </p>
              </article>
              <article>
                <h3>อากาศและภาพประกอบ</h3>
                <p>
                  พยากรณ์ Open-Meteo อัปเดตเมื่อเปิดเว็บ
                  แสดงวันและเวลาที่ดึงข้อมูล จุดอ้างอิงคือพื้นที่ยุ้งข้าว
                  ปากช่อง ไม่ใช่ตำแหน่ง atta ภาพมีเครดิตต้นฉบับทุกแห่ง Saalow
                  ใช้ลิงก์แกลเลอรีแทนคัดลอกภาพที่ห้ามใช้
                </p>
              </article>
            </div>
            <h3 className="source-heading">เปิดอ่านต้นฉบับ</h3>
            <div className="source-list">
              {places.map((p) => (
                <a href={p.source} target="_blank" rel="noreferrer" key={p.id}>
                  <span>
                    <strong>{p.name}</strong>
                    <small>{p.credit}</small>
                  </span>
                  <Icon name="external" size={17} />
                </a>
              ))}
              <a
                href="https://www.wongnai.com/restaurants/3191192WC-safari-matcha-bar-khaoyai"
                target="_blank"
                rel="noreferrer"
              >
                <span>
                  <strong>เวลาเปิด Safari Matcha Bar</strong>
                  <small>Wongnai · ข้อมูลเวลาเปิด</small>
                </span>
                <Icon name="external" size={17} />
              </a>
              <a href={weatherSource} target="_blank" rel="noreferrer">
                <span>
                  <strong>พยากรณ์พื้นที่ปากช่อง</strong>
                  <small>Open-Meteo · ข้อมูลพยากรณ์ต้นฉบับ</small>
                </span>
                <Icon name="external" size={17} />
              </a>
            </div>
            <div className="extra-idea">
              <h3>ถ้าอยากเพิ่มอีกหนึ่งอย่าง</h3>
              <p>
                ลองดู TANI Restaurant ภายใน atta
                เป็นทางเลือกวันที่ไม่อยากออกไปข้างนอก
                เว็บไซต์โรงแรมระบุร้านนี้ไว้ในส่วน Dining
                โทรเช็กเวลาและจองก่อนใช้บริการ
              </p>
              <a
                href="https://www.kirimaya.com/resorts/atta/"
                target="_blank"
                rel="noreferrer"
              >
                ดูร้านอาหารในโรงแรม <Icon name="arrow" size={16} />
              </a>
            </div>
          </section>
        )}
        <footer>
          <a
            className="footer-brand"
            href="#"
            onClick={() => chooseView("plan")}
          >
            <Icon name="mountain" size={24} />
            เขาใหญ่, ไม่ต้องรีบ
          </a>
          <p>สถานที่ตรวจสอบ 5 ต.ค. 2569 · เวลาร้านอาจเปลี่ยนได้</p>
          <button onClick={() => chooseView("sources")}>
            แหล่งข้อมูลทั้งหมด <Icon name="arrow" size={15} />
          </button>
        </footer>
        <div className="print-itinerary">
          <h1>เขาใหญ่, ไม่ต้องรีบ · 8–10 ตุลาคม 2569</h1>
          <p>
            พัก atta Lakeside Resort · เวลาแวะเป็นข้อเสนอ · ปี 2026
            และรถส่วนตัวเป็นสมมติฐาน
          </p>
          <p>วันที่ 9: {rainy ? "แพลนฝนตก · คาเฟ่" : "เที่ยวอุทยาน"}</p>
          {tripDays.map((d, i) => (
            <section key={d.date}>
              <h2>
                วันที่ {i + 1} · {d.date} ต.ค. — {d.title}
              </h2>
              <p>{d.note}</p>
              <table>
                <thead>
                  <tr>
                    <th>เวลาเสนอ</th>
                    <th>สถานที่</th>
                    <th>รายละเอียด</th>
                  </tr>
                </thead>
                <tbody>
                  {d.stops.map((s, j) => (
                    <tr key={j}>
                      <td>{s.time}</td>
                      <td>
                        {getPlace(s.id).name}
                        {s.optional ? " (ตัวเลือก)" : ""}
                      </td>
                      <td>{s.text}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>
          ))}
          <h2>ข้อมูลที่ต้องยืนยัน</h2>
          <p>
            Mellorka น่าจะหมายถึง Mallorka Khaoyai ·
            น้ำปลาพริกมีสองรายการที่ต้องยืนยัน · Coppia ยังไม่ยืนยันเวลาเปิด ·
            ระยะเวลา 2/14/23 นาทีเป็นข้อมูลจากผู้เดินทาง
          </p>
          <h2>แหล่งอ้างอิง</h2>
          {places.map((p) => (
            <p key={p.id}>
              {p.name}: {p.source}
            </p>
          ))}
        </div>
      </main>
    </>
  );
}

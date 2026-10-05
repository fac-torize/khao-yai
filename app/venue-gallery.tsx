"use client";
import { useRef, useState } from "react";
import Image from "next/image";
import type { Place } from "./data";
import { photosFor } from "./place-media";
export default function VenueGallery({ place }: { place: Place }) {
  const photos = photosFor(place);
  const [index, setIndex] = useState(0);
  const dialog = useRef<HTMLDialogElement>(null);
  if (!photos.length)
    return (
      <a
        className="gallery-external"
        href={place.source}
        target="_blank"
        rel="noreferrer"
      >
        <strong>ดูหลายภาพของ {place.name}</strong>
        <span>เปิดแกลเลอรีต้นฉบับ</span>
        <small>
          เจ้าของภาพห้ามนำมาใช้โดยไม่ได้รับอนุญาต จึงลิงก์ให้ดูจากแหล่งจริง
        </small>
      </a>
    );
  const photo = photos[index];
  const move = (step: number) =>
    setIndex((i) => (i + step + photos.length) % photos.length);
  return (
    <div className="venue-gallery">
      <button
        className="gallery-main"
        aria-label={`ขยายภาพ ${place.name} ภาพที่ ${index + 1}`}
        onClick={() => dialog.current?.showModal()}
      >
        <Image
          src={`/places/${photo.file}.jpg`}
          alt={photo.caption}
          fill
          sizes="(max-width:760px) 85vw, (max-width:1000px) 55vw, 650px"
        />
        <span className="gallery-enlarge">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            aria-hidden="true"
          >
            <path d="M8 3H3v5m13-5h5v5M3 16v5h5m13-5v5h-5" />
          </svg>{" "}
          ดูรูปใหญ่ · {index + 1}/{photos.length}
        </span>
      </button>
      <div className="gallery-thumbs" aria-label={`เลือกรูปของ ${place.name}`}>
        {photos.map((p, i) => (
          <button
            key={p.file}
            aria-label={`ดูภาพ ${place.name} ภาพที่ ${i + 1}`}
            aria-pressed={i === index}
            className={i === index ? "selected" : ""}
            onClick={() => setIndex(i)}
          >
            <Image
              src={`/places/${p.file}.jpg`}
              alt={p.caption}
              fill
              sizes="120px"
            />
          </button>
        ))}
      </div>
      <a
        className="gallery-credit"
        href={photo.source}
        target="_blank"
        rel="noreferrer"
      >
        {place.credit} · ดูต้นฉบับ ↗
      </a>
      <dialog
        ref={dialog}
        className="photo-dialog"
        aria-label={`แกลเลอรีภาพ ${place.name}`}
        onClick={(e) => {
          if (e.target === e.currentTarget) dialog.current?.close();
        }}
        onKeyDown={(e) => {
          if (e.key === "ArrowLeft") {
            e.preventDefault();
            move(-1);
          }
          if (e.key === "ArrowRight") {
            e.preventDefault();
            move(1);
          }
        }}
      >
        <div className="photo-dialog-top">
          <strong>
            {place.name}{" "}
            <span>
              {index + 1} / {photos.length}
            </span>
          </strong>
          <button
            autoFocus
            aria-label="ปิดรูปใหญ่"
            onClick={() => dialog.current?.close()}
          >
            ปิด ×
          </button>
        </div>
        <div className="photo-dialog-image">
          <Image
            src={`/places/${photo.file}.jpg`}
            alt={photo.caption}
            fill
            sizes="90vw"
            style={{ objectFit: "contain" }}
          />
          <button
            className="photo-prev"
            aria-label="ภาพก่อนหน้า"
            onClick={() => move(-1)}
          >
            ‹
          </button>
          <button
            className="photo-next"
            aria-label="ภาพถัดไป"
            onClick={() => move(1)}
          >
            ›
          </button>
        </div>
        <div className="photo-dialog-bottom">
          <p>{photo.caption}</p>
          <a href={photo.source} target="_blank" rel="noreferrer">
            {place.credit} · ต้นฉบับ ↗
          </a>
        </div>
      </dialog>
    </div>
  );
}

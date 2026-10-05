import type { Place } from "./data";
export type VenuePhoto = { file: string; caption: string; source: string };
export const photosFor = (p: Place): VenuePhoto[] =>
  p.image
    ? (p.kind === "sight" ? [1, 2].map((n) => ({
        file: n === 1 ? p.image! : `${p.image}-${n}`,
        caption: `${p.name} · ภาพจริงมุมที่ ${n} จากเว็บไซต์อุทยาน`,
        source: p.source,
      })) : [
        {
          file: p.image,
          caption: `${p.name} · ภาพจากแหล่งอ้างอิง`,
          source: p.photoSource || p.source,
        },
        {
          file: `${p.image}-2`,
          caption:
            p.id === "safari"
              ? "เครื่องดื่มจากเว็บไซต์ Safari Matcha"
              : `${p.name} · บรรยากาศและเมนูจากแหล่งอ้างอิง`,
          source: p.photoSource || p.source,
        },
        {
          file: `${p.image}-3`,
          caption:
            p.id === "safari"
              ? "เครื่องดื่มจากเว็บไซต์ Safari Matcha"
              : `${p.name} · ภาพเพิ่มเติมจากแหล่งอ้างอิง`,
          source: p.photoSource || p.source,
        },
      ])
    : [];
export type MapPosition = {
  lat: number;
  lng: number;
  source: string;
  note?: string;
};
export const positions: Record<string, MapPosition> = {
  viewpoint30: {
    lat: 14.47386971808361,
    lng: 101.39021683484316,
    source: "https://www.wongnai.com/attractions/2057966Aw",
  },
  haewsuwat: {
    lat: 14.43553,
    lng: 101.41413,
    source: "https://mapcarta.com/30566266",
    note: "พิกัดตัวน้ำตกจาก OpenStreetMap ไม่ใช่ลานจอดรถ",
  },
  atta: {
    lat: 14.5148993,
    lng: 101.4337163,
    source:
      "https://www.google.com/maps?q=atta+Lakeside+Resort+Suite+Khao+Yai&output=embed",
  },
  jumkhao: {
    lat: 14.7074644,
    lng: 101.4224867,
    source: "https://www.ryoiireview.com/restaurant/view/19056",
  },
  saalow: {
    lat: 14.7074644,
    lng: 101.4224867,
    source:
      "https://www.lemon8-app.com/@gowithnung/7683110675172655634?region=th",
    note: "ใช้หมุดบริเวณ The Creek ร่วมกับจ้ำเข่า ตามรีวิวที่ระบุว่าอยู่ในบริเวณเดียวกัน ไม่ใช่พิกัดประตูร้าน Saalow",
  },
  kampan: {
    lat: 14.5170117,
    lng: 101.4315183,
    source: "https://www.ryoiireview.com/restaurant/view/9544",
  },
  yung: {
    lat: 14.630809,
    lng: 101.410794,
    source: "https://www.wongnai.com/restaurants/yungkhaowkhaoyai",
  },
  lagoon: {
    lat: 14.505847401381,
    lng: 101.44541475203,
    source: "https://www.wongnai.com/restaurants/3604740gM-lagoon-cafe-khaoyai",
  },
  safari: {
    lat: 14.5344677,
    lng: 101.3875968,
    source: "https://maps.app.goo.gl/GQHGogP95TS4Ntrn8",
  },
  saisook: {
    lat: 14.534432,
    lng: 101.384256,
    source: "https://www.wongnai.com/restaurants/2685164Th",
  },
  midwinter: {
    lat: 14.616669625858014,
    lng: 101.40661867055223,
    source: "https://www.wongnai.com/restaurants/midwintergreen",
  },
  coppia: {
    lat: 14.517139,
    lng: 101.5065804,
    source: "https://maps.app.goo.gl/Xneo3CFizMj6hubm8",
  },
  mallorka: {
    lat: 14.5547546,
    lng: 101.4195933,
    source: "https://maps.app.goo.gl/ZDzMbFANsHc9UdcJ6",
  },
};
export const dayColors = ["#b34f2b", "#2c6856", "#5264a5"];

import { getPlace, places, type TripDay } from "./data";

export type StopChoices = Record<string, string>;
export const stopChoiceKey = (date: string, stop: TripDay["stops"][number]) =>
  `${date}:${stop.time}:${stop.id}`;

export function customizeTrip(base: TripDay[], choices: StopChoices): TripDay[] {
  return base.map(day => {
    let changed = false;
    const stops = day.stops.map(stop => {
      const id = choices[stopChoiceKey(day.date, stop)];
      const place = places.find(p => p.id === id && p.kind !== "stay");
      if (!place || place.id === stop.id || getPlace(stop.id).kind === "stay") return stop;
      changed = true;
      return { ...stop, id: place.id, label: "สถานที่ที่เลือก", text: `${place.area} · ตรวจสอบเวลาเปิดและเผื่อเวลาเดินทางให้เหมาะกับแผนที่ปรับใหม่` };
    });
    return changed ? {
      ...day, stops,
      title: `แพลนวันที่ ${day.date} ต.ค. ที่คุณเลือก`,
      subtitle: stops.map(stop => getPlace(stop.id).name).join(" → "),
      note: "ปรับสถานที่ตามที่คุณเลือกแล้ว เวลาแต่ละช่วงยังเป็นเวลาเดิม โปรดตรวจสอบเวลาเปิดและระยะทางอีกครั้ง · atta เช็กอินตั้งแต่ 15:00 และเช็กเอาต์ไม่เกิน 12:00",
    } : day;
  });
}

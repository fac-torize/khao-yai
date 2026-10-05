import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  title: "เขาใหญ่, ไม่ต้องรีบ — 8–10 ตุลาคม | atta",
  description:
    "แพลนเขาใหญ่ 3 วัน 2 คืน พัก atta พร้อมร้านอาหาร คาเฟ่ ภาพจริง แผนที่และพยากรณ์อากาศที่มีแหล่งอ้างอิง",
  icons: { icon: "/favicon.svg" },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="th">
      <body>{children}</body>
    </html>
  );
}

export type Place = {
  id: string;
  name: string;
  english: string;
  kind: "cafe" | "food" | "stay";
  area: string;
  description: string;
  hours: string;
  source: string;
  credit: string;
  image?: string;
  map?: string;
  query: string;
  note?: string;
  travel?: string;
  phone?: string;
  photoSource?: string;
};
export const places: Place[] = [
  {
    id: "atta",
    name: "atta Lakeside Resort",
    english: "Your lakeside hideaway",
    kind: "stay",
    area: "หมูสี · Kirimaya",
    description:
      "ที่พักริมทะเลสาบในเครือคีรีมายา เก็บช่วงบ่ายไว้พักและชมวิวจากห้อง",
    hours: "เช็กอิน 15:00–22:30 · เช็กเอาต์ 12:00",
    source: "https://www.kirimaya.com/resorts/atta/",
    credit: "Kirimaya · เว็บไซต์โรงแรม",
    image: "atta",
    map: "https://goo.gl/maps/2rZG8nZiC6kghS5E8",
    query: "atta Lakeside Resort Suite Khao Yai",
    note: "เวลาโรงแรมจากเว็บทางการ; เงื่อนไขการจองของคุณอาจต่างกัน",
  },
  {
    id: "jumkhao",
    name: "จ้ำเข่า",
    english: "Jum Khao",
    kind: "food",
    area: "ปากช่อง · The Creek",
    description:
      "อาหารอีสานใน The Creek ซอยเทศบาล 26 จับคู่แวะ Saalow ในบริเวณเดียวกัน",
    hours: "09:00–20:00 ทุกวัน ตาม Ryoii",
    source: "https://www.ryoiireview.com/restaurant/view/19056",
    credit: "Ryoii · ภาพจาก Facebook จ้ำเข่า",
    image: "jumkhao",
    query: "จ้ำเข่า The Creek ปากช่อง",
    map: "https://www.google.com/maps/search/?api=1&query=14.7074644,101.4224867",
    phone: "0816225183",
  },
  {
    id: "kampan",
    name: "ครัวกำปั่น",
    english: "Krua Kampan",
    kind: "food",
    area: "หมูสี · ถนน 3052",
    description:
      "ร้านอาหารไทยและอีสานในเรือนไทย เหมาะเป็นมื้อเย็นวันที่เข้าที่พัก",
    hours: "09:00–21:00 ทุกวัน ตาม Ryoii",
    source: "https://www.ryoiireview.com/restaurant/view/9544",
    credit: "Ryoii · ภาพจาก Facebook ครัวกำปั่น",
    image: "kampan",
    query: "ครัวกำปั่น เขาใหญ่",
    map: "https://www.google.com/maps/search/?api=1&query=14.5170117,101.4315183",
    travel: "2 นาทีจาก atta · เวลาที่คุณให้มา",
    phone: "0935141599",
  },
  {
    id: "yung",
    name: "ยุ้งข้าว เขาใหญ่",
    english: "Yung Khaow",
    kind: "food",
    area: "ถนนธนะรัชต์",
    description:
      "ร้านอาหารไทยและอาหารใต้บนถนนธนะรัชต์ ใส่เป็นมื้อกลางวันของวันที่สอง",
    hours: "ดูเวลาล่าสุดในแหล่งข้อมูลก่อนเดินทาง",
    source: "https://www.wongnai.com/restaurants/yungkhaowkhaoyai",
    credit: "ภาพและข้อมูล · Wongnai",
    image: "yung",
    query: "ยุ้งข้าว เขาใหญ่",
    map: "https://www.google.com/maps/search/?api=1&query=14.630809,101.410794",
    travel: "23 นาทีจาก atta · เวลาที่คุณให้มา",
  },
  {
    id: "nampla",
    name: "น้ำปลาพริก",
    english: "Krua Nam Pla Phrik",
    kind: "food",
    area: "เขาใหญ่ · ต้องยืนยันรายการร้าน",
    description:
      "พบชื่อครัวน้ำปลาพริก เขาใหญ่ และครัวน้ำปลาพริก ณ เขาใหญ่ในคนละรายการ เก็บเป็นมื้อสำรองจนยืนยันร้านที่คุณหมายถึง",
    hours: "ยังไม่ยืนยัน",
    source: "https://www.wongnai.com/restaurants/2033883lM",
    credit: "ภาพรายการครัวน้ำปลาพริก เขาใหญ่ · Wongnai",
    image: "nampla",
    query: "ครัวน้ำปลาพริก เขาใหญ่",
    note: "ภาพนี้เป็นรายการ 2033883lM ยังไม่ยืนยันว่าตรงกับร้านของคุณ แผนที่เป็นการค้นหาชื่อร้าน",
    travel: "14 นาทีจาก atta · เวลาที่คุณให้มา",
  },
  {
    id: "midwinter",
    name: "Midwinter",
    english: "Dinner at the castle",
    kind: "food",
    area: "เขาใหญ่ · ถนนธนะรัชต์",
    description:
      "ร้านอาหารที่มีทั้งพื้นที่ในอาคารและกลางแจ้ง เลือกจองโต๊ะในร่มสำหรับมื้อเย็นวันที่สอง",
    hours: "ตรวจสอบเวลาและจองกับร้านก่อนเดินทาง",
    source: "https://www.midwinterkhaoyai.com/",
    credit: "ภาพและข้อมูล · Midwinter Khao Yai",
    image: "midwinter",
    query: "Midwinter Khao Yai",
  },
  {
    id: "lagoon",
    name: "Lagoon Cafe",
    english: "A little lakeside pause",
    kind: "cafe",
    area: "ขนงพระ · เขาใหญ่",
    description: "คาเฟ่ริมลากูนและวิวภูเขา แวะช่วงบ่ายวันแรกได้ถ้าอากาศเป็นใจ",
    hours: "ยังไม่มีเวลาเปิดที่ยืนยันได้",
    source: "https://soithong.com/lagoon-cafe-khaoyai/",
    credit: "ภาพและข้อมูล · บันทึกของสร้อยทอง",
    image: "lagoon",
    query: "Lagoon Cafe Khaoyai",
    note: "บทความระบุค่าเข้า 80 บาท แลกค่าอาหารหรือเครื่องดื่มได้ โปรดยืนยันเงื่อนไขล่าสุดกับร้าน",
  },
  {
    id: "safari",
    name: "Safari Matcha Bar",
    english: "Matcha, with a wild side",
    kind: "cafe",
    area: "หมูสี · ธนะรัชต์ กม.18",
    description:
      "มัทฉะบาร์ที่ได้แรงบันดาลใจจากวัฒนธรรมชาญี่ปุ่นและซาฟารี ไปต่อไทรสุกในช่วงเช้าเดียวกัน",
    hours: "09:00–17:00 ทุกวัน ตาม Wongnai",
    source: "https://www.safarimatcha.com/",
    credit: "ภาพและข้อมูล · Safari Matcha เว็บไซต์ร้าน",
    image: "safari",
    query: "Safari Matcha Bar Khaoyai",
    map: "https://maps.app.goo.gl/GQHGogP95TS4Ntrn8",
    phone: "0811595264",
    note: "แหล่งเวลา: https://www.wongnai.com/restaurants/3191192WC-safari-matcha-bar-khaoyai",
  },
  {
    id: "saisook",
    name: "ไทรสุก",
    english: "Sai Sook",
    kind: "cafe",
    area: "หมูสี · เขาใหญ่",
    description:
      "ไอศกรีมโฮมเมดที่เล่าเรื่องสัตว์ป่าเขาใหญ่ผ่านชื่อและสีสันของแต่ละรส",
    hours: "ตรวจสอบเวลาเปิดล่าสุดก่อนเดินทาง",
    source: "https://www.wongnai.com/restaurants/2685164Th",
    credit: "ภาพและข้อมูล · Wongnai",
    image: "saisook",
    query: "ไทรสุก เขาใหญ่",
    map: "https://www.google.com/maps/search/?api=1&query=14.534432,101.384256",
  },
  {
    id: "saalow",
    name: "Saalow",
    english: "Take it saalow",
    kind: "cafe",
    area: "ปากช่อง · บริเวณเดียวกับจ้ำเข่า",
    description:
      "คาเฟ่ติดคลองลำตะคอง มีเครื่องดื่มและเค้ก รีวิวระบุว่าอยู่บริเวณเดียวกับจ้ำเข่า",
    hours: "08:30–19:00 ตามรีวิว · ควรยืนยันกับร้าน",
    source:
      "https://www.lemon8-app.com/@gowithnung/7683110675172655634?region=th",
    credit: "ข้อมูล · ไปกับนุ้ง (Lemon8)",
    query: "Saalow Khaoyai ปากช่อง",
    note: "ผู้รีวิวห้ามใช้ภาพโดยไม่ได้รับอนุญาต เปิดแกลเลอรีต้นฉบับได้จากลิงก์อ้างอิง",
  },
  {
    id: "mallorka",
    name: "Mallorka Khaoyai",
    english: "Mediterranean morning",
    kind: "cafe",
    area: "หมูสี · เขาใหญ่",
    description:
      "คาเฟ่สไตล์เมดิเตอร์เรเนียน อาคารสีครีมและสวน เป็นตัวเลือกสลับกับ Safari และไทรสุก",
    hours: "08:30–17:30 ทุกวัน ตามบทความ",
    source: "https://justroamaround.com/mallorka-khaoyai-review/",
    credit: "ภาพและข้อมูล · Just Roam Around",
    image: "mallorka",
    query: "Mallorka Khaoyai",
    map: "https://maps.app.goo.gl/ZDzMbFANsHc9UdcJ6",
    note: "น่าจะเป็นร้านที่คุณพิมพ์ว่า Mellorka; ยังไม่ได้รับการยืนยันจากคุณ",
  },
  {
    id: "coppia",
    name: "Coppia Caffè & bar",
    english: "An Italian interlude",
    kind: "cafe",
    area: "โป่งตาลอง · Toscana Valley",
    description:
      "กาแฟและค็อกเทลใน Toscana Valley วางเป็นตัวเลือกก่อนกลับเฉพาะเมื่อเส้นทางและเวลาเปิดเหมาะสม",
    hours: "เปิดทุกวัน · เว็บทางการไม่ระบุเวลา",
    source: "https://toscanavalley.com/dining-cafe/coppia-caffe-bar/",
    credit: "ภาพ · rattomarty (Lemon8) / ข้อมูล · Toscana Valley",
    photoSource:
      "https://www.lemon8-app.com/@rattomarty/7408757081484083728?region=th",
    image: "coppia",
    query: "Coppia Caffe bar Toscana Valley",
    map: "https://maps.app.goo.gl/Xneo3CFizMj6hubm8",
    phone: "044756063",
    note: "โทรยืนยันเวลาและการเข้าใช้บริการก่อนเดินทาง เพราะอยู่คนละโซนกับปากช่อง",
  },
];
export const getPlace = (id: string) => places.find((p) => p.id === id)!;
export const mapLink = (p: Place) =>
  p.map ||
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(p.query)}`;
export const days = [
  {
    date: "8",
    day: "พฤหัสบดี",
    title: "ค่อย ๆ เข้าสู่โหมดพักผ่อน",
    subtitle: "ปากช่อง → ขนงพระ → atta",
    note: "เริ่มแพลนเมื่อถึงปากช่อง ไม่กำหนดเวลาออกจากต้นทาง เพราะยังไม่ทราบจุดเริ่มเดินทาง ถ้าฝนตก ข้าม Lagoon แล้วเข้าโรงแรมได้เลย",
    stops: [
      {
        time: "12:00",
        id: "jumkhao",
        label: "มื้อแรกที่ปากช่อง",
        text: "กินกลางวันที่จ้ำเข่า แล้วแวะคาเฟ่ในบริเวณเดียวกัน",
      },
      {
        time: "13:15",
        id: "saalow",
        label: "กาแฟหลังมื้อกลางวัน",
        text: "ให้เวลากาแฟและเค้กประมาณ 45 นาที ก่อนออกจากปากช่อง",
      },
      {
        time: "14:15",
        id: "lagoon",
        label: "แวะได้ ถ้าอากาศเป็นใจ",
        text: "เป็นจุดเสริม ไม่ต้องเร่งให้ทัน ถ้าฝนตกหรือถึงช้าไปพักที่ atta ได้เลย",
        optional: true,
      },
      {
        time: "16:00",
        id: "atta",
        label: "เช็กอิน & พักริมทะเลสาบ",
        text: "ตั้งใจเผื่อช่วงบ่ายไว้ให้โรงแรม เวลาเช็กอินทางการเริ่ม 15:00",
      },
      {
        time: "18:30",
        id: "kampan",
        label: "อาหารไทยใกล้ที่พัก",
        text: "มื้อเย็นสบาย ๆ ตามร้านใกล้ที่พักที่คุณเลือกไว้",
      },
    ],
  },
  {
    date: "9",
    day: "ศุกร์",
    title: "มัทฉะ ไอศกรีม และมื้อเย็นพิเศษ",
    subtitle: "หมูสี → ธนะรัชต์ → กลับมาพัก",
    note: "พยากรณ์มีโอกาสฝน เลือกนั่งในร่ม และโทรจอง Midwinter ช่วงเย็น หากอยากไป Mallorka ให้สลับแทนสองคาเฟ่ช่วงเช้า",
    stops: [
      {
        time: "08:00",
        id: "atta",
        label: "อาหารเช้าที่โรงแรม",
        text: "เว็บโรงแรมระบุอาหารเช้า 06:00–10:30 ตรวจสอบสิทธิ์ในแพ็กเกจที่จอง",
      },
      {
        time: "09:30",
        id: "safari",
        label: "เริ่มวันด้วยมัทฉะ",
        text: "ค่อย ๆ จิบชา ก่อนแวะไอศกรีมต่อ",
      },
      {
        time: "10:45",
        id: "saisook",
        label: "ไอศกรีมกับเรื่องราวสัตว์ป่า",
        text: "เวลา 45 นาทีพอสำหรับแวะชิมและเดินดูร้าน",
      },
      {
        time: "12:15",
        id: "yung",
        label: "มื้อกลางวันอาหารใต้",
        text: "เผื่อเวลากินข้าวแบบไม่รีบ แล้วกลับโรงแรมพักช่วงบ่าย",
      },
      {
        time: "14:00",
        id: "atta",
        label: "บ่ายนี้ให้โรงแรม",
        text: "พักผ่อนแทนการเพิ่มคาเฟ่ และค่อยออกไปมื้อเย็น",
      },
      {
        time: "18:00",
        id: "midwinter",
        label: "มื้อเย็นที่ Midwinter",
        text: "โทรจองและขอโต๊ะในร่มหากมีฝน ไม่รับรองกิจกรรมหรือการแสดงในวันเดินทาง",
      },
    ],
  },
  {
    date: "10",
    day: "เสาร์",
    title: "เก็บอีกหนึ่งบรรยากาศ ก่อนกลับ",
    subtitle: "atta → Toscana Valley (ตัวเลือก) → เดินทางกลับ",
    note: "เช็กเอาต์ไม่เกิน 12:00 Coppia อยู่ฝั่งโป่งตาลอง เลือกไปเมื่อไม่อ้อมเส้นทางกลับและยืนยันเวลาเปิดแล้ว หากกลับผ่านปากช่องให้ข้ามได้",
    stops: [
      {
        time: "08:00",
        id: "atta",
        label: "เช้าสุดท้ายริมทะเลสาบ",
        text: "กินอาหารเช้าและใช้เวลากับวิวที่พัก",
      },
      {
        time: "11:00",
        id: "atta",
        label: "เช็กเอาต์แบบไม่เร่ง",
        text: "เวลาที่เสนอคือ 11:00 ส่วนเวลาเช็กเอาต์ทางการคือ 12:00",
      },
      {
        time: "12:00",
        id: "coppia",
        label: "คาเฟ่ก่อนกลับ · เลือกตามเส้นทาง",
        text: "ยังไม่ยืนยันเวลาเปิด โทรสอบถามก่อนจัดเป็นจุดแวะจริง",
        optional: true,
      },
      {
        time: "13:30",
        id: "nampla",
        label: "มื้อกลางวันสำรอง · รอยืนยันร้าน",
        text: "เลือกได้หลังยืนยันว่าร้านน้ำปลาพริกตรงกับร้านที่คุณหมายถึง และอยู่ในเส้นทางกลับ",
        optional: true,
      },
    ],
  },
];

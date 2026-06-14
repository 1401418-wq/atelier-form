export type Project = {
  id: string;
  slug: string;
  title: { ru: string; en: string };
  shortDescription: { ru: string; en: string };
  area: string;
  year: string;
  location: { ru: string; en: string };
  heroImage: string;
  gallery: string[];
  // Расширенные блоки для страницы кейса:
  brief: { ru: string; en: string };       // задача
  concept: { ru: string; en: string };     // концепция
  highlight?: { ru: string; en: string };  // особенности (если есть)
  partner?: {
    name: { ru: string; en: string };
    url: string;
  };
};

export const projects: Project[] = [
  {
    id: "1",
    slug: "pavelets-city",
    title: { ru: "ЖК Павелецкая Сити", en: "Paveletsky City" },
    shortDescription: {
      ru: "110 м² · Сдержанная палитра, керамогранит и светлое дерево",
      en: "110 m² · Restrained palette, porcelain stoneware and light wood",
    },
    area: "110 м²",
    year: "2026",
    location: { ru: "Москва, ЖК Павелецкая Сити", en: "Moscow, Paveletsky City" },
    heroImage: "/projects/pavelets/01.jpg",
    gallery: Array.from({ length: 15 }, (_, i) => `/projects/pavelets/${String(i + 1).padStart(2, "0")}.jpg`),
    brief: {
      ru: "Просторная семейная квартира — кухня-остров, гостиная с панорамой, мастер-спальня, детская, кабинет, три санузла. Премиум-материалы, спокойная палитра, чистая архитектура.",
      en: "A spacious family apartment — island kitchen, living room with panoramic view, master bedroom, kids' room, study, three bathrooms. Premium materials, restrained palette, clean architecture.",
    },
    concept: {
      ru: "Сдержанная палитра вокруг крупноформатного керамогранита под мрамор и тёплого светлого дерева — материал задаёт масштаб. Контурная подсветка изнутри деревянных плоскостей и скрытая фурнитура превращают функционал в архитектуру.",
      en: "A restrained palette built around large-format marble-look porcelain stoneware and warm light wood — material sets the scale. Contour lighting hidden behind wooden planes and concealed hardware turn functionality into architecture.",
    },
  },
  {
    id: "2",
    slug: "onyx-delux",
    title: { ru: "ЖК ONYX Delux", en: "ONYX Delux" },
    shortDescription: {
      ru: "76 м² · Тёплый минимализм без декоративного шума",
      en: "76 m² · Warm minimalism without decorative noise",
    },
    area: "76 м²",
    year: "2024",
    location: { ru: "Москва, ЖК ONYX Delux", en: "Moscow, ONYX Delux" },
    heroImage: "/projects/onyx/01.jpg",
    gallery: Array.from({ length: 7 }, (_, i) => `/projects/onyx/${String(i + 1).padStart(2, "0")}.jpg`),
    brief: {
      ru: "Заказчик хотел простор и тишину — без декоративного шума.",
      en: "The client wanted space and silence — without decorative noise.",
    },
    concept: {
      ru: "Минимализм с тёплой серо-бежевой палитрой и светлым дубовым паркетом ёлочкой как основным «дыханием» пространства.",
      en: "Minimalism with a warm grey-beige palette and light oak herringbone parquet as the main 'breath' of the space.",
    },
    highlight: {
      ru: "Без визуальных перегородок и видимой фурнитуры — все системы хранения скрыты в плоскости стен, мебель парящая, пол читается как единая поверхность.",
      en: "No visual partitions and no visible hardware — all storage is concealed in the wall plane, furniture floats, the floor reads as a single surface.",
    },
    partner: {
      name: { ru: "Феликс Ремонт", en: "Felix Remont" },
      url: "https://felixremont.com",
    },
  },
  {
    id: "3",
    slug: "dynasty",
    title: { ru: "ЖК Династия", en: "Dynasty" },
    shortDescription: {
      ru: "44 м² · Перепланировка однушки в двухзонную квартиру",
      en: "44 m² · Studio reworked into a two-zone apartment",
    },
    area: "44 м²",
    year: "2022",
    location: { ru: "Москва, ЖК Династия", en: "Moscow, Dynasty" },
    heroImage: "/projects/dynasty/01.jpg",
    gallery: Array.from({ length: 9 }, (_, i) => `/projects/dynasty/${String(i + 1).padStart(2, "0")}.jpg`),
    brief: {
      ru: "Из однокомнатной квартиры 44 м² сформировать полноценную закрытую спальню без потери жилых функций.",
      en: "Turn a 44 m² studio into a full closed bedroom without losing any of the living functions.",
    },
    concept: {
      ru: "Тихая роскошь — без манерной классики и без модного сканди. Основа палитры — тёплый бежевый и светлый дуб, акценты — тёмный графит в санузле и медь в столовой группе. Текстуры подобраны контрастно: гладкий камень против бархата и мягкого ворса. Свет многосценарный: контурная подсветка периметра, точки над функциональными зонами, отдельные сценарии для гостиной и спальни.",
      en: "Quiet luxury — without mannered classics and without trendy Scandi. The palette is warm beige and light oak; accents are dark graphite in the bathroom and copper in the dining group. Textures contrast intentionally: smooth stone against velvet and soft pile. Multi-scenario lighting: perimeter cove, accents over functional zones, separate scenarios for the living room and bedroom.",
    },
    highlight: {
      ru: "Перепланировка 1→2 функциональные зоны — из однушки сделали закрытую спальню и студийную гостиную-столовую-кухню без потери жилых функций.",
      en: "Replanning 1→2 functional zones — the studio became a closed bedroom plus an open-plan living-dining-kitchen, with all living functions preserved.",
    },
    partner: {
      name: { ru: "Феликс Ремонт", en: "Felix Remont" },
      url: "https://felixremont.com",
    },
  },
];

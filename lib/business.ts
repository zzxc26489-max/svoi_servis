// Единый источник правды для данных компании. Эти значения должны
// дословно совпадать с карточкой на Яндекс.Картах (NAP-консистентность
// важна и для доверия клиентов, и для локального SEO).

export type Master = {
  name: string;
  specialty: string;
  phoneDisplay: string;
  phoneHref: string;
};

export const BUSINESS = {
  name: "Много Техники",
  address: {
    street: "Жилинская ул., 13, стр. 1",
    locality: "рп. Андреевка",
    region: "городской округ Солнечногорск, Московская область",
    full: "Жилинская ул., 13, стр. 1, рп. Андреевка, городской округ Солнечногорск, Московская область",
  },
  hours: "Ежедневно 9:00–22:00",
  yandexMapsUrl: "https://yandex.ru/maps/org/mnogo_tekhniki/136163852709/",
  // Основной фокус — Андреевка и Зеленоград, но выезжаем и дальше, если
  // это приносит заявки. Держим одним списком, чтобы гео-упоминания на
  // сайте (Hero, Footer, schema.org) не расходились.
  primaryAreas: ["Андреевка", "Зеленоград"],
  extendedAreas: ["Солнечногорск", "Красногорск", "Химки", "Лобня"],
  // Данные карточки на Яндекс.Картах. Обновлять вручную вместе с
  // карточкой — цифры показываются на сайте как есть.
  rating: {
    value: 4.5,
    ratingsCount: 16,
    reviewsCount: 11,
  },
} as const;

export type PriceItem = {
  title: string;
  price: number;
  note?: string;
};

export type PriceGroup = {
  category: string;
  items: PriceItem[];
};

// Прайс дословно совпадает с разделом «Товары и услуги» на
// Яндекс.Картах — расхождение цен между сайтом и картой быстро
// превращается в спор с клиентом на пороге.
export const PRICES: PriceGroup[] = [
  {
    category: "Холодильники",
    items: [
      { title: "Диагностика и ремонт холодильников", price: 500 },
      { title: "Ремонт холодильника No Frost", price: 1000 },
      { title: "Заправка и ремонт холодильного контура", price: 2000 },
    ],
  },
  {
    category: "Стиральные машины",
    items: [
      { title: "Диагностика и ремонт стиральных машин", price: 500 },
      { title: "Не сливает воду", price: 500 },
      { title: "Не греет воду", price: 500 },
      { title: "Замена подшипников", price: 5000 },
    ],
  },
  {
    category: "Посудомоечные машины",
    items: [
      { title: "Диагностика и ремонт посудомоечных машин", price: 500 },
      { title: "Не сливает воду", price: 500 },
      { title: "Не греет воду", price: 500 },
    ],
  },
];

export const MASTERS: Master[] = [
  {
    name: "Дмитрий",
    specialty: "Холодильники",
    phoneDisplay: "+7 999 096-08-46",
    phoneHref: "+79990960846",
  },
  {
    name: "Андрей",
    specialty: "Стиральные машины",
    phoneDisplay: "+7 901 743-37-96",
    phoneHref: "+79017433796",
  },
  {
    name: "Андрей",
    specialty: "Посудомоечные машины",
    phoneDisplay: "+7 991 943-85-04",
    phoneHref: "+79919438504",
  },
];

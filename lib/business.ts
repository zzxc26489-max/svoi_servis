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
  // Тот же режим числами — для живого статуса «открыто/закрыто» и для
  // schema.org. Держим рядом со строкой `hours`, чтобы текст на сайте
  // и логика не разъехались при правке.
  hoursRange: { opens: 9, closes: 22 },
  // Часовой пояс точки. Статус работы считаем по времени мастерской, а
  // не по времени посетителя — иначе клиент из другого пояса увидит
  // «закрыто», когда мастер на связи.
  timeZone: "Europe/Moscow",
  yandexMapsUrl: "https://yandex.ru/maps/org/mnogo_tekhniki/136163852709/",
  // Личный рабочий аккаунт — сюда пишут клиенты по заявкам.
  telegramUrl: "https://t.me/Svoimas",
  // Открытая группа сервиса.
  telegramGroupUrl: "https://t.me/svoiserviz",
  // WhatsApp Андрея (Михалыча), +7 901 743-37-96.
  whatsappUrl: "https://wa.me/79017433796",
  // Основной фокус — Зеленоград (и Ржавки рядом с ним) и Андреевка, но
  // выезжаем и дальше, если это приносит заявки. Ржавки — отдельным
  // пунктом: человек ищет по названию своего района, а не только по
  // «Зеленоград» целиком. Держим одним списком, чтобы гео-упоминания на
  // сайте (Hero, Footer, schema.org) не расходились.
  primaryAreas: ["Зеленоград", "Ржавки", "Андреевка"],
  extendedAreas: ["Солнечногорск", "Красногорск", "Химки", "Лобня"],
  // Данные карточки на Яндекс.Картах. Обновлять вручную вместе с
  // карточкой — цифры показываются на сайте как есть. reviewsCount
  // должен совпадать с REVIEWS.length (добавили 4 новых отзыва
  // 23 августа — стало 15). ratingsCount и value — общая оценка
  // карточки, её отдельно не пересчитать по одним лишь текстам
  // отзывов, обновлять по факту с самой карточки.
  rating: {
    value: 4.5,
    ratingsCount: 16,
    reviewsCount: 15,
  },
} as const;

/** Направления совпадают с категориями в PRICES — чтобы фильтр в
    архиве и прайс не разошлись по названиям. */
export type WorkCategory =
  | "Холодильники"
  | "Стиральные машины"
  | "Посудомоечные машины";

export type WorkPhoto = {
  /** Путь от корня public, например /works/fridge-01.webp */
  src: string;
  /** Что на фото — обязателен: и для доступности, и для SEO. */
  alt: string;
  caption?: string;
  category: WorkCategory;
  /** Крошечная блюр-версия (base64) — показывается, пока грузится
      полный файл, чтобы вместо пустого прямоугольника было размытое
      превью. Генерируется вместе с самим файлом. */
  blurDataURL: string;
};

// Реальные фото с объектов — присланы владельцем. Формат WebP (легче
// JPEG при том же качестве). Категория (category) совпадает с группами
// в PRICES — фильтр в /works и прайс не расходятся.
export const WORKS: WorkPhoto[] = [
  {
    src: "/works/dishwasher-real-open.webp",
    category: "Посудомоечные машины",
    alt: "Открытая посудомоечная машина с разбрызгивателями при диагностике",
    caption: "Диагностика и ремонт посудомоечных машин",
    blurDataURL:
      "data:image/webp;base64,UklGRnIAAABXRUJQVlA4IGYAAAAwAgCdASoQABAAA4BaJZwAD5PwL8zcJw6BgAD+qyZEzQWx/CzXLHZ1s+9vImif2lK9JDDE4CZyP1gAP0zSeRjuq9NN/VKc8mBuBxYCm8SFKN1HhLYK6cl7bzmM4ymXkQ9z14+PwAA=",
  },
  {
    src: "/works/fridge-real-finished-samsung.webp",
    category: "Холодильники",
    alt: "Холодильник Samsung после ремонта",
    caption: "Диагностика и ремонт холодильников",
    blurDataURL:
      "data:image/webp;base64,UklGRmgAAABXRUJQVlA4IFwAAADwAQCdASoQABAAA4BaJZACsACgx7/zyAAA/q3dqh1LginUBoLmUMXNi963lqW8gxW40sSph7Uvwp6D1batRvUwahvP51NVijHh8cPXdzmabpVzHOLuVYM3aJYAAA==",
  },
  {
    src: "/works/fridge-real-tester.webp",
    category: "Холодильники",
    alt: "Диагностика холодильного контура многофункциональным тестером",
    caption: "Заправка и ремонт холодильного контура",
    blurDataURL:
      "data:image/webp;base64,UklGRoAAAABXRUJQVlA4IHQAAACQAQCdASoQABAAA4BaJbACdABAZAAA/rx6fCzXuhmgBwUMkku0Yllr0DGXF9cD0OztvRpUtZyCKoHbZQFUrA5pWN7gqckYCD5fCSD4MztK4nSQL9i/JgY6CpveYc6oykYV4go7vOx7dsytOus5R5bP7MAAAA==",
  },
  {
    src: "/works/fridge-real-frost-1.webp",
    category: "Холодильники",
    alt: "Иней на испарителе холодильника",
    caption: "Ремонт холодильника No Frost",
    blurDataURL:
      "data:image/webp;base64,UklGRmgAAABXRUJQVlA4IFwAAAAwAgCdASoQABAAA4BaJagCdADbrdaluQ57gAD9m2HjhgisLLLFa6NrbjRWrKfoz01bu9wes8/UKzaoisWUg6z5Nexeh6fzByuGbW8HwXPLo51VpWt1wJn0GAAAAA==",
  },
  {
    src: "/works/fridge-real-interior-open.webp",
    category: "Холодильники",
    alt: "Диагностика многокамерного холодильника изнутри",
    caption: "Диагностика и ремонт холодильников",
    blurDataURL:
      "data:image/webp;base64,UklGRm4AAABXRUJQVlA4IGIAAABwAgCdASoQABAAA4BaJYgC7AYwnlM+MrWcb/9AAN5XMGiOcVUIjTNOGRfeXoAx49nBhsGkiiv12GiLh7eliw+ps5anLCwY/45kvTXzPafb6ucYlHrByn2v0uVl/X54JgAAAA==",
  },
  {
    src: "/works/fridge-real-board-removed.webp",
    category: "Холодильники",
    alt: "Демонтированный компрессор холодильника перед заменой",
    caption: "Замена компрессора",
    blurDataURL:
      "data:image/webp;base64,UklGRm4AAABXRUJQVlA4IGIAAADwAQCdASoQABAAA4BaJZQCsAD6QaSXFcAA/uos6HO1Eacj1gf1swZo9aGBmfivkXLVyM1lMEM11Q++H9hb/RGBKtnYNeODSh85Pwrn45P9xIw0SbyP/vym90X/v1BuLvxAAA==",
  },
  {
    src: "/works/fridge-real-finished-eigen-2.webp",
    category: "Холодильники",
    alt: "Диагностика платы управления холодильника",
    caption: "Диагностика и ремонт холодильников",
    blurDataURL:
      "data:image/webp;base64,UklGRoQAAABXRUJQVlA4IHgAAAAwAgCdASoQABAAA4BaJZACdAYu52uts63eEAD+7Sgp/+5g29IbXhoqcRPsL84TXRLnvHczzKPfLh3crGD4BTSAXd7TepzyZUBmMzWYDdSPJdYqzmJYxqonHMmVy06tI+YOpiHgHe+fdcEUGEGQkWIADoim7JjcAAA=",
  },
  {
    src: "/works/fridge-real-compressor-5.webp",
    category: "Холодильники",
    alt: "Обледеневший вентилятор в морозильной камере",
    caption: "Ремонт холодильника No Frost",
    blurDataURL:
      "data:image/webp;base64,UklGRlAAAABXRUJQVlA4IEQAAADwAQCdASoQABAAA4BaJZQCdAC2OcVOswAA+p6DyXRh0Cgvkhwz9oVgU8d1tvL+z4q0R7rDFrNm1xfvIXbu2E4bcu+gAA==",
  },
  {
    src: "/works/fridge-real-frost-2.webp",
    category: "Стиральные машины",
    alt: "Блокировка люка стиральной машины, снятая для замены",
    caption: "Диагностика и ремонт стиральных машин",
    blurDataURL:
      "data:image/webp;base64,UklGRmoAAABXRUJQVlA4IF4AAABQAgCdASoQABAAA4BaJQBdgMXN1N0Lsb5/GgAA/vGDrxDrjggYLuURCfthUrbu/tUE97tE9dEAo5teFE143O4kj436/G7e59+5N/bcRiMGDs4RniPUUVyIeLHRI8AA",
  },
  {
    src: "/works/fridge-real-frost-fan.webp",
    category: "Холодильники",
    alt: "Компрессор холодильника, установленный при ремонте",
    caption: "Замена компрессора",
    blurDataURL:
      "data:image/webp;base64,UklGRnQAAABXRUJQVlA4IGgAAACQAgCdASoQABAAA4BaJaACdGuADz3vu0XY+r7bQAD+SJ4EHmwqqpoxp36bVQ0+KXBsSU9klGS4uQc9NVSRT4Lt8b/LoeaDx26MOo6LnuEByIWRbyeZ5z7q655mlQKrO4uzYH6ipJAAAA==",
  },
  {
    src: "/works/fridge-real-finished-liebherr.webp",
    category: "Холодильники",
    alt: "Холодильники Liebherr после ремонта",
    caption: "Диагностика и ремонт холодильников",
    blurDataURL:
      "data:image/webp;base64,UklGRmAAAABXRUJQVlA4IFQAAAAQAgCdASoQABAAA4BaJaQAApIHKJf7dTAAAMrxg1TlWcr6jUFz00+ztqFGSW/D7a+EO1ft1y18utQJLeptaaqLWwpKNNS99QISvtXLtK+Km3oAAAA=",
  },
  {
    src: "/works/washer-real-finished-samsung.webp",
    category: "Стиральные машины",
    alt: "Стиральная машина Samsung после ремонта",
    caption: "Диагностика и ремонт стиральных машин",
    blurDataURL:
      "data:image/webp;base64,UklGRngAAABXRUJQVlA4IGwAAABQAgCdASoQABAAA4BaJYwC7AYvDwLNWtv6x2AA/ut3iIcbhQC9sdYDgoB1CCyjDQmSO1pSRHawwwRFI4fNxiqBBhH6iRxZqk38fiEOzaYzPJQOZ4f/nAdtuuGMErhw/LahKP5JzYcO4fjt0AA=",
  },
  {
    src: "/works/fridge-real-diagnostics.webp",
    category: "Холодильники",
    alt: "Диагностика платы управления и компрессора холодильника мультиметром и манометрами",
    caption: "Диагностика и ремонт холодильников",
    blurDataURL:
      "data:image/webp;base64,UklGRnQAAABXRUJQVlA4IGgAAABQAgCdASoQABAAA4BaJaACdAEXyO6gj2Aa/AAA/uz+z6hXVGgp1bm70IM3y4VQxK4CjjHM2imNyCE7AVKa4cowJlityPfm8kpEcikqRwu6tHtRbvL0Pv/JGo2eChMEQ918d+VEj6AAAA==",
  },
  {
    src: "/works/fridge-real-nofrost.webp",
    category: "Холодильники",
    alt: "Наледь на испарителе холодильника — типичная неисправность системы No Frost",
    caption: "Ремонт холодильника No Frost",
    blurDataURL:
      "data:image/webp;base64,UklGRkwAAABXRUJQVlA4IEAAAAAQAgCdASoQABAAA4BaJZQCdAD0sfBg0TAAAPx4zVRBfUZxdjm8fi1T4IvIXL+BGdPRcUrcFioDm3tXmB+EoAAA",
  },
  {
    src: "/works/fridge-real-refrigerant-1.webp",
    category: "Холодильники",
    alt: "Заправка холодильного контура — манометры показывают давление фреона",
    caption: "Заправка и ремонт холодильного контура",
    blurDataURL:
      "data:image/webp;base64,UklGRnAAAABXRUJQVlA4IGQAAACQAgCdASoQABAAA4BaJbACdAYv1vQ00VSFEnOwAAD+vJCW1nTsXzfMPfP8/2otjyvc+KohKtIAJlxqMD5HGJM3SHA6CjxoMQIiQGLTMJ3mBJyyPdL6CrOBqEP7SpIceefG0iAA",
  },
  {
    src: "/works/fridge-real-refrigerant-2.webp",
    category: "Холодильники",
    alt: "Проверка давления в контуре холодильника манометрической станцией",
    caption: "Заправка и ремонт холодильного контура",
    blurDataURL:
      "data:image/webp;base64,UklGRngAAABXRUJQVlA4IGwAAADQAQCdASoQABAAA4BaJQBOgBxc51HwoAD+iTKZZfVN1UCIJLQ1VD2AhjjNy+h9hsJrBzVVXx8XQcDMVXhcCN4QmzuGJQ2jktJ9RA/6GB4ZyG0vLsr41k3gqiKSyUxc9Tm8lDQmyZJwXJ0OhAA=",
  },
  {
    src: "/works/fridge-real-compressor-1.webp",
    category: "Холодильники",
    alt: "Замена компрессора холодильника",
    caption: "Замена компрессора",
    blurDataURL:
      "data:image/webp;base64,UklGRnQAAABXRUJQVlA4IGgAAACQAgCdASoQABAAA4BaJQBOgMYJz+FMkofY3UBEAAD+0i7h7G+gzutMHr5i5PVcQqfCx014B27hZ06yLR2WRUuQn4cq40d6RC34Lg+e/NilSJPAvZUNiuWl36+6sa9OKzvuY/1C+SDyAA==",
  },
  {
    src: "/works/fridge-real-compressor-2.webp",
    category: "Холодильники",
    alt: "Демонтированный компрессор холодильника перед заменой",
    caption: "Замена компрессора",
    blurDataURL:
      "data:image/webp;base64,UklGRnQAAABXRUJQVlA4IGgAAABQAgCdASoQABAAA4BaJZwAD43uL56POs6tqAAA/q2v0pwIwlx3v+dAYLKVDOC1JTA8ndIAa5etKtiHNapa5Yd5eXY6SHSJiy1N7+v/7x4QN9fCOlHKqmb6ykVHik2et0+ICUqLKiAAAA==",
  },
  {
    src: "/works/washer-real-drum-1.webp",
    category: "Стиральные машины",
    alt: "Разобранная стиральная машина — доступ к баку и подшипникам",
    caption: "Диагностика и ремонт стиральных машин",
    blurDataURL:
      "data:image/webp;base64,UklGRpYAAABXRUJQVlA4IIoAAABwAgCdASoQABAAA4BaJZwC7AaebnD1GtwgosKAAP5mv+iCb/1RnLk+97MlJO7Y8pDRXLL3SRNXwvny1+2qP3t5KhlrelyzwxXcin/0BqPb2Jq8ANVAHiuU3lRdgtlNhwZwROYRnbNIVyt5IA278QuUpgxEE/j60HSsSL5DbCczj1XY5RrGpoKIAAA=",
  },
  {
    src: "/works/washer-real-drum-2.webp",
    category: "Стиральные машины",
    alt: "Барабан стиральной машины снят с корпуса для замены подшипников",
    caption: "Замена подшипников стиральной машины",
    blurDataURL:
      "data:image/webp;base64,UklGRoAAAABXRUJQVlA4IHQAAAAQAgCdASoQABAAA4BaJQBOgMW0xW9g1OBQAM4wo5yx7fitqItR9j50yJ2cEWKP9EClhZx+zRRrTjHSbwE5jiHAr93nKI9MsGrcL7z4W6b5vJg2LOPVfB4Xx2zBcuePd2v0CpGXMxKbIv22U1hcAYKaZ8AAAA==",
  },
  {
    src: "/works/washer-real-heating-element.webp",
    category: "Стиральные машины",
    alt: "Нагревательный элемент стиральной машины, снятый из-за накипи",
    caption: "Стиральная машина не греет воду",
    blurDataURL:
      "data:image/webp;base64,UklGRngAAABXRUJQVlA4IGwAAABwAgCdASoQABAAA4BaJYwCsAYtVwTBFHj5h5cAAP7Q5pUfzhe+jTOGHdLF2wVm4ymrY5EbQE3L3TMS+fQVypuWQPlZP5xfKZMly3KZNUU4QQlPZ9PjKsN5niLHczndtifnkCEFSkNhfP3gAAA=",
  },
  {
    src: "/works/washer-real-finished-bosch.webp",
    category: "Стиральные машины",
    alt: "Стиральная машина Bosch после ремонта",
    caption: "Диагностика и ремонт стиральных машин",
    blurDataURL:
      "data:image/webp;base64,UklGRm4AAABXRUJQVlA4IGIAAAAQAgCdASoQABAAA4BaJZQAAtipEeNSli+AAPH70amE4SA1dXKX0luYSG+4CmjSsXlEDdaeVPvAjlmK7g7RXdf5vapIFUpUNIM0EjF8/fZf5F8+Xa94EkqxpEpLJEW8bmB4AA==",
  },
  {
    src: "/works/washer-real-finished-siemens.webp",
    category: "Стиральные машины",
    alt: "Стиральная машина Siemens после ремонта",
    caption: "Диагностика и ремонт стиральных машин",
    blurDataURL:
      "data:image/webp;base64,UklGRnIAAABXRUJQVlA4IGYAAABQAgCdASoQABAAA4BaJZQCdAYwTvIZsgCGUAAA/t9HUEaPUb71VfWjXBowaZ8aQOVAA737r2lUq/e+CUVz/YHH5TxEmNGgL7mGrTT/zQmgTU67QRH+6eOhUESKov1R4OhiDi5AAAA=",
  },
  {
    src: "/works/dishwasher-real-pump.webp",
    category: "Посудомоечные машины",
    alt: "Сливной насос посудомоечной машины при ремонте",
    caption: "Посудомоечная машина не сливает воду",
    blurDataURL:
      "data:image/webp;base64,UklGRowAAABXRUJQVlA4IIAAAABQAgCdASoQABAAA4BaJYgCw7YozK3vquncNEAA9kbiQh19YxP4yoL0jNmkculBNd7p4+k/O+bGe8FFiuEYKk10fi/rWerGOB0Q/IqdaG2+GEP3QbpVKS70P+XltHULrmEDbU1wUfuBmEQWtAUru5R+bDRU+dcBQAs10hfZMAAAAA==",
  },
];

// Для карусели на главной берём по несколько фото на каждое
// направление, а не весь массив — иначе с ростом архива карусель
// раздувается и один перекос (сейчас — холодильники) съедает всю
// ленту. Полный список без ограничений — в архиве /works.
const FEATURED_WORKS_PER_CATEGORY = 3;

// Список через запятую, последний пункт — через «и»: «А, Б и В».
// join(" и ") на 3+ пунктах даёт «А и Б и В» — так по-русски не говорят.
export function joinRu(items: readonly string[]): string {
  if (items.length <= 1) return items.join("");
  return `${items.slice(0, -1).join(", ")} и ${items[items.length - 1]}`;
}

export function getFeaturedWorks(): WorkPhoto[] {
  const perCategory = new Map<WorkCategory, number>();
  const featured: WorkPhoto[] = [];
  for (const work of WORKS) {
    const count = perCategory.get(work.category) ?? 0;
    if (count >= FEATURED_WORKS_PER_CATEGORY) continue;
    featured.push(work);
    perCategory.set(work.category, count + 1);
  }
  return featured;
}

export type Review = {
  author: string;
  text: string;
  /** Техника, если клиент назвал её в отзыве. Не додумываем. */
  tag?: string;
  /** Оценка в звёздах — только если владелец её явно назвал для этого
      отзыва. Для старых отзывов её не знаем, додумывать не будем — тогда
      просто не показываем звёзды на карточке. */
  rating?: number;
};

// Отзывы с карточки на Яндекс.Картах, дословно. Даты и уровни
// «Знатока города» не показываем — по просьбе владельца.
export const REVIEWS: Review[] = [
  {
    author: "Инкогнито 9742",
    rating: 5,
    tag: "Холодильник",
    text: "Прекрасное место, мастер Андрей и Дмитрий знают свое дело, умеют чинить как стиральные машины, так и холодильники, работают прозрачно и честно. Починили холодильник быстро и с первого раза, уже 10 месяцев после ремонта и никаких проблем!!! Все детально объясняют, показывают наглядно и на примерах, в общем рекомендую, реально классные ребята!",
  },
  {
    author: "Елена Морошкина",
    rating: 5,
    tag: "Посудомоечная машина",
    text: "Выражаем благодарность мастеру Дмитрию. Сломалась посудомоечная машина. Мастер приехал в назначенное время, провел диагностику, ремонт. Всё быстро, профессионально, аккуратно. Спасибо большое.",
  },
  {
    author: "Владимир П.",
    rating: 5,
    tag: "Стиральная машина",
    text: "Отличный сервис, все делают по совести, без развода на лишний ремонт, починили стиралку оперативно в срок, огромное спасибо мастеру Андрею!!!",
  },
  {
    author: "dronake27",
    rating: 5,
    tag: "Посудомоечная машина",
    text: "Привез посудомойку с поломкой (не грела воду) мастер Андрей все объяснил и предложил несколько вариантов замены ТЭНА. Я согласился. Срок ремонта обозначили в 5 дней. Через 3 дня все было готово.",
  },
  {
    author: "Владимир М.",
    rating: 5,
    text: "Отличная мастерская. Всё сделали быстро и качественно. Все вопросы и проблемы решили. Отличные специалисты, рекомендую. Цена и качество отличное.",
  },
  {
    author: "Мария Архипова",
    rating: 5,
    tag: "Стиральная машина",
    text: "Мастер Андрей починил стиральную машинку качественно. Отлично работает до сих пор. Цену не накручивает. Так же давала его координаты многим знакомым — все остались довольны. Рекомендую.",
  },
  {
    author: "Алина Б.",
    rating: 5,
    text: "Прекрасное место, мастера знают толк. Все починили в срок. Все работает, все супер!",
  },
  {
    author: "Ульяна С.",
    rating: 5,
    tag: "Стиральная машина",
    text: "Мастер Андрей помог в решении проблемы с поломанной стиральной машиной!!! Все вопросы решили!!! Профессионально, быстро!!! Большое спасибо!!!",
  },
  {
    author: "Галина Лукашенко",
    rating: 5,
    tag: "Стиральная машина",
    text: "Приобрела стиральную машинку, работает отлично уже 3 года, спасибо мастерам!!!",
  },
  {
    author: "Оксана З.",
    rating: 5,
    text: "Отличный мастер, сделал все быстро. Большое спасибо! Рекомендую!",
  },
  {
    author: "Андрей Андреев",
    rating: 5,
    text: "Отличная организация, ремонт быстрый и качественный.",
  },
  {
    author: "Вера Бобкова",
    tag: "Холодильник",
    rating: 5,
    text: "Холодильник Samsung, сильно трещал и выключался. Обратились к ним, мастер Дмитрий проконсультировал по телефону о возможных причинах неисправности, быстро приехал, сделал диагностику и ремонт. Итог: холодильник снова исправен. Быстро и качественно. А главное, очень понятно все объяснил в процессе. В общем рекомендую однозначно!",
  },
  {
    author: "Жанна Сергеева",
    tag: "Морозильный ларь",
    rating: 5,
    text: "Отличные мастера, отличные ребята, ремонтировала у них морозильный ларь, все сделали качественно, быстро и как оговаривали в срок. Грязь не развили и все за собой убрали. Дмитрий (мастер) все показал, что сломалось, сориентировал по ценам. Грамотные, вежливые мастера. С хорошим ценами. Если, что в доме из техники сломается, то только к ним. Всем советую.",
  },
  {
    author: "Полина Сергеева",
    rating: 5,
    text: "Огромная благодарность Дмитрию. Очень качественная работа.",
  },
  {
    author: "иосиф Бугров",
    rating: 5,
    text: "Ребята очень молодцы очень хорошо всё сделали и не дорого.",
  },
];

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
      { title: "Замена компрессора", price: 3500 },
      { title: "Замена термостата/датчика", price: 1200 },
      { title: "Чистка дренажной системы", price: 900 },
    ],
  },
  {
    category: "Стиральные машины",
    items: [
      { title: "Диагностика и ремонт стиральных машин", price: 500 },
      { title: "Не сливает воду", price: 500 },
      { title: "Не греет воду", price: 500 },
      { title: "Замена подшипников", price: 5000 },
      { title: "Замена ТЭНа", price: 1200 },
      { title: "Замена помпы", price: 1300 },
      { title: "Замена ремня привода", price: 900 },
    ],
  },
  {
    category: "Посудомоечные машины",
    items: [
      { title: "Диагностика и ремонт посудомоечных машин", price: 500 },
      { title: "Не сливает воду", price: 500 },
      { title: "Не греет воду", price: 500 },
      { title: "Замена ТЭНа", price: 1200 },
      { title: "Замена насоса", price: 1500 },
      { title: "Чистка форсунок/фильтра", price: 900 },
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

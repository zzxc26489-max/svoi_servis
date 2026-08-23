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
  // Основной фокус — Зеленоград и Андреевка, но выезжаем и дальше, если
  // это приносит заявки. Держим одним списком, чтобы гео-упоминания на
  // сайте (Hero, Footer, schema.org) не расходились.
  primaryAreas: ["Зеленоград", "Андреевка"],
  extendedAreas: ["Солнечногорск", "Красногорск", "Химки", "Лобня"],
  // Данные карточки на Яндекс.Картах. Обновлять вручную вместе с
  // карточкой — цифры показываются на сайте как есть.
  rating: {
    value: 4.5,
    ratingsCount: 16,
    reviewsCount: 11,
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

export type Review = {
  author: string;
  text: string;
  /** Техника, если клиент назвал её в отзыве. Не додумываем. */
  tag?: string;
};

// Отзывы с карточки на Яндекс.Картах, дословно. Даты и уровни
// «Знатока города» не показываем — по просьбе владельца.
export const REVIEWS: Review[] = [
  {
    author: "Инкогнито 9742",
    tag: "Холодильник",
    text: "Прекрасное место, мастер Андрей и Дмитрий знают свое дело, умеют чинить как стиральные машины, так и холодильники, работают прозрачно и честно. Починили холодильник быстро и с первого раза, уже 10 месяцев после ремонта и никаких проблем!!! Все детально объясняют, показывают наглядно и на примерах, в общем рекомендую, реально классные ребята!",
  },
  {
    author: "Елена Морошкина",
    tag: "Посудомоечная машина",
    text: "Выражаем благодарность мастеру Дмитрию. Сломалась посудомоечная машина. Мастер приехал в назначенное время, провел диагностику, ремонт. Всё быстро, профессионально, аккуратно. Спасибо большое.",
  },
  {
    author: "Владимир П.",
    tag: "Стиральная машина",
    text: "Отличный сервис, все делают по совести, без развода на лишний ремонт, починили стиралку оперативно в срок, огромное спасибо мастеру Андрею!!!",
  },
  {
    author: "dronake27",
    tag: "Посудомоечная машина",
    text: "Привез посудомойку с поломкой (не грела воду) мастер Андрей все объяснил и предложил несколько вариантов замены ТЭНА. Я согласился. Срок ремонта обозначили в 5 дней. Через 3 дня все было готово.",
  },
  {
    author: "Владимир М.",
    text: "Отличная мастерская. Всё сделали быстро и качественно. Все вопросы и проблемы решили. Отличные специалисты, рекомендую. Цена и качество отличное.",
  },
  {
    author: "Мария Архипова",
    tag: "Стиральная машина",
    text: "Мастер Андрей починил стиральную машинку качественно. Отлично работает до сих пор. Цену не накручивает. Так же давала его координаты многим знакомым — все остались довольны. Рекомендую.",
  },
  {
    author: "Алина Б.",
    text: "Прекрасное место, мастера знают толк. Все починили в срок. Все работает, все супер!",
  },
  {
    author: "Ульяна С.",
    tag: "Стиральная машина",
    text: "Мастер Андрей помог в решении проблемы с поломанной стиральной машиной!!! Все вопросы решили!!! Профессионально, быстро!!! Большое спасибо!!!",
  },
  {
    author: "Галина Лукашенко",
    tag: "Стиральная машина",
    text: "Приобрела стиральную машинку, работает отлично уже 3 года, спасибо мастерам!!!",
  },
  {
    author: "Оксана З.",
    text: "Отличный мастер, сделал все быстро. Большое спасибо! Рекомендую!",
  },
  {
    author: "Андрей Андреев",
    text: "Отличная организация, ремонт быстрый и качественный.",
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

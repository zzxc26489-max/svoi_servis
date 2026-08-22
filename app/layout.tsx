import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";
import { buildLocalBusinessSchema } from "@/lib/structuredData";
import PreviewBanner from "@/components/PreviewBanner";

// next/font самостоятельно хостит шрифты — нет внешних запросов
// к Google при загрузке страницы, нет скачка шрифта при рендере.
const inter = Inter({
  subsets: ["cyrillic", "latin"],
  variable: "--font-body",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["cyrillic", "latin"],
  weight: ["600", "700", "800"],
  variable: "--font-display",
  display: "swap",
});

const isPreview = process.env.NEXT_PUBLIC_PREVIEW === "true";

export const metadata: Metadata = {
  title: "Свой Сервис — ремонт бытовой техники в Андреевке и Зеленограде",
  description:
    "Ремонт холодильников, стиральных и посудомоечных машин в Андреевке, Зеленограде и рядом. Диагностика от 500 ₽, выезд в день обращения, гарантия на все работы. Рейтинг 4,5 на Яндекс.Картах.",
  keywords: [
    "ремонт холодильников",
    "ремонт стиральных машин",
    "ремонт посудомоечных машин",
    "ремонт бытовой техники",
    "мастер на дом",
    "ремонт бытовой техники Андреевка",
    "ремонт холодильников Зеленоград",
    "ремонт бытовой техники Солнечногорск",
    "ремонт стиральных машин Химки",
    "ремонт холодильников Красногорск",
    "ремонт бытовой техники Лобня",
  ],
  // Черновой предпросмотр на GitHub Pages не должен попадать в поиск —
  // индексировать будем только боевой домен.
  ...(isPreview ? { robots: { index: false, follow: false } } : {}),
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0f1f4d",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const schema = buildLocalBusinessSchema();

  return (
    <html lang="ru" className={`${inter.variable} ${manrope.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
        <PreviewBanner />
        {children}
      </body>
    </html>
  );
}

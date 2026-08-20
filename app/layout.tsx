import type { Metadata } from "next";
import "./globals.css";
import { buildLocalBusinessSchema } from "@/lib/structuredData";

export const metadata: Metadata = {
  title: "Свой Сервис — ремонт бытовой техники в Андреевке и Зеленограде",
  description:
    "Ремонт холодильников, стиральных и посудомоечных машин в Андреевке, Зеленограде и рядом. Свой мастер по каждому направлению, выезд в день обращения, гарантия на все работы.",
  keywords: [
    "ремонт холодильников",
    "ремонт стиральных машин",
    "ремонт посудомоечных машин",
    "ремонт бытовой техники",
    "мастер на дом",
    "ремонт бытовой техники Андреевка",
    "ремонт холодильников Зеленоград",
  ],
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const schema = buildLocalBusinessSchema();

  return (
    <html lang="ru">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
        {children}
      </body>
    </html>
  );
}

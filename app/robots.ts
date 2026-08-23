import type { MetadataRoute } from "next";

// Без этого сборка со статическим экспортом (GITHUB_PAGES=true) падает —
// Next.js не может понять заранее, что здесь нет ничего динамического.
export const dynamic = "force-static";

// Тот же флаg, что уже гасит индексацию в app/layout.tsx для превью на
// GitHub Pages — держим оба места синхронными, иначе превью может
// проиндексироваться через сам robots.txt, даже если метатег запрещал.
const isPreview = process.env.NEXT_PUBLIC_PREVIEW === "true";
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

export default function robots(): MetadataRoute.Robots {
  if (isPreview) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }

  return {
    rules: { userAgent: "*", allow: "/" },
    ...(siteUrl ? { sitemap: `${siteUrl}/sitemap.xml` } : {}),
  };
}

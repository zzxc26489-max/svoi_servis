const isGithubPages = process.env.GITHUB_PAGES === "true";
// Меняйте вместе с именем репозитория, если оно изменится.
const repoName = "svoi_servis";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Статический экспорт нужен только для превью на GitHub Pages —
  // на «боевом» хостинге (Vercel и т.п.) собираем как обычно, с рабочим
  // /api/order. Собирается через: GITHUB_PAGES=true npm run build
  ...(isGithubPages
    ? {
        output: "export",
        basePath: `/${repoName}`,
        assetPrefix: `/${repoName}/`,
        trailingSlash: true,
        images: { unoptimized: true },
      }
    : {}),
};

export default nextConfig;

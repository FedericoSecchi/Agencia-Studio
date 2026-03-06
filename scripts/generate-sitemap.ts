/**
 * Generates sitemap.xml with all project and topic pages.
 * Run before build: npx tsx scripts/generate-sitemap.ts
 */
import { writeFileSync } from "fs";
import { resolve } from "path";
import { projectIds } from "../src/data/projectIds";
import { projectTopics } from "../src/seo/projectTopics";
import { programmaticTopics } from "../src/seo/programmaticTopics";
import { seoKeywords } from "../src/seo/seoKeywords";

const SITE_URL = "https://somoskosmos.com";

const urls: string[] = [SITE_URL + "/"];

programmaticTopics.forEach((topic) => {
  urls.push(`${SITE_URL}/topic/${topic.slug}`);
});

projectIds.forEach((projectId) => {
  urls.push(`${SITE_URL}/project/${projectId}`);
  projectTopics.forEach((topic) => {
    urls.push(`${SITE_URL}/project/${projectId}/${topic}`);
  });
  seoKeywords.forEach((keyword) => {
    urls.push(`${SITE_URL}/project/${projectId}/${keyword}`);
  });
});

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((url) => `  <url>
    <loc>${url}</loc>
  </url>`).join("\n")}
</urlset>
`;

const outPath = resolve(process.cwd(), "public/sitemap.xml");
writeFileSync(outPath, xml, "utf-8");
console.log(`Generated sitemap with ${urls.length} URLs → ${outPath}`);

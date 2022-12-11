import { API_URL, SITE_URL } from "js/config";
import Links from "js/links";



let cached_ids: number[] = [];
let lastUpdated = new Date(0);
async function getIds(): Promise<number[]> {
  const curDate = new Date();
  const timeSinceUpdated = (Number(curDate) - Number(lastUpdated)) / 1000;

  if (timeSinceUpdated > 3600) {
    const r = await fetch(API_URL + "/posts/ids");
    cached_ids = await r.json();
    lastUpdated = curDate;
  }

  return cached_ids
}

function generateSitemapUrl(path: string, changefreq: string, priority: string) {
  return "<url>" +
    `<loc>${SITE_URL + path}</loc>` +
    `<changefreq>${changefreq}</changefreq>` +
    `<priority>${priority}</priority>` +
  "</url>"
}

export async function GET() {
  const prefix =
    `<?xml version="1.0" encoding="UTF-8"?>` +
      `<urlset ` +
      `xmlns="https://www.sitemaps.org/schemas/sitemap/0.9" ` +
      `xmlns:news="https://www.google.com/schemas/sitemap-news/0.9" ` +
      `xmlns:xhtml="https://www.w3.org/1999/xhtml" ` +
      `xmlns:mobile="https://www.google.com/schemas/sitemap-mobile/1.0" ` +
      `xmlns:image="https://www.google.com/schemas/sitemap-image/1.1" ` +
      `xmlns:video="https://www.google.com/schemas/sitemap-video/1.1" ` +
    ">";
  const suffix = "</urlset>";

  
  const urls: string[] = [];
  urls.push(generateSitemapUrl("/", "monthly","1"));
  urls.push(generateSitemapUrl("/posts", "monthly","1"));
  urls.push(generateSitemapUrl("/info", "monthly","1"));
  urls.push(generateSitemapUrl("/account", "monthly", "1"));
  
  const ids = await getIds();
  for (const id of ids) {
    urls.push(generateSitemapUrl(Links.post(id), "weekly", "0.8"))
  }

  const body = prefix + urls.join("") + suffix;
  return new Response(body, {
    headers: {
      'Cache-Control': 'max-age=3600',
      'Content-Type': 'application/xml',
    },
  })
}
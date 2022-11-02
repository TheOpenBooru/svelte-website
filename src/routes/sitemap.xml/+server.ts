import { API_URL, SITE_URL } from "js/config";


let lastUpdated = new Date(0);
let ids:number[] = [];

async function updateIds(): Promise<number[]> {
  const curDate = new Date()
  const timeSinceUpdated = (Number(curDate) - Number(lastUpdated)) / 1000;
  if (timeSinceUpdated > 3600) {
    const r = await fetch(API_URL + "/posts/ids");
    // ids = await r.json();
    ids = [2922547438, 849676739, 2623644357];
    lastUpdated = new Date();
  }
}

function generateUrlXML(path: string, changefreq: string, priority: string) {
  return "<url>" +
    `<loc>${SITE_URL + path}</loc>` +
    `<changefreq>${changefreq}</changefreq>` +
    `<priority>${priority}</priority>` +
  "</url>"
}

export async function GET() {
  const prefix = `<?xml version="1.0" encoding="UTF-8" ?>
    <urlset
      xmlns="https://www.sitemaps.org/schemas/sitemap/0.9"
      xmlns:news="https://www.google.com/schemas/sitemap-news/0.9"
      xmlns:xhtml="https://www.w3.org/1999/xhtml"
      xmlns:mobile="https://www.google.com/schemas/sitemap-mobile/1.0"
      xmlns:image="https://www.google.com/schemas/sitemap-image/1.1"
      xmlns:video="https://www.google.com/schemas/sitemap-video/1.1"
    >
  `;
  const suffix = "</urlset>";

  await updateIds();
  
  let body = "";
  body += prefix;
  body += generateUrlXML("/", "monthly","1")
  body += generateUrlXML("/posts", "monthly","1")
  body += generateUrlXML("/info", "monthly","1")
  body += generateUrlXML("/account", "monthly","1");
  for (const id of ids) {
    body += generateUrlXML(`/post/${id}`, "monthly", "0.9")
  }
  body += suffix;
  
  return new Response(body, {
    headers: {
      'Cache-Control': 'max-age=3600',
      'Content-Type': 'application/xml',
    },
  })
}
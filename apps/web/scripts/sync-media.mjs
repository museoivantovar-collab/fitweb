/**
 * sync-media.mjs
 * Downloads all media files from the local Payload CMS into public/media/
 * so they are bundled into the static dist/ during `astro build`.
 *
 * Usage: node scripts/sync-media.mjs
 * Run this before `astro build` when generating a dist for Cloudflare Pages.
 */

import { createWriteStream, existsSync, mkdirSync } from "fs";
import { pipeline } from "stream/promises";
import path from "path";
import { fileURLToPath } from "url";

const CMS = process.env.PUBLIC_CMS_URL ?? "http://localhost:3000";
const OUT = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "../public/media"
);

mkdirSync(OUT, { recursive: true });

console.log(`Fetching media list from ${CMS}…`);
const res = await fetch(`${CMS}/api/media?limit=1000&depth=0`);
if (!res.ok) throw new Error(`Failed to list media: ${res.status} ${res.statusText}`);
const { docs } = await res.json();

if (!docs?.length) {
  console.log("No media docs found.");
  process.exit(0);
}

console.log(`Found ${docs.length} media item(s). Downloading…\n`);

let saved = 0;
let skipped = 0;
let failed = 0;

for (const doc of docs) {
  if (!doc.filename) continue;

  const dest = path.join(OUT, doc.filename);

  if (existsSync(dest)) {
    console.log(`  skip   ${doc.filename}`);
    skipped++;
    continue;
  }

  // Payload returns an absolute URL; extract just the pathname so we
  // always hit the correct CMS host regardless of what serverURL says.
  let pathname;
  try {
    pathname = new URL(doc.url).pathname;
  } catch {
    pathname = doc.url?.startsWith("/") ? doc.url : `/media/${doc.filename}`;
  }

  const fileRes = await fetch(`${CMS}${pathname}`);
  if (!fileRes.ok || !fileRes.body) {
    console.warn(`  FAIL   ${doc.filename} (${fileRes.status})`);
    failed++;
    continue;
  }

  await pipeline(fileRes.body, createWriteStream(dest));
  console.log(`  saved  ${doc.filename}`);
  saved++;
}

console.log(`\nDone. saved=${saved} skipped=${skipped} failed=${failed}`);
if (failed > 0) process.exit(1);

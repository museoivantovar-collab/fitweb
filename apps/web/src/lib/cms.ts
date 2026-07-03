import type { Locale } from "./i18n";

const CMS_URL = import.meta.env.PUBLIC_CMS_URL ?? "http://localhost:3000";

/**
 * Normalizes a Payload media URL for use in static builds.
 * - In dev: returns the original absolute URL (images load live from the CMS).
 * - In build: returns only the pathname (/media/filename.jpg) so it resolves
 *   to the file downloaded into public/media/ by scripts/sync-media.mjs.
 */
export function getMediaUrl(url: string | null | undefined): string | null {
  if (!url) return null;
  if (import.meta.env.DEV) return url;
  try {
    const pathname = new URL(url).pathname;
    // Payload v3 serves media at /api/media/file/{filename}
    // sync-media.mjs saves files to public/media/{filename} → /media/{filename}
    const match = pathname.match(/\/api\/media\/file\/(.+)$/);
    if (match) return `/media/${match[1]}`;
    return pathname;
  } catch {
    return url.startsWith("/") ? url : `/${url}`;
  }
}

export async function fetchCollection<T>(
  collection: string,
  locale: Locale,
  params: Record<string, string> = {}
): Promise<{ docs: T[]; totalDocs: number }> {
  const query = new URLSearchParams({
    locale,
    depth: "2",
    ...params,
  });
  const res = await fetch(`${CMS_URL}/api/${collection}?${query}`);
  if (!res.ok) throw new Error(`CMS fetch error: ${res.status} ${collection}`);
  return res.json();
}

export async function fetchDoc<T>(
  collection: string,
  slug: string,
  locale: Locale
): Promise<T | null> {
  const query = new URLSearchParams({ locale, depth: "2", "where[slug][equals]": slug });
  const res = await fetch(`${CMS_URL}/api/${collection}?${query}`);
  if (!res.ok) return null;
  const data = await res.json();
  return data.docs?.[0] ?? null;
}

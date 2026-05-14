/**
 * Lightweight client-side analytics for recommendation cards
 * ("Bạn có thể quan tâm" / "Bài viết cùng chủ đề").
 *
 * Events are stored in localStorage so the data persists across sessions
 * without requiring a backend. Use getRecoStats() to inspect performance
 * and tune scoring in seed-data.ts.
 */
import { useEffect, useRef } from "react";

export type RecoSurface = "library-suggested" | "article-related";

const STORAGE_KEY = "reco:events:v1";

type EventCounts = {
  slug: string;
  surface: RecoSurface;
  impressions: number;
  clicks: number;
  lastImpressionAt?: number;
  lastClickAt?: number;
  // Track contexts that produced the impression (helps debug scoring).
  contexts: Record<string, number>;
};

type Store = Record<string, EventCounts>;

function keyFor(surface: RecoSurface, slug: string) {
  return `${surface}::${slug}`;
}

function read(): Store {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Store) : {};
  } catch {
    return {};
  }
}

function write(store: Store) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
  } catch {
    /* quota or disabled — ignore */
  }
}

function bump(
  surface: RecoSurface,
  slug: string,
  type: "impression" | "click",
  context?: string,
) {
  const store = read();
  const k = keyFor(surface, slug);
  const cur: EventCounts =
    store[k] ?? { slug, surface, impressions: 0, clicks: 0, contexts: {} };
  const now = Date.now();
  if (type === "impression") {
    cur.impressions += 1;
    cur.lastImpressionAt = now;
  } else {
    cur.clicks += 1;
    cur.lastClickAt = now;
  }
  if (context) {
    cur.contexts[context] = (cur.contexts[context] ?? 0) + 1;
  }
  store[k] = cur;
  write(store);
}

export function trackRecoImpression(
  surface: RecoSurface,
  slug: string,
  context?: string,
) {
  bump(surface, slug, "impression", context);
}

export function trackRecoClick(
  surface: RecoSurface,
  slug: string,
  context?: string,
) {
  bump(surface, slug, "click", context);
}

export type RecoStatRow = EventCounts & { ctr: number };

export function getRecoStats(): RecoStatRow[] {
  const store = read();
  return Object.values(store)
    .map((row) => ({
      ...row,
      ctr: row.impressions > 0 ? row.clicks / row.impressions : 0,
    }))
    .sort((a, b) => b.impressions - a.impressions);
}

export function clearRecoStats() {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    /* ignore */
  }
}

/**
 * Fires a single impression event when the element scrolls at least 50%
 * into view. The same (surface, slug) pair is only counted once per mount,
 * so re-scrolling past a card on the same page does not inflate numbers.
 */
export function useRecoImpression<T extends HTMLElement>(
  surface: RecoSurface,
  slug: string,
  context?: string,
) {
  const ref = useRef<T | null>(null);
  const fired = useRef(false);
  useEffect(() => {
    if (typeof window === "undefined") return;
    const el = ref.current;
    if (!el) return;
    if (fired.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
            if (!fired.current) {
              fired.current = true;
              trackRecoImpression(surface, slug, context);
              observer.disconnect();
            }
          }
        }
      },
      { threshold: [0, 0.5, 1] },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [surface, slug, context]);
  return ref;
}

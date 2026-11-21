/**
 * Every place Ahsan Mahmood is released — the ONLY place a store or surface URL lives in this docs site
 * (standard aoneahsan-cccs-platform-links). Each surface passed its release proof on `verified`:
 * the web app answered 200, the Play listing is on the owner's developer page.
 */
export type PlatformId = 'web' | 'android' | 'docs';

export interface Platform {
  id: PlatformId;
  /** Store or surface name (a proper name, not copy). */
  name: string;
  href: string;
  /** What this surface is for, in Ahsan Mahmood's words. */
  title: string;
  text: string;
  cta: string;
  primary?: boolean;
  verified: string;
}

export const PLATFORMS: readonly Platform[] = [
  {id: 'web', name: 'aoneahsan.com', href: 'https://aoneahsan.com', title: 'My website', text: 'The projects I have shipped, how I work now, and how to reach me.', cta: 'Open aoneahsan.com', primary: true, verified: '2026-11-20'},
  {id: 'android', name: 'Google Play', href: 'https://play.google.com/store/apps/details?id=com.aoneahsan.app', title: 'The Android app', text: 'The same portfolio on your phone.', cta: 'Get it on Google Play', verified: '2026-11-20'},
  {id: 'docs', name: 'These pages', href: 'https://docs.aoneahsan.com', title: 'These pages', text: 'The longer write-ups: how I work and how I compare with the other ways to get software made.', cta: 'Read them', verified: '2026-11-20'},
];

export const APPS_PAGE = {
  title: 'Get Ahsan Mahmood',
  description: 'Where to find Ahsan Mahmood\'s work: aoneahsan.com, the Android app on Google Play, and these pages.',
  lead: 'My website, the same portfolio as an Android app, and these longer pages.',
} as const;

/** This site is the docs surface. */
export const CURRENT_SURFACE: PlatformId = 'docs';
export const OTHER_PLATFORMS: readonly Platform[] = PLATFORMS.filter((platform) => platform.id !== CURRENT_SURFACE);
export const PRIMARY_PLATFORM: Platform = PLATFORMS.find((platform) => platform.primary) ?? PLATFORMS[0];
export function platformHref(id: PlatformId): string {
  const found = PLATFORMS.find((platform) => platform.id === id);
  if (!found) throw new Error(`Unknown platform: ${id}`);
  return found.href;
}
/** `/apps` changes only when this list does: its sitemap date is the newest proof date. */
export const APPS_LASTMOD: string = PLATFORMS.map((platform) => platform.verified).sort().at(-1) ?? '2026-11-20';

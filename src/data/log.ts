export type Commit = { hash: string; tag: string; scope?: string; msg: string; detail: string; date: string }

// Dates are approximate placeholders.
export const COMMITS: Commit[] = [
  { hash: 'a3f9c21', tag: 'feat', scope: 'hq', msg: 'approval queue gates every risky AI action', detail: 'Personal HQ phase 9. 510 tests green. Ollama default, Claude optional.', date: '2026-10' },
  { hash: '5e02f17', tag: 'chore', scope: 'iddesign', msg: 'legacy PHP 5 → 8.4 migrations, verified by parity probes', detail: 'Docker parity stacks, 100+ request probes identical on both versions, composer reproducible. Six client sites.', date: '2026-10' },
  { hash: '7b2e0d4', tag: 'release', scope: 'bender-mobile', msg: 'Play Store launch', detail: 'Expo SDK 57, Reanimated 4 card flip, EAS builds, OTA updates, Sentry + PostHog.', date: '2026-09' },
  { hash: 'c81d5aa', tag: 'feat', scope: 'bender-api', msg: "World's End: road-following pub-crawl routing", detail: 'Live venue pool, opening hours, closed-bar filtering, ETA per stop.', date: '2026-07' },
  { hash: '9d4b7c3', tag: 'feat', scope: 'saas', msg: 'multi-tenant platform with scoped API keys and pgvector RAG', detail: 'Hosts Cookie Scanner, RAG chat, newsletter, AI SEO.', date: '2026-03' },
  { hash: '2f6e9b0', tag: 'release', scope: 'cms', msg: 'first commercial deployment: piescimordelizal.pl', detail: 'Agares CMS in production for a paying client.', date: '2026-01' },
  { hash: 'e11a0d8', tag: 'release', scope: 'halo24', msg: 'salon booking app on App Store and Play Store', detail: 'React Native + Expo, PL/EN, loyalty rewards, API migration.', date: '2025' },
  { hash: '0c0ffee', tag: 'init', msg: 'portfolio-xp — a Windows XP that runs Minesweeper', detail: 'The fun version. Still up.', date: '2024' },
]

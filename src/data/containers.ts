export type Container = {
  name: string
  desc: string
  image: string
  status: string
  priv?: boolean
  port: string
  url?: string
  work?: boolean
}

// Uptime values are placeholders until real launch dates are confirmed.
export const CONTAINERS: Container[] = [
  { name: 'bender-web', desc: 'Party games for the web. 4 games, 1,100+ cards, live pub-crawl map.', image: 'react:18-ts · vite', status: 'Up 14 months', port: 'bender-app.eu', url: 'https://bender-app.eu', work: true },
  { name: 'bender-api', desc: 'Laravel 13 API: cards, venues, reports, accounts, Stripe donations.', image: 'laravel:13 · php8.4 · pg16', status: 'Up 14 months', port: 'api.bender-app.eu', url: 'https://api.bender-app.eu', work: true },
  { name: 'bender-mobile', desc: 'Same games, native. Expo SDK 57, Reanimated, OTA updates, Sentry.', image: 'expo:57 · react-native', status: 'Up · Play Store', port: 'play.google.com', work: true },
  { name: 'agares-saas', desc: 'Multi-tenant AI platform. Scoped API keys, pgvector RAG, 5 hosted services.', image: 'laravel:13 · pgvector', status: 'Up 7 months', port: 'api.agares.co.uk', url: 'https://www.api.agares.co.uk', work: true },
  { name: 'agares-cms', desc: 'Multi-site CMS with e-commerce, 4 payment gateways, 119 tests.', image: 'laravel:13 · mysql', status: 'Up 10 months', port: 'demo.agares.co.uk', url: 'https://demo.agares.co.uk', work: true },
  { name: 'piescimordelizal', desc: 'First commercial Agares CMS deployment. Live since 01.2026.', image: 'agares-cms:latest', status: 'Up 10 months', port: 'piescimordelizal.pl', url: 'https://piescimordelizal.pl' },
  { name: 'personal-hq', desc: 'Private company OS. AI agents behind an approval queue, 510 tests.', image: 'laravel · postgres · ollama', status: 'Up · private', priv: true, port: '127.0.0.1' },
  { name: 'cookie-scanner', desc: 'Headless Chromium GDPR audit microservice. Grades A–F.', image: 'node:20 · chromium', status: 'Up 8 months', port: 'github', url: 'https://github.com/H4STUR/cookie-scanner' },
  { name: 'portfolio-xp', desc: 'The other portfolio. A working Windows XP with Minesweeper and a ski-jump game.', image: 'react · vite · laravel:11', status: 'Up 2 years', port: 'portfolio.agares.co.uk', url: 'https://portfolio.agares.co.uk' },
]

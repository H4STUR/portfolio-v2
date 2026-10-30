export type Project = {
  key: string
  name: string
  file: string
  summary: string
  blurb: string
  stats: { n: string; label: string }[]
  url: string | null
  urlLabel?: string
  flag?: boolean
  shot?: string
}

export const PROJECTS: Project[] = [
  {
    key: 'bender',
    name: 'Bender',
    file: 'bender/README.md',
    summary:
      'Party games for web + Android. React/TS front, Laravel 13 API, 1,100+ cards, AI semantic de-dup, live pub-crawl routing.',
    blurb:
      "Party games people actually play. React + TypeScript front, Laravel 13 API, Android app from the same backend. The World's End mode builds a walkable pub crawl from a live pool of real venues: opening hours, closed-bar filtering, road-following routes. AI semantic de-dup keeps 1,100+ cards clean.",
    stats: [
      { n: '1,100+', label: 'cards across 4 games' },
      { n: '2', label: 'platforms, 1 API' },
      { n: '0', label: 'ads, paywalls, sign-ups' },
    ],
    url: 'https://bender-app.eu',
    urlLabel: 'bender-app.eu',
    flag: true,
    shot: "screenshot · world's end map",
  },
  {
    key: 'cms',
    name: 'Agares CMS',
    file: 'agares-cms/README.md',
    summary: 'Multi-site SaaS-grade CMS. E-commerce, 4 payment gateways, Spatie RBAC, 119 tests, security-audited.',
    blurb:
      'Multi-site, SaaS-grade CMS from scratch. One admin, unlimited client sites, each with its own content tree, theme, shop, newsletter. Spatie RBAC with route + controller defence in depth.',
    stats: [
      { n: '119', label: 'tests, security-audited' },
      { n: '4', label: 'payment gateways' },
      { n: '∞', label: 'sites per install' },
    ],
    url: 'https://demo.agares.co.uk',
    urlLabel: 'demo.agares.co.uk',
  },
  {
    key: 'saas',
    name: 'Agares SaaS',
    file: 'agares-saas/README.md',
    summary: 'Multi-tenant AI platform. Scoped agr_ API keys, pgvector RAG, hosts 5 services for CMS + WordPress.',
    blurb:
      'Multi-tenant AI platform. The spine: Cookie audits, AI chat, RAG, newsletter and SEO as services, consumed by the CMS and WordPress over scoped agr_ API keys.',
    stats: [
      { n: '5', label: 'hosted services' },
      { n: '1536', label: 'pgvector dims' },
      { n: '∞', label: 'tenants' },
    ],
    url: 'https://www.api.agares.co.uk',
    urlLabel: 'api.agares.co.uk',
  },
  {
    key: 'hq',
    name: 'Personal HQ',
    file: 'personal-hq/README.md',
    summary: 'Private company OS. AI agents behind an approval queue, IMAP assistant, Allegro sync, 510 tests. Not public.',
    blurb:
      "Private OS for running a company. Tasks, CRM, decisions, IMAP email assistant, Allegro marketplace sync, AI agents. Risky AI actions don't execute: they land in an approval queue with a payload preview.",
    stats: [
      { n: '510', label: 'tests, 9 phases' },
      { n: 'Local', label: 'Ollama by default' },
      { n: '8', label: 'report types' },
    ],
    url: null,
  },
  {
    key: 'halo24',
    name: 'Halo24',
    file: 'halo24/README.md',
    summary: 'Salon booking app on iOS + Android (client). React Native, Expo, PL/EN, loyalty rewards.',
    blurb:
      'Salon booking app on iOS and Android for a client. Appointments, loyalty rewards, coupons, PL/EN. I led the API migration end to end.',
    stats: [
      { n: '2', label: 'stores' },
      { n: 'PL/EN', label: 'i18n' },
      { n: 'RN', label: 'Expo · TypeScript' },
    ],
    url: null,
  },
  {
    key: 'cookies',
    name: 'Cookie Scanner',
    file: 'cookie-scanner/README.md',
    summary: 'Headless Chromium GDPR/CCPA audit microservice. Grades A–F, stores zero cookie values.',
    blurb: 'Headless Chromium audits any site for GDPR/CCPA and grades it A–F. Stateless, stores zero cookie values.',
    stats: [],
    url: 'https://github.com/H4STUR/cookie-scanner',
    urlLabel: 'github',
  },
  {
    key: 'rag',
    name: 'RAG Chatbot',
    file: 'rag-chatbot/README.md',
    summary: 'Local-first PDF Q&A. Ollama + pgvector, NDJSON streaming, zero cloud calls.',
    blurb: 'Upload PDFs, stream answers. Ollama + pgvector, NDJSON streaming, zero cloud calls.',
    stats: [],
    url: null,
  },
  {
    key: 'xp',
    name: 'portfolio-xp',
    file: 'portfolio-xp/README.md',
    summary: 'The fun portfolio. A working Windows XP in the browser.',
    blurb: 'The other portfolio. A working Windows XP with Minesweeper and a ski-jump game.',
    stats: [],
    url: 'https://portfolio.agares.co.uk',
    urlLabel: 'portfolio.agares.co.uk',
  },
]

/** Shown as cards in "Selected work". */
export const WORK_KEYS = ['bender', 'cms', 'saas', 'hq', 'halo24']

export const LINKS = {
  email: 'hello@agares.co.uk', // placeholder
  github: 'https://github.com/H4STUR',
  linkedin: '#', // placeholder
  xp: 'https://portfolio.agares.co.uk',
  cv: '#', // placeholder
}

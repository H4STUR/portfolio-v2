import type { SimpleIcon } from 'simple-icons'
import {
  siLaravel, siReact, siTypescript, siPostgresql, siPhp, siDocker, siVite, siTailwindcss,
  siExpo, siNodedotjs, siPuppeteer, siOllama, siClaude, siStripe, siMysql, siSqlite,
  siAlpinedotjs, siStyledcomponents, siSentry, siWordpress, siWoocommerce, siN8n,
  siGit, siObsidian, siPython,
} from 'simple-icons'

export type Tile = { name: string; where?: string; icon?: SimpleIcon; core?: boolean }
export type Tier = { name: string; sub: string; tiles: Tile[] }

export const TIERS: Tier[] = [
  {
    name: 'Daily drivers',
    sub: 'the stack every Agares product runs on',
    tiles: [
      { icon: siLaravel, name: 'Laravel', where: '11–13 · saas, cms, bender-api, hq, rag', core: true },
      { icon: siReact, name: 'React', where: '18 · bender, portfolio-xp, this site', core: true },
      { icon: siTypescript, name: 'TypeScript', where: 'bender, bender-mobile, halo24', core: true },
      { icon: siPostgresql, name: 'PostgreSQL', where: '16 + pgvector · saas, bender-api, rag, hq', core: true },
      { icon: siPhp, name: 'PHP 8.4', where: 'and everything back to 5.x' },
      { icon: siDocker, name: 'Docker', where: 'parity stacks for every project' },
      { icon: siVite, name: 'Vite', where: 'SWC · all React fronts' },
      { icon: siTailwindcss, name: 'Tailwind', where: 'cms admin, idcms' },
    ],
  },
  {
    name: 'Shipped with',
    sub: 'in production somewhere on this page',
    tiles: [
      { icon: siExpo, name: 'React Native · Expo', where: 'SDK 57 · bender-mobile, halo24' },
      { icon: siNodedotjs, name: 'Node.js', where: 'cookie-scanner' },
      { icon: siPuppeteer, name: 'Puppeteer', where: 'headless Chromium audits' },
      { icon: siOllama, name: 'Ollama', where: 'local LLMs · rag, hq, saas' },
      { icon: siClaude, name: 'Claude API', where: 'optional premium provider · hq' },
      { icon: siStripe, name: 'Stripe', where: '+ PayU, Przelewy24, PayPal' },
      { icon: siMysql, name: 'MySQL', where: 'cms, client sites' },
      { icon: siSqlite, name: 'SQLite', where: 'portfolio-xp scoreboard' },
      { icon: siAlpinedotjs, name: 'Alpine.js', where: 'cms admin' },
      { icon: siStyledcomponents, name: 'styled-components', where: 'bender theme system' },
      { icon: siSentry, name: 'Sentry · PostHog', where: 'bender-mobile, privacy-lean' },
      { name: 'Spatie · Pest · pgvector' },
    ],
  },
  {
    name: 'Client work',
    sub: 'agency years, legacy and e-commerce',
    tiles: [
      { icon: siWordpress, name: 'WordPress', where: 'hardening, custom plugins' },
      { icon: siWoocommerce, name: 'WooCommerce', where: 'stores, payments, InPost' },
      { name: 'PHP 5 → 8.4 migrations' },
      { name: 'DirectAdmin · SFTP CI/CD' },
      { icon: siN8n, name: 'n8n', where: 'automation center' },
    ],
  },
  {
    name: 'Tooling',
    sub: 'how the work gets done',
    tiles: [
      { icon: siClaude, name: 'Claude Code', where: 'daily, with custom skills' },
      { icon: siGit, name: 'Git · GitHub', where: 'conventional commits' },
      { icon: siObsidian, name: 'Obsidian', where: 'personal decision wiki' },
      { icon: siPython, name: 'Python', where: 'tooling, exporters, probes' },
    ],
  },
]

export type Proc = { pid: string; user: string; cpu: number; mem: number; time: string; cmd: string; args: string }

// CPU% = how much I use it now, MEM% = projects, TIME+ = years. Placeholders until confirmed.
export const PROCS: Proc[] = [
  { pid: '1001', user: 'lucas', cpu: 95, mem: 11, time: '6y', cmd: 'laravel', args: '--version=13 saas cms bender-api hq rag idcms' },
  { pid: '1002', user: 'lucas', cpu: 90, mem: 11, time: '6y', cmd: 'php', args: '8.4 · migrations from 5.x verified by parity probes' },
  { pid: '1003', user: 'lucas', cpu: 88, mem: 4, time: '4y', cmd: 'react', args: '18 bender portfolio-xp this-site' },
  { pid: '1004', user: 'lucas', cpu: 85, mem: 3, time: '3y', cmd: 'tsc', args: '--strict bender bender-mobile halo24' },
  { pid: '1005', user: 'lucas', cpu: 82, mem: 5, time: '4y', cmd: 'postgres', args: '16 + pgvector saas bender-api rag hq' },
  { pid: '1006', user: 'lucas', cpu: 80, mem: 14, time: '5y', cmd: 'dockerd', args: 'parity stacks for every project, incl. php 5.6' },
  { pid: '1007', user: 'lucas', cpu: 60, mem: 2, time: '2y', cmd: 'expo', args: 'sdk57 react-native bender-mobile halo24' },
  { pid: '1008', user: 'lucas', cpu: 58, mem: 6, time: '3y', cmd: 'tailwind', args: 'cms-admin idcms' },
  { pid: '1009', user: 'lucas', cpu: 55, mem: 3, time: '2y', cmd: 'ollama serve', args: 'rag hq saas · local-first AI' },
  { pid: '1010', user: 'lucas', cpu: 50, mem: 1, time: '3y', cmd: 'node', args: 'cookie-scanner puppeteer chromium' },
  { pid: '1011', user: 'lucas', cpu: 45, mem: 3, time: '3y', cmd: 'stripe', args: 'payu przelewy24 paypal · cms bender-api' },
  { pid: '1012', user: 'lucas', cpu: 40, mem: 8, time: '6y', cmd: 'wordpress', args: 'woocommerce hardening client-sites' },
  { pid: '1013', user: 'lucas', cpu: 99, mem: 36, time: '1y', cmd: 'claude', args: '--dangerously-ship-fast · daily' },
  { pid: '1014', user: 'root', cpu: 2, mem: 0, time: '∞', cmd: 'sleep', args: '(rarely)' },
]

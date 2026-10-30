import { useEffect, useRef, useState, type ReactNode } from 'react'
import { onEvent, openFile } from '../bus'
import { LINKS, PROJECTS } from '../data/projects'
import Win from './Win'

type Line = { id: number; node: ReactNode }
type Cmd = (args: string[]) => ReactNode | 'CLEAR'

const Ps = () => (
  <>
    <span className="ps">lucas@agares</span>
    <span className="k">:</span>
    <b className="ps">~</b>
    <span className="k">$</span>{' '}
  </>
)

const CMDS: Record<string, Cmd> = {
  help: () => (
    <>
      available commands:{'\n'}
      {'  '}<span className="a">whoami</span>{'        who is this\n'}
      {'  '}<span className="a">ls projects</span>{"   list what I've shipped\n"}
      {'  '}<span className="a">open</span>{' <name>   project summary + link\n'}
      {'  '}<span className="a">stack</span>{'         what I work with\n'}
      {'  '}<span className="a">uptime</span>{'        how long things have been running\n'}
      {'  '}<span className="a">contact</span>{'       jump to contact.ts\n'}
      {'  '}<span className="a">cv</span>{'            download CV\n'}
      {'  '}<span className="a">xp</span>{'            launch the Windows XP portfolio\n'}
      {'  '}<span className="a">clear</span>
    </>
  ),
  whoami: () =>
    'Lucas Majerski — full-stack developer, Wrocław (PL). Laravel · React · TypeScript · React Native · Postgres · Docker.\nBuilds products end to end, then keeps them running.',
  ls: (a) =>
    !a[0] || a[0] === 'projects' ? (
      PROJECTS.map((p) => (
        <span key={p.key} className="b">
          {p.key}/{'  '}
        </span>
      ))
    ) : (
      `ls: cannot access '${a[0]}': No such file or directory`
    ),
  open: (a) => {
    const p = PROJECTS.find((x) => x.key === a[0])
    if (!p)
      return (
        <>
          open: unknown project '{a[0] ?? ''}'. try <span className="a">ls projects</span>
        </>
      )
    return (
      <>
        <span className="a">{p.name}</span>
        {'\n'}
        {p.summary}
        {'\n'}→{' '}
        {p.url ? (
          <a className="b" href={p.url} target="_blank" rel="noopener">
            {p.url}
          </a>
        ) : (
          'private / not public'
        )}
      </>
    )
  },
  stack: () =>
    'backend   Laravel 11–13, PHP 8.4, Node.js, Spatie, Pest\nfrontend  React 18, TypeScript, Vite, Tailwind\nmobile    React Native, Expo SDK 57, Reanimated\ndata      PostgreSQL 16, pgvector, MySQL, SQLite\nai        Ollama, RAG, Claude API\nops       Docker, CI/CD, Sentry, DirectAdmin',
  uptime: () => (
    <>
      bender-app.eu up 14 months, api.agares.co.uk up 7 months, piescimordelizal.pl up 10 months. Zero paid outages.{' '}
      <span className="k">(placeholder numbers)</span>
    </>
  ),
  contact: () => {
    openFile('contact.ts')
    return 'opening contact.ts…'
  },
  cv: () => (
    <>
      →{' '}
      <a className="b" href={LINKS.cv}>
        lucas-majerski-cv.pdf
      </a>{' '}
      <span className="k">(placeholder)</span>
    </>
  ),
  xp: () => {
    window.open(LINKS.xp, '_blank')
    return 'launching Windows XP… (new tab)'
  },
  sudo: (a) => {
    if (a.join(' ').startsWith('hire')) {
      setTimeout(() => openFile('contact.ts'), 600)
      return (
        <>
          <span className="g">[sudo] access granted.</span> opening contact.ts…
        </>
      )
    }
    return '[sudo] password for lucas: \nSorry, try again.'
  },
  rm: (a) =>
    a.join(' ').includes('-rf') ? (
      <>
        <span className="r">rm: permission denied.</span> nice try though.
      </>
    ) : (
      'rm: nothing to remove'
    ),
  pwd: () => '/home/lucas',
  cat: (a) => (a[0] === 'role.txt' ? 'Full-stack developer. Runs in production.' : `cat: ${a[0] ?? ''}: No such file`),
  clear: () => 'CLEAR',
}

const BOOT: [string, number][] = [
  ['whoami', 500],
  ['ls projects', 900],
]
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))

export default function Terminal() {
  const [lines, setLines] = useState<Line[]>([])
  const [typing, setTyping] = useState<string | null>(null)
  const [ready, setReady] = useState(false)
  const [value, setValue] = useState('')
  const bodyRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const idRef = useRef(0)
  const booted = useRef(false)

  const push = (node: ReactNode) => setLines((ls) => [...ls, { id: idRef.current++, node }])

  const exec = (raw: string) => {
    const [c, ...a] = raw.trim().split(/\s+/)
    push(
      <>
        <Ps />
        {raw}
      </>,
    )
    if (!c) return
    const fn = CMDS[c]
    const r = fn
      ? fn(a)
      : (
          <>
            zsh: command not found: {c}. try <span className="a">help</span>
          </>
        )
    if (r === 'CLEAR') setLines([])
    else if (r !== null && r !== undefined) push(r)
  }

  // boot sequence
  useEffect(() => {
    if (booted.current) return
    booted.current = true
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches
    ;(async () => {
      push(<span className="k">Last login: {new Date().toDateString()} on ttys001</span>)
      for (const [cmd, wait] of BOOT) {
        await sleep(reduced ? 0 : wait)
        if (!reduced) {
          for (let i = 1; i <= cmd.length; i++) {
            setTyping(cmd.slice(0, i))
            await sleep(40 + Math.random() * 60)
          }
          setTyping(null)
        }
        exec(cmd)
      }
      push(
        <span className="k">
          type <span className="a">help</span> for commands
        </span>,
      )
      setReady(true)
    })()
  }, [])

  // commands from chips / work cards
  useEffect(
    () =>
      onEvent<string>('term-run', (cmd) => {
        exec(cmd)
        inputRef.current?.focus({ preventScroll: true })
      }),
    [],
  )

  useEffect(() => {
    const el = bodyRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [lines, typing])

  return (
    <Win title="lucas@agares: ~" className="term">
      <div
        className="body"
        ref={bodyRef}
        role="log"
        aria-live="polite"
        onClick={() => inputRef.current?.focus({ preventScroll: true })}
      >
        {lines.map((l) => (
          <div key={l.id} className="line">
            {l.node}
          </div>
        ))}
        {typing !== null && (
          <div className="line">
            <Ps />
            {typing}
            <span className="cur" />
          </div>
        )}
        {ready && (
          <div className="line in">
            <Ps />
            <input
              ref={inputRef}
              aria-label="terminal input"
              autoComplete="off"
              autoCapitalize="none"
              spellCheck={false}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  exec(value)
                  setValue('')
                } else if (e.key === 'l' && e.ctrlKey) {
                  e.preventDefault()
                  setLines([])
                }
              }}
            />
          </div>
        )}
      </div>
    </Win>
  )
}

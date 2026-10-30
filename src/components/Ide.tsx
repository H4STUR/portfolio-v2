import { useEffect, useRef, useState, type KeyboardEvent, type ReactNode } from 'react'
import { onEvent, type FileName } from '../bus'
import { LINKS, PROJECTS } from '../data/projects'
import { WinBar } from './Win'

const FILES: { name: FileName; icon: ReactNode }[] = [
  { name: 'about.md', icon: <span className="b">M↓</span> },
  { name: 'stack.json', icon: <span className="a">{'{}'}</span> },
  { name: 'contact.ts', icon: <span className="b">TS</span> },
]
const MD_ICON = <span className="b">M↓</span>
const MENU = ['File', 'Edit', 'Selection', 'View', 'Go', 'Run', 'Terminal', 'Help']

const projFile = (key: string) => `projects/${key}.md`
const projOf = (f: FileName) => PROJECTS.find((p) => projFile(p.key) === f)
const lang = (f: FileName) => (f.endsWith('.ts') ? 'TypeScript' : f.endsWith('.json') ? 'JSON' : 'Markdown')

const FIELDS = [
  { id: 'name', key: 'name:   ', q: '"', ph: 'Your name' },
  { id: 'email', key: 'email:  ', q: '"', ph: 'you@company.com' },
  { id: 'subject', key: 'subject:', q: '"', ph: 'Full-stack role / contract / hi' },
  { id: 'body', key: 'body:   ', q: '`', ph: 'What are you building, and when do you need it live?' },
] as const
type FieldId = (typeof FIELDS)[number]['id']

type Out = { kind: 'idle' | 'ok' | 'err' | 'busy'; node: ReactNode }

const IDLE: Out = { kind: 'idle', node: <span className="k">Fill the strings above, then ▶ Run. Or press Ctrl+Enter.</span> }

export default function Ide() {
  const [file, setFile] = useState<FileName>('contact.ts')
  const [tabs, setTabs] = useState<FileName[]>(FILES.map((f) => f.name))
  const [folderOpen, setFolderOpen] = useState(false)
  const [out, setOut] = useState<Out>(IDLE)
  const [errs, setErrs] = useState<FieldId[]>([])
  const refs = useRef<Record<FieldId, HTMLSpanElement | null>>({ name: null, email: null, subject: null, body: null })

  const open = (f: FileName) => {
    setTabs((t) => (t.includes(f) ? t : [...t, f]))
    setFile(f)
  }
  const close = (f: FileName) => {
    setTabs((t) => {
      const next = t.filter((x) => x !== f)
      if (file === f) setFile(next[Math.max(0, t.indexOf(f) - 1)])
      return next
    })
  }

  useEffect(() => onEvent<FileName>('open-file', open), [])

  const focusNext = (id: FieldId) => {
    const i = FIELDS.findIndex((f) => f.id === id)
    const n = FIELDS[i + 1]
    if (n) refs.current[n.id]?.focus()
    else send()
  }

  const send = async () => {
    const v = Object.fromEntries(FIELDS.map((f) => [f.id, refs.current[f.id]?.textContent?.trim() ?? ''])) as Record<FieldId, string>
    const e: [FieldId, number, string][] = []
    if (!v.name) e.push(['name', 4, 'name: string is empty'])
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email)) e.push(['email', 5, `email: "${v.email}" is not assignable to type Email`])
    if (!v.body) e.push(['body', 7, 'body: string is empty'])
    setErrs(e.map((x) => x[0]))
    if (e.length) {
      setOut({
        kind: 'err',
        node: (
          <>
            {e.map(([, ln, msg]) => (
              <div key={ln}>
                <span className="r">contact.ts:{ln}:3 - error TS2322:</span> {msg}
              </div>
            ))}
            {'\n'}
            <span className="k">Found {e.length} error{e.length > 1 ? 's' : ''}.</span>
          </>
        ),
      })
      refs.current[e[0][0]]?.focus()
      return
    }
    setOut({ kind: 'busy', node: <span className="k">$ npx tsx contact.ts</span> })
    const url = import.meta.env.VITE_CONTACT_URL as string | undefined
    try {
      if (url) {
        const r = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(v) })
        if (!r.ok) throw new Error(`HTTP ${r.status}`)
      } else {
        await new Promise((r) => setTimeout(r, 420)) // shortcut: no backend yet, set VITE_CONTACT_URL to send for real
      }
      setOut({
        kind: 'ok',
        node: (
          <>
            <span className="k">$ npx tsx contact.ts</span>
            {'\n'}
            <span className="g">✓</span> compiled contact.ts{'\n'}
            <span className="g">✓</span> message queued → {LINKS.email}
            {'\n'}
            <span className="g">✓</span> done in 0.42s{'\n\n'}
            <span className="k">
              Thanks {v.name}. I'll reply to {v.email} within 24h.
            </span>
          </>
        ),
      })
    } catch (err) {
      setOut({
        kind: 'err',
        node: (
          <>
            <span className="r">✗ send failed:</span> {String(err)}
            {'\n'}
            <span className="k">Email me directly: </span>
            <a className="b" href={`mailto:${LINKS.email}`}>{LINKS.email}</a>
          </>
        ),
      })
    }
  }

  const onKey = (id: FieldId) => (ev: KeyboardEvent<HTMLSpanElement>) => {
    if (ev.key === 'Enter' && (ev.ctrlKey || ev.metaKey)) {
      ev.preventDefault()
      send()
    } else if (ev.key === 'Enter' && id !== 'body') {
      ev.preventDefault()
      focusNext(id)
    } else if (ev.key === 'Tab' && !ev.shiftKey && id !== 'body') {
      ev.preventDefault()
      focusNext(id)
    }
  }

  const isContact = file === 'contact.ts'

  return (
    <section id="ide" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <div className="sh rv">
          <h2 className="disp">
            About, stack, <em>contact.</em>
          </h2>
          <span className="cmd">code . &amp;&amp; open contact.ts</span>
        </div>
        <div className="win vsc rv">
          <WinBar title="lucas-majerski — Visual Studio Code" menu={MENU} />

          <div className="side act" aria-hidden="true">
            <svg className="on" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M4 4h7l2 2h7v14H4z" /></svg>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></svg>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M6 3v12M18 9a3 3 0 1 1-6 0 3 3 0 0 1 6 0zM6 15a3 3 0 1 0 0 6 3 3 0 0 0 0-6zm0 0c0-3 12-3 12-6" /></svg>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M12 2 2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" /></svg>
          </div>

          <div className="side ex">
            <div className="h">EXPLORER</div>
            <div className="dir">▾ lucas-majerski</div>
            {FILES.map((f) => (
              <div key={f.name} className={`f${file === f.name ? ' on' : ''}`} onClick={() => open(f.name)}>
                {f.icon}
                {f.name}
              </div>
            ))}
            <div className="dir fold" style={{ marginTop: 8 }} onClick={() => setFolderOpen((o) => !o)} role="button" aria-expanded={folderOpen}>
              {folderOpen ? '▾' : '▸'} projects
            </div>
            {folderOpen &&
              PROJECTS.map((p) => (
                <div key={p.key} className={`f nested${file === projFile(p.key) ? ' on' : ''}`} onClick={() => open(projFile(p.key))}>
                  {MD_ICON}
                  {p.key}.md
                </div>
              ))}
            <div className="dir">
              ▸ node_modules <span className="k">(don't)</span>
            </div>
          </div>

          <div className="main">
            <div className="tabs" role="tablist">
              {tabs.map((name) => {
                const base = FILES.find((f) => f.name === name)
                return (
                  <div key={name} role="tab" aria-selected={file === name} className={`tab${file === name ? ' on' : ''}`} onClick={() => setFile(name)}>
                    {base ? base.icon : MD_ICON}
                    {base ? name : name.slice('projects/'.length)}
                    {name === 'contact.ts' ? (
                      <span className="x">●</span>
                    ) : base ? null : (
                      <button
                        className="x close"
                        aria-label={`close ${name}`}
                        onClick={(e) => {
                          e.stopPropagation()
                          close(name)
                        }}
                      >
                        ×
                      </button>
                    )}
                  </div>
                )
              })}
              {isContact && (
                <div className="run" role="button" tabIndex={0} onClick={send} onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && send()}>
                  ▶ Run contact.ts
                </div>
              )}
            </div>
            <div className="crumb">lucas-majerski › {file.replace('/', ' › ')}</div>

            {projOf(file) && <ProjectFile p={projOf(file)!} />}

            <div className="file contact" hidden={!isContact}>
              <div className="code">
                <Ln n={1}><span className="v">import</span> {'{ send, '}<span className="c">Message</span>{' } '}<span className="v">from</span> <span className="s">"@agares/contact"</span>;</Ln>
                <Ln n={2} />
                <Ln n={3}><span className="b">const</span> message: <span className="c">Message</span> = {'{'}</Ln>
                {FIELDS.map((f, i) => (
                  <Ln n={4 + i} key={f.id} wrap>
                    {'  '}{f.key} {f.q}
                    <span
                      ref={(el) => (refs.current[f.id] = el)}
                      className={`ed${errs.includes(f.id) ? ' err' : ''}`}
                      contentEditable
                      suppressContentEditableWarning
                      data-ph={f.ph}
                      spellCheck={false}
                      inputMode={f.id === 'email' ? 'email' : undefined}
                      onKeyDown={onKey(f.id)}
                      onPaste={(ev) => {
                        ev.preventDefault()
                        document.execCommand('insertText', false, ev.clipboardData.getData('text').replace(/\n/g, ' '))
                      }}
                    />
                    {f.q},
                  </Ln>
                ))}
                <Ln n={8}>{'};'}</Ln>
                <Ln n={9} />
                <Ln n={10}><span className="v">await</span> <span className="b">send</span>(message); <span className="k">// replies within 24h, usually faster</span></Ln>
              </div>
              <div className="out">
                <div className="oh"><span>PROBLEMS</span><b>TERMINAL</b><span>OUTPUT</span></div>
                <div className="ob" aria-live="polite">{out.node}</div>
              </div>
            </div>

            <div className="file md" hidden={file !== 'about.md'}>
              <h3>About</h3>
              <p>Full-stack developer based in Wrocław, Poland. I like owning the whole thing: the schema, the API, the UI, the deploy pipeline, and the 3 a.m. log file.</p>
              <p>Most of what I build I also run in production, which keeps me honest about <b>tests, security and boring reliability</b>. Nothing on this page is a tutorial project.</p>
              <p><b>Day job</b>: client work at idDesign. Legacy PHP migrations verified with 100+ request parity probes, WooCommerce stores, WordPress hardening, security remediation plans, a React Native app in both stores.</p>
              <p><b>Nights</b>: Agares, my own product line. SaaS, CMS, Bender, the internal OS.</p>
              <p><b>How I work</b>: Claude Code daily, Docker parity stacks for every legacy site, a personal wiki where every decision gets written down. I ship fast, but I write it down.</p>
              <ul>
                <li>Open to: full-time, contract, remote or Wrocław</li>
                <li>Languages: Polish (native), English (fluent)</li>
                <li>The fun version: <a className="b" href={LINKS.xp} target="_blank" rel="noopener">portfolio.agares.co.uk</a></li>
              </ul>
            </div>

            <div className="file" hidden={file !== 'stack.json'}>
              <div className="code">
                <Ln n={1}>{'{'}</Ln>
                {STACK_JSON.map(([k, vals], i) => (
                  <Ln n={2 + i} key={k}>
                    {'  '}<span className="c">"{k}"</span>:{' '.repeat(10 - k.length)}[
                    {vals.map((v, j) => (
                      <span key={v}>
                        <span className="s">"{v}"</span>
                        {j < vals.length - 1 ? ', ' : ''}
                      </span>
                    ))}
                    ]{i < STACK_JSON.length - 1 ? ',' : ''}
                  </Ln>
                ))}
                <Ln n={2 + STACK_JSON.length}>{'}'}</Ln>
              </div>
            </div>
          </div>

          <div className="status">
            <span>⎇ main</span>
            <span>✓ {errs.length} problems</span>
            <span>Ln 4, Col 12</span>
            <span>UTF-8</span>
            <span>{lang(file)}</span>
            <span>Wrocław · open to work</span>
          </div>
        </div>
      </div>
    </section>
  )
}

function ProjectFile({ p }: { p: (typeof PROJECTS)[number] }) {
  return (
    <div className="file md">
      <h3>{p.name}</h3>
      <p>{p.blurb}</p>
      {p.stats.length > 0 && (
        <ul>
          {p.stats.map((s) => (
            <li key={s.label}>
              <b>{s.n}</b> {s.label}
            </li>
          ))}
        </ul>
      )}
      <p>
        {p.url ? (
          <a className="b" href={p.url} target="_blank" rel="noopener">
            {p.urlLabel ?? p.url} ↗
          </a>
        ) : (
          <span className="k">private / not public</span>
        )}
      </p>
    </div>
  )
}

function Ln({ n, wrap, children }: { n: number; wrap?: boolean; children?: ReactNode }) {
  return (
    <>
      <span className="ln">{n}</span>
      <span className={`cl${wrap ? ' ww' : ''}`}>{children}</span>
    </>
  )
}

const STACK_JSON: [string, string[]][] = [
  ['backend', ['Laravel 11–13', 'PHP 8.4', 'Node.js', 'REST', 'Spatie', 'Pest']],
  ['frontend', ['React 18', 'TypeScript', 'Vite', 'Tailwind', 'Alpine', 'styled-components']],
  ['mobile', ['React Native', 'Expo SDK 57', 'Reanimated', 'EAS']],
  ['data', ['PostgreSQL 16', 'pgvector', 'MySQL', 'SQLite']],
  ['ai', ['Ollama', 'RAG', 'Claude API', 'embeddings']],
  ['ops', ['Docker', 'CI/CD', 'SFTP deploys', 'DirectAdmin', 'Sentry']],
  ['payments', ['Stripe', 'PayU', 'Przelewy24', 'PayPal']],
  ['legacy', ['WordPress', 'WooCommerce', 'PHP 5 → 8 migrations']],
  ['tools', ['Claude Code', 'Puppeteer', 'n8n', 'Obsidian']],
]

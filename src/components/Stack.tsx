import { useState } from 'react'
import type { SimpleIcon } from 'simple-icons'
import { PROCS, TIERS } from '../data/stack'
import Win from './Win'

function Icon({ i }: { i: SimpleIcon }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d={i.path} fill="currentColor" />
    </svg>
  )
}

function Meter({ pct, n = 32, cls = 'bp' }: { pct: number; n?: number; cls?: string }) {
  const f = Math.round((pct * n) / 100)
  return (
    <>
      <span className={cls}>{'|'.repeat(f)}</span>
      <span className="bm">{'|'.repeat(n - f)}</span>
    </>
  )
}

export default function Stack() {
  const [view, setView] = useState<'tiles' | 'htop'>('tiles')
  return (
    <section id="stack" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <div className="sh rv">
          <h2 className="disp">
            What I <em>work with.</em>
          </h2>
          <div className="sw" role="tablist" aria-label="Stack view">
            {(['tiles', 'htop'] as const).map((v) => (
              <button key={v} role="tab" aria-selected={view === v} className={view === v ? 'on' : ''} onClick={() => setView(v)}>
                {v}
              </button>
            ))}
          </div>
        </div>

        <div className="tiers rv" hidden={view !== 'tiles'}>
          {TIERS.map((t) => (
            <div className="tier" key={t.name}>
              <div className="th">
                <b>{t.name}</b>
                {t.sub}
                <i>{t.tiles.length}</i>
              </div>
              <div className="tiles">
                {t.tiles.map((x) =>
                  x.icon ? (
                    <div key={x.name} className={`tile${x.core ? ' core' : ''}`}>
                      <Icon i={x.icon} />
                      <div className="tx">
                        <b>{x.name}</b>
                        <small>{x.where}</small>
                      </div>
                    </div>
                  ) : (
                    <div key={x.name} className="tile txt">
                      <b>{x.name}</b>
                    </div>
                  ),
                )}
              </div>
            </div>
          ))}
        </div>

        <Win title="htop — lucas@agares" className="htop rv" hidden={view !== 'htop'}>
          <div className="hd">
            <div>1&nbsp;[<Meter pct={92} /> 92%]&nbsp; backend</div>
            <div>
              Tasks: <span className="g">29</span> total, <span className="g">8</span> running &nbsp;Load average:{' '}
              <span className="a">0.92</span> 0.88 0.85
            </div>
            <div>2&nbsp;[<Meter pct={85} /> 85%]&nbsp; frontend</div>
            <div>
              Uptime: <span className="a">6 years</span> in production <span className="k">(placeholder)</span>
            </div>
            <div>3&nbsp;[<Meter pct={60} /> 60%]&nbsp; mobile</div>
            <div>Mem[<Meter pct={69} cls="ba" /> 36 projects]</div>
          </div>
          <div className="ov">
            <table>
              <thead>
                <tr>
                  <th>PID</th><th>USER</th><th>CPU%</th><th>MEM%</th><th>TIME+</th><th>COMMAND</th>
                </tr>
              </thead>
              <tbody>
                {PROCS.map((p) => {
                  const full = Math.round(p.cpu / 10)
                  return (
                    <tr key={p.pid}>
                      <td className="pid">{p.pid}</td>
                      <td className="usr">{p.user}</td>
                      <td className="cpu">
                        <b>{'▓'.repeat(full)}</b>
                        <i>{'░'.repeat(10 - full)}</i> {p.cpu}
                      </td>
                      <td>{p.mem}</td>
                      <td>{p.time}</td>
                      <td className="cmd">
                        {p.cmd} <span>{p.args}</span>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
          <div className="ft">
            {[['F1', 'Help'], ['F2', 'Setup'], ['F3', 'Search'], ['F5', 'Tree'], ['F9', 'Kill'], ['F10', 'Quit']].map(([k, l]) => (
              <span key={k}>
                <b>{k}</b>
                {l}
              </span>
            ))}
          </div>
        </Win>
      </div>
    </section>
  )
}

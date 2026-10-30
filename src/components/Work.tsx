import { runCommand } from '../bus'
import { PROJECTS, WORK_KEYS } from '../data/projects'
import Win from './Win'

export default function Work() {
  const items = WORK_KEYS.map((k) => PROJECTS.find((p) => p.key === k)!)
  return (
    <section id="work" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <div className="sh rv">
          <h2 className="disp">
            Selected <em>work.</em>
          </h2>
          <span className="cmd">cat ~/projects/*/README.md | head</span>
        </div>
        <div className="grid">
          {items.map((p) => (
            <Win key={p.key} title={p.file} className={`proj rv${p.flag ? ' flag' : ''}`}>
              <div className="inner">
                <div className="txt">
                  <h3>{p.name}</h3>
                  <p>{p.blurb}</p>
                  <div className="stats">
                    {p.stats.map((s) => (
                      <div key={s.label}>
                        <b>{s.n}</b>
                        <span>{s.label}</span>
                      </div>
                    ))}
                  </div>
                  <div className="links">
                    {p.url && (
                      <a href={p.url} target="_blank" rel="noopener">
                        {p.urlLabel} ↗
                      </a>
                    )}
                    <a
                      href="#hero"
                      onClick={(e) => {
                        e.preventDefault()
                        runCommand(`open ${p.key}`)
                      }}
                    >
                      open {p.key} →
                    </a>
                  </div>
                </div>
                {p.flag && <div className="shot">{p.shot}</div>}
              </div>
            </Win>
          ))}
        </div>
      </div>
    </section>
  )
}

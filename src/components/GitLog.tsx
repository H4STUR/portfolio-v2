import { COMMITS } from '../data/log'

export default function GitLog() {
  return (
    <section id="log" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <div className="sh rv">
          <h2 className="disp">
            git <em>log</em>
          </h2>
          <span className="cmd">git log --oneline --date=short</span>
        </div>
        <div className="log rv">
          {COMMITS.map((c) => (
            <div className="row" key={c.hash}>
              <span className="h">{c.hash}</span>
              <span className="m">
                <span className="tag">{c.tag}</span>
                {c.scope && (
                  <>
                    (<span className="scope">{c.scope}</span>)
                  </>
                )}
                : <b>{c.msg}</b>
                <small>{c.detail}</small>
              </span>
              <span className="dt">{c.date}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

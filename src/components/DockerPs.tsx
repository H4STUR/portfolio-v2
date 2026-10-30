import { CONTAINERS } from '../data/containers'
import Win from './Win'

export default function DockerPs() {
  return (
    <section id="live">
      <div className="wrap">
        <div className="sh rv">
          <h2 className="disp">
            What's <em>up</em> right now.
          </h2>
          <span className="cmd">docker ps --format table</span>
        </div>
        <Win title="docker ps" className="rv">
          <div className="ps-wrap">
            <table className="ps">
              <thead>
                <tr>
                  <th>CONTAINER</th>
                  <th>IMAGE</th>
                  <th>STATUS</th>
                  <th>PORTS</th>
                </tr>
              </thead>
              <tbody>
                {CONTAINERS.map((c) => (
                  <tr key={c.name} onClick={c.work ? () => (location.hash = '#work') : undefined}>
                    <td>
                      {c.name}
                      <span className="desc">{c.desc}</span>
                    </td>
                    <td>{c.image}</td>
                    <td className={c.priv ? 'priv' : 'up'}>{c.status}</td>
                    <td>
                      {c.url ? (
                        <a href={c.url} target="_blank" rel="noopener" onClick={(e) => e.stopPropagation()}>
                          {c.port}
                        </a>
                      ) : (
                        c.port
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Win>
      </div>
    </section>
  )
}

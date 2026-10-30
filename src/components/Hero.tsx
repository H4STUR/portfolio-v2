import { runCommand } from '../bus'
import Terminal from './Terminal'

const CHIPS = ['ls projects', 'open bender', 'stack', 'sudo hire lucas']

export default function Hero() {
  return (
    <header id="hero">
      <div className="wrap">
        <div>
          <h1>
            Full-stack.
            <br />
            Runs in
            <br />
            <em>production.</em>
          </h1>
          <p className="sub">
            I'm Lucas Majerski. I build web products end to end and keep them alive: <b>Laravel</b> APIs,{' '}
            <b>React + TypeScript</b> fronts, <b>React Native</b> apps, Postgres, Docker, the deploy, the logs.
            Everything below is real, deployed, and has users.
          </p>
          <div className="chips" aria-label="Try a command">
            {CHIPS.map((c) => (
              <button key={c} className="chip" onClick={() => runCommand(c)}>
                {c}
              </button>
            ))}
          </div>
        </div>
        <Terminal />
      </div>
    </header>
  )
}

import { useEffect, useState } from 'react'
import { openFile } from '../bus'

function now() {
  return new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: 'Europe/Warsaw' })
}

export default function TopBar() {
  const [time, setTime] = useState(now)
  useEffect(() => {
    const id = setInterval(() => setTime(now()), 1000)
    return () => clearInterval(id)
  }, [])
  return (
    <div className="top">
      <div className="wrap">
        <div className="l">
          <span className="dot" />
          <span>lucas@agares</span>
          <span className="k">:</span>
          <span className="b">~</span>
        </div>
        <nav>
          <a href="#live">live</a>
          <a href="#work">work</a>
          <a href="#stack">stack</a>
          <a href="#log">log</a>
          <a href="#ide" onClick={() => openFile('about.md')}>about</a>
          <a href="#ide" onClick={() => openFile('contact.ts')}>contact</a>
        </nav>
        <span className="clock">{time} CET</span>
      </div>
    </div>
  )
}

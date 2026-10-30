import type { ReactNode } from 'react'

type Props = { title: string; className?: string; children: ReactNode; hidden?: boolean; menu?: string[] }

/** GNOME/GTK-style header bar: title left, optional menu, window controls right. */
export default function Win({ title, className = '', children, hidden, menu }: Props) {
  return (
    <div className={`win ${className}`} hidden={hidden}>
      <WinBar title={title} menu={menu} />
      {children}
    </div>
  )
}

export function WinBar({ title, menu }: { title: string; menu?: string[] }) {
  return (
    <div className="bar">
      <span className="t">{title}</span>
      {menu && (
        <span className="menu" aria-hidden="true">
          {menu.map((m) => (
            <span key={m}>{m}</span>
          ))}
        </span>
      )}
      <span className="wc" aria-hidden="true">
        <i>
          <svg viewBox="0 0 10 10"><path d="M2 7.5h6" /></svg>
        </i>
        <i>
          <svg viewBox="0 0 10 10"><rect x="2" y="2" width="6" height="6" /></svg>
        </i>
        <i className="x">
          <svg viewBox="0 0 10 10"><path d="M2.5 2.5l5 5M7.5 2.5l-5 5" /></svg>
        </i>
      </span>
    </div>
  )
}

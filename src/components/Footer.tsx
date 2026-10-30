import { LINKS } from '../data/projects'

export default function Footer() {
  return (
    <footer className="wrap">
      <span>© {new Date().getFullYear()} Lucas Majerski · built with React + TypeScript</span>
      <span>
        <a href={LINKS.github} target="_blank" rel="noopener">github</a> ·{' '}
        <a href={LINKS.linkedin}>linkedin</a> ·{' '}
        <a href={LINKS.xp} target="_blank" rel="noopener">xp edition</a>
      </span>
    </footer>
  )
}

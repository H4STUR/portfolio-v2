// shortcut: cross-section actions (nav → IDE file, work card → terminal command) go over window events
// instead of React context; upgrade to context if a third consumer appears.
/** 'about.md' | 'stack.json' | 'contact.ts' | 'projects/<key>.md' */
export type FileName = string

export function openFile(f: FileName) {
  window.dispatchEvent(new CustomEvent('open-file', { detail: f }))
  document.getElementById('ide')?.scrollIntoView()
}

export function runCommand(cmd: string) {
  window.dispatchEvent(new CustomEvent('term-run', { detail: cmd }))
  document.getElementById('hero')?.scrollIntoView({ block: 'start' })
}

export function onEvent<T>(name: string, handler: (detail: T) => void) {
  const h = (e: Event) => handler((e as CustomEvent<T>).detail)
  window.addEventListener(name, h)
  return () => window.removeEventListener(name, h)
}

# CLAUDE.md

Professional portfolio for Lucas Majerski (the "serious" sibling of the Windows XP portfolio at `D:\Projects\portfolio\portfolio`).

## Commands

- `npm run dev` — Vite dev server
- `npm run build` — `tsc -b` + Vite build to `dist/`
- `npm run preview` — serve `dist/`

## Stack

React 18 + TypeScript + Vite (SWC). One global stylesheet (`src/styles.css`), no CSS framework, no router. Icons from the `simple-icons` package rendered as inline SVG paths.

## Concept

The page is the developer's workstation. Every section is a dev artifact in window chrome (`Win.tsx`): an interactive terminal (hero), `docker ps` (live products), README cards (selected work), tiles / `htop` (stack), `git log` (timeline), a VS Code window (about.md, stack.json, contact.ts). Dark, amber accent, Bricolage Grotesque headlines, IBM Plex Mono body.

## Layout

```
src/
├── App.tsx            # section order
├── bus.ts             # window-event bus: openFile(), runCommand()
├── styles.css         # all styling
├── data/              # content only: projects, containers, log, stack
├── hooks/useReveal.ts # .rv scroll reveal
└── components/        # one file per section + Win.tsx chrome
```

Content edits go in `src/data/*`. Terminal commands live in `Terminal.tsx` (`CMDS`). Contact form POSTs to `VITE_CONTACT_URL` when set, otherwise simulates.

## Design references

`design/prototype-v3.html` is the approved static prototype (v1 and v2 are earlier iterations).

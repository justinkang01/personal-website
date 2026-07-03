# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

A single-page personal portfolio website blending a mechanical-keyboard/cooking aesthetic. Built with React 19 + TypeScript + Vite, styled with MUI (dark theme), routed client-side via `HashRouter`. No backend — project data is a static TypeScript file and contact is a `mailto:` link.

## Commands

Package manager is **Bun** (see `bun.lock`, `bunfig.toml`) — use `bun`, not `npm`/`yarn`.

- `bun install` — install dependencies
- `bun run dev` — start Vite dev server
- `bun run build` — typecheck (`tsc -b`) then production build
- `bun run preview` — serve the production build (used by Railway deploy)
- `bun run lint` / `bun run lint:fix` — ESLint (flat config, includes Prettier as an ESLint rule)
- `bun run format` / `bun run format:check` — Prettier over `src/**/*.{ts,tsx,js,jsx,json,css,md}`
- `bun test` — run all tests (Bun's built-in test runner, **not** Vitest, despite `vitest` being a devDependency)
- `bun test src/components/ProjectCard.test.tsx` — run a single test file
- `bun test -t "<name>"` — filter by test/describe name

Before opening a PR, this repo's convention is to run, in order, and stop on first failure: `bun run format` → `bun run lint:fix` → `bun run build` → `bun test`.

## Architecture

Flat React SPA, single provider stack in `src/main.tsx`:

```
ThemeProvider (MUI dual theme) → AudioProvider (mute/sound context) → HashRouter → App
```

`App.tsx` renders one `<section>` per nav entry (hero, portfolio, about, contact) plus a hidden `EasterEggTrigger`. Each section is a presentational component that receives its content as props from `App.tsx` — there is no CMS or data-fetching layer; copy and links live inline in `App.tsx`, and project entries live in `src/data/projects.ts` (typed via `Project` in `src/types.ts`).

Key cross-cutting pieces:
- **`src/theme/index.ts`** — single MUI theme encoding both aesthetics: charcoal/off-white "keyboard" palette as primary, warm amber "cooking" palette as secondary, monospace type for headings, rounded sans for body, keycap-style button/card overrides (shadow drops on `:active`).
- **`src/context/AudioContext.tsx`** — `AudioProvider`/`useAudio()` context holding global mute state and a `playSound(soundId: SoundId)` function. Audio elements are created lazily (`preload="none"`) on first play, not on mount, to respect autoplay policy. Playback errors are swallowed with a `console.warn`, never thrown.
- **`InteractiveElement`** (`theme: 'keyboard' | 'cooking'`) — the reusable themed widget (used in the hero) that plays the theme-appropriate sound (`keyboard-click` / `cooking-sizzle`) via `useAudio()` on activation.
- **`ProjectCard`** — expands inline (MUI `Collapse`), not a modal, when clicked. If `project.embeddable` is true, also shows a "Play Now" button that opens `GameModal` (an iframe modal) pointed at `project.demoUrl`.
- **`EasterEggTrigger`** — currently a stub (invisible fixed-position element, logs to console); intended hook point for a future hidden game.

Routing is hash-based purely for in-page scroll navigation (`#hero`, `#portfolio`, `#about`, `#contact`) — there are no distinct routed pages.

### Design/requirements docs

`.kiro/specs/personal-website-spa/` contains `requirements.md`, `design.md`, and `tasks.md` from the original spec-driven build. `design.md` in particular documents the full component tree, prop interfaces, and a numbered list of correctness properties (Property 1–16) that the property-based tests are written against — consult it before changing component contracts (e.g. audio-on-click behavior, expand/collapse semantics, touch-target sizing) since tests may be asserting one of these numbered properties.

## Testing

Two kinds of test files, both run via `bun test` (Bun's runner, imports from `'bun:test'`) with React Testing Library:
- **`*.test.tsx`** — example-based unit tests.
- **`*.property.test.tsx`** — property-based tests using `fast-check`. Each is tagged with a comment referencing the property it validates from `design.md`, e.g. `// Feature: personal-website-spa, Property 7: ...`. When adding a new property test, follow this tag convention and cross-reference `design.md`.

`src/test/setup.ts` (preloaded via `bunfig.toml`) registers `@happy-dom/global-registrator` as the DOM environment and imports `@testing-library/jest-dom` matchers.

Components that use `useAudio()` need an `AudioProvider` wrapper in tests (or `mock.module('../context/AudioContext', ...)` to stub it out — see `InteractiveElement.property.test.tsx` for the pattern).

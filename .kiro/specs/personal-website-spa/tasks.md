# Implementation Plan: Personal Website SPA

## Overview

Incrementally build a React + MUI single-page application that blends mechanical keyboard and cooking themes. Each task produces working, integrated code — no orphaned components. The project is scaffolded first, then sections are built one at a time, with interactive and audio features layered in after the structural shell is solid.

## Tasks

- [x] 1. Scaffold project and configure tooling
  - Bootstrap a Vite + React + TypeScript project (`npm create vite@latest`)
  - Install dependencies: `react-router-dom`, `@mui/material`, `@mui/icons-material`, `@emotion/react`, `@emotion/styled`, `fast-check`, `vitest`, `@testing-library/react`, `@testing-library/user-event`, `@testing-library/jest-dom`
  - Configure `vitest.config.ts` with jsdom environment and `@testing-library/jest-dom` setup file
  - Create `src/` directory structure: `components/`, `data/`, `theme/`, `context/`, `hooks/`, `assets/sounds/`, `assets/images/`
  - _Requirements: 1.1_

- [x] 2. Define data models and static project data
  - [x] 2.1 Create TypeScript interfaces in `src/types.ts`
    - Define `Project`, `NavSection`, `SoundId`, `AudioState` interfaces exactly as specified in the design
    - _Requirements: 3.1, 3.2, 3.3, 3.7, 3.8_
  - [x] 2.2 Create `src/data/projects.ts` with at least 6 sample `Project` objects
    - Include a mix of `theme: 'keyboard'`, `'cooking'`, and `'neutral'` entries
    - Include `repoUrl` and `demoUrl` on some entries and omit on others to exercise optional-link logic
    - _Requirements: 3.1, 3.6_
  - [x] 2.3 Write property test for ProjectCard required fields (Property 4)
    - **Property 4: ProjectCard renders required fields**
    - **Validates: Requirements 3.2, 3.3**
    - Generate arbitrary `Project` objects with fast-check; assert title, shortDescription, and all technology labels appear in rendered output

- [x] 3. Create MUI theme
  - [x] 3.1 Implement `src/theme/index.ts` with custom MUI theme
    - Primary palette: deep charcoal / off-white (keyboard aesthetic)
    - Secondary palette: warm amber / terracotta (cooking aesthetic)
    - Typography: monospace font for keyboard elements, rounded sans for cooking elements
    - Custom overrides for `MuiButton`, `MuiCard`, `MuiChip` with keycap-inspired border-radius and shadows
    - _Requirements: 4.1, 4.2, 4.4_
  - [x]* 3.2 Write snapshot test for MUI theme object
    - Assert palette and typography tokens match expected values
    - _Requirements: 4.1_

- [x] 4. Implement AudioProvider and useAudio hook
  - [x] 4.1 Create `src/context/AudioContext.tsx`
    - Implement `AudioProvider` with `muted` state, `toggleMute`, and `playSound(soundId)` as described in the design
    - Load `<audio>` elements lazily with `preload="none"`; catch and log audio errors silently; auto-mute on autoplay policy rejection
    - Export `useAudio` hook
    - _Requirements: 5.5, 5.6, 5.7, 5.8_
  - [x]* 4.2 Write unit tests for AudioProvider
    - `toggleMute` flips muted state; `playSound` is a no-op when muted
    - _Requirements: 5.5, 5.8_
  - [x]* 4.3 Write property test for audio theme routing (Property 9)
    - **Property 9: Audio theme routing**
    - **Validates: Requirements 5.6, 5.7**
    - Generate arbitrary `'keyboard' | 'cooking'` theme values; simulate click; assert correct `soundId` is called; assert no-op when muted

- [x] 5. Implement App shell, HashRouter, and Navbar
  - [x] 5.1 Create `src/main.tsx` wiring `ThemeProvider`, `AudioProvider`, and `HashRouter` around `<App />`
    - _Requirements: 1.1_
  - [x] 5.2 Create `src/App.tsx` as the layout shell
    - Render `<Navbar>`, `<HeroSection>`, `<PortfolioSection>`, `<AboutSection>`, `<ContactSection>`, and `<EasterEggTrigger>` in order inside a `<main>` element
    - Each section wrapped in a `<section>` with its hash id as the DOM `id`
    - _Requirements: 1.1, 10.5_
  - [x] 5.3 Implement `src/components/Navbar.tsx`
    - Accept `NavbarProps` (`sections: NavSection[]`)
    - On ≥ 768px: inline links; on < 768px: hamburger menu using MUI `Drawer`
    - Clicking a link calls `element.scrollIntoView({ behavior: 'smooth' })` and updates `window.location.hash`
    - Keyboard-navigable; all links focusable
    - _Requirements: 1.2, 1.4, 8.3, 10.2_
  - [x]* 5.4 Write unit tests for Navbar
    - Renders all section links; collapses to hamburger at < 768px; all links are keyboard-focusable
    - _Requirements: 1.2, 8.3, 10.2_
  - [x]* 5.5 Write property test for URL hash (Property 1)
    - **Property 1: URL hash reflects active section**
    - **Validates: Requirements 1.4**
    - Generate arbitrary section ids; navigate to each; assert `window.location.hash` equals `#${sectionId}`
  - [x]* 5.6 Write property test for browser history navigation (Property 2)
    - **Property 2: Browser history navigation restores correct section**
    - **Validates: Requirements 1.3**
    - Generate random navigation sequences; assert back/forward restores the correct section

- [x] 6. Checkpoint — Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [x] 7. Implement InteractiveElement
  - [x] 7.1 Create `src/components/InteractiveElement.tsx`
    - Accept `InteractiveElementProps` (`theme: 'keyboard' | 'cooking'`, `label`, `onActivate?`)
    - Keyboard variant: keycap depression CSS animation + calls `playSound('keyboard-click')`
    - Cooking variant: sizzle/steam CSS animation + calls `playSound('cooking-sizzle')`
    - Check `prefers-reduced-motion` via `window.matchMedia`; skip animations if matched or API unavailable
    - Show visible CSS focus indicator on keyboard focus
    - Minimum 44×44px tap area
    - _Requirements: 5.1, 5.3, 5.4, 5.6, 5.7, 8.6, 10.4_
  - [x]* 7.2 Write unit tests for InteractiveElement
    - Renders keyboard and cooking variants; graceful degradation when animation API unavailable
    - _Requirements: 5.4_
  - [x]* 7.3 Write property test for keyboard animation (Property 7)
    - **Property 7: Keyboard InteractiveElement triggers keycap animation on click**
    - **Validates: Requirements 5.3**
    - Generate arbitrary keyboard `InteractiveElement` props; simulate click; assert animation CSS class/state is applied
  - [x]* 7.4 Write property test for focus indicator (Property 16)
    - **Property 16: Keyboard-focused InteractiveElement shows focus indicator**
    - **Validates: Requirements 10.4**
    - Generate arbitrary `InteractiveElement` props; simulate Tab focus; assert visible focus indicator CSS is applied

- [x] 8. Implement HeroSection
  - [x] 8.1 Create `src/components/HeroSection.tsx`
    - Accept `HeroSectionProps` (`ownerName`, `tagline`)
    - Display owner name and tagline; embed a keyboard-themed `<InteractiveElement>`
    - Include a CTA `<Button>` that scrolls to `#portfolio`
    - Single-column layout on viewports < 768px
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 8.9_

- [x] 9. Implement ProjectCard and PortfolioSection
  - [x] 9.1 Create `src/components/ProjectCard.tsx`
    - Accept `ProjectCardProps` (`project: Project`)
    - Collapsed state: title, shortDescription, image/icon, technology chips
    - Expanded state (via MUI `Collapse`): full description, tech stack, optional repo/demo links
    - Toggle `expanded` on click
    - Hover: CSS `transform: translateY(-4px)` + box-shadow transition
    - `onError` handler on `<img>` swaps to themed placeholder SVG
    - All images include non-empty `alt` text; below-fold images get `loading="lazy"`
    - Minimum 44×44px tap area on mobile
    - _Requirements: 3.2, 3.3, 3.4, 3.5, 3.7, 3.8, 5.2, 8.6, 8.8, 9.2, 10.1_
  - [x]* 9.2 Write unit tests for ProjectCard
    - Renders required fields; expands/collapses on click; renders optional links only when data present; renders empty-state gracefully
    - _Requirements: 3.2, 3.3, 3.4, 3.5, 3.7, 3.8_
  - [x]* 9.3 Write property test for portfolio card count (Property 3)
    - **Property 3: Portfolio renders one card per project**
    - **Validates: Requirements 3.1**
    - Generate arbitrary `Project` arrays; assert rendered `ProjectCard` count equals array length
  - [x]* 9.4 Write property test for ProjectCard expand/collapse round-trip (Property 5)
    - **Property 5: ProjectCard expand/collapse round-trip**
    - **Validates: Requirements 3.4, 3.5**
    - Generate arbitrary `Project` objects; click to expand; click to collapse; assert back to initial collapsed state
  - [x]* 9.5 Write property test for optional project links (Property 6)
    - **Property 6: Optional project links render when data is present**
    - **Validates: Requirements 3.7, 3.8**
    - Generate `Project` objects with arbitrary combinations of `repoUrl`/`demoUrl`; assert link presence matches data
  - [x]* 9.6 Write property test for hover animation (Property 8)
    - **Property 8: ProjectCard hover triggers themed animation**
    - **Validates: Requirements 5.2**
    - Generate arbitrary `Project` objects; simulate `mouseenter`; assert hover CSS class/style is applied
  - [x]* 9.7 Write property test for lazy loading (Property 14)
    - **Property 14: Below-fold images are lazy-loaded**
    - **Validates: Requirements 9.2**
    - Generate arbitrary `Project` arrays with images; assert below-fold `<img>` elements have `loading="lazy"`
  - [x]* 9.8 Write property test for alt text (Property 15)
    - **Property 15: All images have non-empty alt text**
    - **Validates: Requirements 10.1**
    - Generate arbitrary project/content data; render full app; assert all `<img>` elements have non-empty `alt`
  - [x] 9.9 Create `src/components/PortfolioSection.tsx`
    - Accept `PortfolioSectionProps` (`projects: Project[]`)
    - MUI `Grid`: 3 cols ≥ 900px, 2 cols ≥ 600px, 1 col < 600px
    - Render empty-state message when `projects` is empty
    - _Requirements: 3.1, 3.6, 8.4_

- [x] 10. Checkpoint — Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [x] 11. Implement AboutSection
  - [x] 11.1 Create `src/components/AboutSection.tsx`
    - Accept `AboutSectionProps` (`bio`, `interests`, `avatarSrc`)
    - Display biography, interests list, and profile photo/avatar with non-empty `alt`
    - Single-column layout on viewports < 768px
    - _Requirements: 6.1, 6.2, 6.3, 6.4, 8.9, 10.1_
  - [x]* 11.2 Write unit tests for AboutSection
    - Renders bio, interests, and avatar
    - _Requirements: 6.1, 6.2, 6.3_
  - [x]* 11.3 Write property test for AboutSection interests (Property 10)
    - **Property 10: AboutSection renders all interests**
    - **Validates: Requirements 6.2**
    - Generate arbitrary string arrays; assert every string appears in rendered output

- [ ] 12. Implement ContactSection
  - [ ] 12.1 Create `src/components/ContactSection.tsx`
    - Accept `ContactSectionProps` (`email`, `profiles`)
    - Render `<a href="mailto:{email}">` and one `<a>` per profile
    - Single-column layout on viewports < 768px
    - _Requirements: 7.1, 7.2, 8.9_
  - [ ]* 12.2 Write unit tests for ContactSection
    - Renders mailto link with correct email; renders all profile links
    - _Requirements: 7.1, 7.2_
  - [ ]* 12.3 Write property test for contact links (Property 11)
    - **Property 11: Contact links render for all provided data**
    - **Validates: Requirements 7.1, 7.2**
    - Generate arbitrary email strings and profiles arrays; assert all appear as anchors with correct `href` values

- [x] 13. Add mute control and wire audio assets
  - [x] 13.1 Add a mute/unmute toggle button to `Navbar` (or a persistent floating control)
    - Reads `muted` and calls `toggleMute` from `useAudio`
    - Minimum 44×44px tap area; keyboard-focusable
    - _Requirements: 5.8, 8.6, 10.2_
  - [x] 13.2 Add placeholder audio files to `src/assets/sounds/`
    - `keyboard-click.mp3` and `cooking-sizzle.mp3` (can be silent stubs for prototype)
    - Wire `AudioProvider` to reference these paths
    - _Requirements: 5.6, 5.7_

- [x] 14. Add EasterEggTrigger stub
  - Create `src/components/EasterEggTrigger.tsx` as a hidden placeholder
  - Renders nothing visible; logs `"Easter egg triggered — TODO: implement game"` to console on click
  - Wire into `App.tsx`
  - _Requirements: 11 (placeholder)_

- [ ] 15. Responsive design and accessibility polish
  - [ ] 15.1 Audit all sections for semantic HTML (`<nav>`, `<main>`, `<section>`, `<article>`)
    - _Requirements: 10.5_
  - [ ] 15.2 Verify color contrast ≥ 4.5:1 for primary text/background pairs in MUI theme
    - Add a test that computes contrast ratio from theme tokens and asserts ≥ 4.5:1
    - _Requirements: 10.3_
  - [ ] 15.3 Verify font sizes scale correctly; set minimum body font size to 16px on mobile
    - _Requirements: 8.10_
  - [ ] 15.4 Verify no horizontal overflow at 320px and 2560px viewport widths
    - _Requirements: 8.2_
  - [ ]* 15.5 Write property test for no horizontal overflow (Property 12)
    - **Property 12: No horizontal overflow at any supported viewport width**
    - **Validates: Requirements 8.2**
    - Generate viewport widths in [320, 2560]; render app; assert `scrollWidth ≤ clientWidth`
  - [ ]* 15.6 Write property test for touch target size (Property 13)
    - **Property 13: Touch targets meet minimum size on mobile**
    - **Validates: Requirements 8.6**
    - Generate arbitrary interactive elements at mobile viewport; assert bounding box ≥ 44×44px

- [ ] 16. Integration smoke tests
  - [ ]* 16.1 Write smoke test: no autoplay audio
    - Render full app without user interaction; assert no `audio.play()` calls occur
    - _Requirements: 5.5_
  - [ ]* 16.2 Write smoke test: semantic HTML elements present
    - Render full app; assert `<nav>`, `<main>`, `<section>`, `<article>` elements are present
    - _Requirements: 10.5_
  - [ ]* 16.3 Write smoke test: 6-card layout renders without overflow
    - Render `PortfolioSection` with 6 projects; assert no layout overflow
    - _Requirements: 3.6_
  - [ ]* 16.4 Write smoke test: mobile breakpoints
    - Render at 767px and 599px; assert hamburger menu and single-column layout respectively
    - _Requirements: 8.3, 8.4_

- [ ] 17. Final checkpoint — Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for a faster prototype
- Each task references specific requirements for traceability
- Checkpoints at tasks 6, 10, and 17 ensure incremental validation
- Property tests use fast-check with a minimum of 100 iterations each
- Unit tests use Vitest + React Testing Library
- Audio assets can be silent stubs during prototyping and replaced with real sounds later
- The EasterEgg feature (Requirement 11) is explicitly deferred post-prototype

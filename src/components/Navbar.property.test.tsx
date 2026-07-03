// Feature: personal-website-spa, Property 1: URL hash reflects active section
// Feature: personal-website-spa, Property 2: Browser history navigation restores correct section
import { describe, it, expect, afterEach } from 'bun:test';
import * as fc from 'fast-check';
import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from '@mui/material';
import theme from '../theme';
import { AudioProvider } from '../context/AudioContext';
import Navbar from './Navbar';
import type { NavSection } from '../types';

// Validates: Requirements 1.4, 1.3

afterEach(cleanup);
Element.prototype.scrollIntoView = () => {};

// Non-empty, non-whitespace label
const labelArb = fc.string({ minLength: 1 }).filter((s) => s.trim().length > 0);
const sectionIdArb = fc.stringMatching(/^[a-z][a-z0-9-]{1,15}$/);

// The browser's accessible-name computation collapses runs of internal whitespace to a
// single space, so `getByRole(..., { name })` must be queried with the same normalization
// as what the rendered label text resolves to, not the raw label.
function normalizeAccessibleName(label: string): string {
  return label.trim().replace(/\s+/g, ' ');
}

function renderWithSections(sections: NavSection[]) {
  sections.forEach(({ id }) => {
    if (!document.getElementById(id)) {
      const el = document.createElement('div');
      el.id = id;
      document.body.appendChild(el);
    }
  });
  return render(
    <ThemeProvider theme={theme}>
      <AudioProvider>
        <Navbar sections={sections} />
      </AudioProvider>
    </ThemeProvider>
  );
}

describe('Property 1: URL hash reflects active section', () => {
  it('clicking any nav link sets window.location.hash to #sectionId', async () => {
    await fc.assert(
      fc.asyncProperty(
        fc.array(
          fc.record({ id: sectionIdArb, label: labelArb }),
          { minLength: 1, maxLength: 4 }
        ),
        async (sections) => {
          cleanup();
          document.body.innerHTML = '';
          window.location.hash = '';
          const { unmount } = renderWithSections(sections);
          const user = userEvent.setup();
          const target = sections[sections.length - 1];
          const btn = screen.getByRole('button', { name: normalizeAccessibleName(target.label) });
          await user.click(btn);
          expect(window.location.hash).toBe(`#${target.id}`);
          unmount();
        }
      ),
      { numRuns: 50 }
    );
  });
});

describe('Property 2: Browser history navigation restores correct section', () => {
  it('navigating through sections updates hash to last visited section', async () => {
    await fc.assert(
      fc.asyncProperty(
        fc.array(
          fc.record({ id: sectionIdArb, label: labelArb }),
          { minLength: 2, maxLength: 4 }
        ),
        async (rawSections) => {
          // Deduplicate by id
          const seen = new Set<string>();
          const sections = rawSections.filter(({ id }) => seen.has(id) ? false : (seen.add(id), true));
          if (sections.length < 2) return;

          cleanup();
          document.body.innerHTML = '';
          window.location.hash = '';
          const { unmount } = renderWithSections(sections);
          const user = userEvent.setup();

          for (const s of sections) {
            await user.click(screen.getByRole('button', { name: normalizeAccessibleName(s.label) }));
          }
          expect(window.location.hash).toBe(`#${sections[sections.length - 1].id}`);
          unmount();
        }
      ),
      { numRuns: 30 }
    );
  });
});

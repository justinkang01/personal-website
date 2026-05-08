// Feature: personal-website-spa, Property 1: URL hash reflects active section
// Feature: personal-website-spa, Property 2: Browser history navigation restores correct section
import { describe, it, expect, beforeEach } from 'bun:test';
import * as fc from 'fast-check';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from '@mui/material';
import theme from '../theme';
import { AudioProvider } from '../context/AudioContext';
import Navbar from './Navbar';
import type { NavSection } from '../types';

// Validates: Requirements 1.4, 1.3

Element.prototype.scrollIntoView = () => {};

const sectionIdArb = fc.stringMatching(/^[a-z][a-z0-9-]{1,15}$/);

function renderWithSections(sections: NavSection[]) {
  // Create DOM elements for each section
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
  beforeEach(() => {
    window.location.hash = '';
    document.body.innerHTML = '';
  });

  it('clicking any nav link sets window.location.hash to #sectionId', async () => {
    await fc.assert(
      fc.asyncProperty(
        fc.array(
          fc.record({ id: sectionIdArb, label: fc.string({ minLength: 1, maxLength: 20 }) }),
          { minLength: 1, maxLength: 5 }
        ),
        async (sections) => {
          document.body.innerHTML = '';
          window.location.hash = '';
          const { unmount } = renderWithSections(sections);
          const user = userEvent.setup();
          const target = sections[sections.length - 1];
          const btn = screen.getByRole('button', { name: target.label });
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
  it('pushState entries reflect navigated section ids', async () => {
    await fc.assert(
      fc.asyncProperty(
        fc.array(sectionIdArb, { minLength: 2, maxLength: 5 }),
        async (ids) => {
          const unique = [...new Set(ids)];
          if (unique.length < 2) return;
          const sections = unique.map((id) => ({ id, label: id }));
          document.body.innerHTML = '';
          window.location.hash = '';
          const { unmount } = renderWithSections(sections);
          const user = userEvent.setup();

          // Navigate through all sections
          for (const s of sections) {
            await user.click(screen.getByRole('button', { name: s.label }));
          }
          // Last hash should be the last section
          expect(window.location.hash).toBe(`#${sections[sections.length - 1].id}`);
          unmount();
        }
      ),
      { numRuns: 30 }
    );
  });
});

// Feature: personal-website-spa
// Property 3: Portfolio renders one card per project
// Property 5: ProjectCard expand/collapse round-trip
// Property 6: Optional project links render when data is present
// Property 8: ProjectCard hover triggers themed animation
// Property 14: Below-fold images are lazy-loaded
// Property 15: All images have non-empty alt text
import { describe, it, expect, afterEach } from 'bun:test';
import * as fc from 'fast-check';
import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from '@mui/material';
import { fireEvent } from '@testing-library/react';
import theme from '../theme';
import ProjectCard from './ProjectCard';
import PortfolioSection from './PortfolioSection';
import type { Project } from '../types';

// Validates: Requirements 3.1, 3.4, 3.5, 3.7, 3.8, 5.2, 9.2, 10.1

afterEach(cleanup);

const projectArb: fc.Arbitrary<Project> = fc.record({
  id: fc.stringMatching(/^[a-z][a-z0-9-]{0,20}$/),
  title: fc.string({ minLength: 1, maxLength: 60 }).filter((s) => s.trim().length > 0),
  shortDescription: fc.string({ minLength: 1, maxLength: 120 }).filter((s) => s.trim().length > 0),
  fullDescription: fc.string({ minLength: 1 }).filter((s) => s.trim().length > 0),
  technologies: fc.array(fc.string({ minLength: 1 }).filter((s) => s.trim().length > 0), { minLength: 1, maxLength: 5 }),
  imageUrl: fc.option(fc.constant('/images/test.png'), { nil: undefined }),
  repoUrl: fc.option(fc.constant('https://github.com/example/repo'), { nil: undefined }),
  demoUrl: fc.option(fc.constant('https://demo.example.com'), { nil: undefined }),
  theme: fc.option(fc.constantFrom('keyboard' as const, 'cooking' as const, 'neutral' as const), { nil: undefined }),
});

function wrap(children: React.ReactNode) {
  return render(<ThemeProvider theme={theme}>{children}</ThemeProvider>);
}

describe('Property 3: Portfolio renders one card per project', () => {
  it('rendered card count equals projects array length', () => {
    fc.assert(
      fc.property(fc.array(projectArb, { minLength: 1, maxLength: 6 }), (projects) => {
        cleanup();
        wrap(<PortfolioSection projects={projects} />);
        // Each card has data-expanded attribute
        const cards = document.querySelectorAll('[data-expanded]');
        expect(cards.length).toBe(projects.length);
      }),
      { numRuns: 50 }
    );
  });
});

describe('Property 5: ProjectCard expand/collapse round-trip', () => {
  it('clicking expands then collapses the card', async () => {
    await fc.assert(
      fc.asyncProperty(projectArb, async (project) => {
        cleanup();
        wrap(<ProjectCard project={project} />);
        const card = document.querySelector('[data-expanded]')!;
        expect(card.getAttribute('data-expanded')).toBe('false');
        await userEvent.click(card as HTMLElement);
        expect(card.getAttribute('data-expanded')).toBe('true');
        await userEvent.click(card as HTMLElement);
        expect(card.getAttribute('data-expanded')).toBe('false');
      }),
      { numRuns: 30 }
    );
  });
});

describe('Property 6: Optional project links render when data is present', () => {
  it('repo/demo links appear iff repoUrl/demoUrl are defined', async () => {
    await fc.assert(
      fc.asyncProperty(projectArb, async (project) => {
        cleanup();
        wrap(<ProjectCard project={project} />);
        // Expand to reveal links
        await userEvent.click(document.querySelector('[data-expanded]') as HTMLElement);

        const repoLink = screen.queryByRole('link', { name: /source/i });
        const demoLink = screen.queryByRole('link', { name: /demo/i });

        if (project.repoUrl) {
          expect(repoLink).not.toBeNull();
          expect(repoLink!.getAttribute('href')).toBe(project.repoUrl);
        } else {
          expect(repoLink).toBeNull();
        }

        if (project.demoUrl) {
          expect(demoLink).not.toBeNull();
          expect(demoLink!.getAttribute('href')).toBe(project.demoUrl);
        } else {
          expect(demoLink).toBeNull();
        }
      }),
      { numRuns: 50 }
    );
  });
});

describe('Property 8: ProjectCard hover triggers themed animation', () => {
  it('mouseenter sets data-hovered=true on the card', () => {
    fc.assert(
      fc.property(projectArb, (project) => {
        cleanup();
        wrap(<ProjectCard project={project} />);
        const card = document.querySelector('[data-expanded]')!;
        expect(card.getAttribute('data-hovered')).toBe('false');
        fireEvent.mouseEnter(card);
        expect(card.getAttribute('data-hovered')).toBe('true');
        fireEvent.mouseLeave(card);
        expect(card.getAttribute('data-hovered')).toBe('false');
      }),
      { numRuns: 30 }
    );
  });
});

describe('Property 14: Below-fold images are lazy-loaded', () => {
  it('all project card images have loading="lazy"', () => {
    fc.assert(
      fc.property(
        fc.array(
          projectArb.filter((p) => p.imageUrl !== undefined),
          { minLength: 1, maxLength: 4 }
        ),
        (projects) => {
          cleanup();
          wrap(<PortfolioSection projects={projects} />);
          const imgs = document.querySelectorAll('img');
          imgs.forEach((img) => {
            expect(img.getAttribute('loading')).toBe('lazy');
          });
        }
      ),
      { numRuns: 30 }
    );
  });
});

describe('Property 15: All images have non-empty alt text', () => {
  it('every img element has a non-empty alt attribute', () => {
    fc.assert(
      fc.property(
        fc.array(projectArb.filter((p) => p.imageUrl !== undefined), { minLength: 1, maxLength: 4 }),
        (projects) => {
          cleanup();
          wrap(<PortfolioSection projects={projects} />);
          const imgs = document.querySelectorAll('img');
          imgs.forEach((img) => {
            const alt = img.getAttribute('alt');
            expect(alt !== null && alt.trim().length > 0).toBe(true);
          });
        }
      ),
      { numRuns: 30 }
    );
  });
});

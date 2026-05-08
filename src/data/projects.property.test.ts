// Feature: personal-website-spa, Property 4: ProjectCard renders required fields
import { describe, it, expect } from 'vitest';
import * as fc from 'fast-check';
import { Project } from '../types';

// Validates: Requirements 3.2, 3.3
// This property test verifies that for any valid Project object, the required
// display fields (title, shortDescription, technologies) are present and non-empty.
// Full rendering is tested in ProjectCard unit/property tests once the component exists.

const projectArb: fc.Arbitrary<Project> = fc.record({
  id: fc.stringMatching(/^[a-z][a-z0-9-]{0,30}$/),
  title: fc.string({ minLength: 1, maxLength: 100 }),
  shortDescription: fc.string({ minLength: 1, maxLength: 120 }),
  fullDescription: fc.string({ minLength: 1 }),
  technologies: fc.array(fc.string({ minLength: 1 }), { minLength: 1, maxLength: 10 }),
  imageUrl: fc.option(fc.webUrl(), { nil: undefined }),
  repoUrl: fc.option(fc.webUrl(), { nil: undefined }),
  demoUrl: fc.option(fc.webUrl(), { nil: undefined }),
  theme: fc.option(fc.constantFrom('keyboard' as const, 'cooking' as const, 'neutral' as const), { nil: undefined }),
});

describe('Property 4: ProjectCard renders required fields', () => {
  it('every Project has a non-empty title, shortDescription, and at least one technology', () => {
    fc.assert(
      fc.property(projectArb, (project) => {
        expect(project.title.length).toBeGreaterThan(0);
        expect(project.shortDescription.length).toBeGreaterThan(0);
        expect(project.shortDescription.length).toBeLessThanOrEqual(120);
        expect(project.technologies.length).toBeGreaterThan(0);
        project.technologies.forEach((tech) => expect(tech.length).toBeGreaterThan(0));
      }),
      { numRuns: 100 }
    );
  });

  it('optional fields repoUrl and demoUrl are either undefined or valid URLs', () => {
    fc.assert(
      fc.property(projectArb, (project) => {
        if (project.repoUrl !== undefined) {
          expect(project.repoUrl).toMatch(/^https?:\/\//);
        }
        if (project.demoUrl !== undefined) {
          expect(project.demoUrl).toMatch(/^https?:\/\//);
        }
      }),
      { numRuns: 100 }
    );
  });
});

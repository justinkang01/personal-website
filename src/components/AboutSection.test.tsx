// Feature: personal-website-spa, Property 10: AboutSection renders all interests
import { describe, it, expect, afterEach } from 'bun:test';
import * as fc from 'fast-check';
import { render, screen, cleanup } from '@testing-library/react';
import { ThemeProvider } from '@mui/material';
import theme from '../theme';
import AboutSection from './AboutSection';

// Validates: Requirements 6.1, 6.2, 6.3, 10.1

afterEach(cleanup);

function renderAbout(bio = 'A bio.', interests = ['Guitar', 'Cooking'], avatarSrc = '/avatar.jpg') {
  return render(
    <ThemeProvider theme={theme}>
      <AboutSection bio={bio} interests={interests} avatarSrc={avatarSrc} />
    </ThemeProvider>
  );
}

describe('AboutSection', () => {
  it('renders the bio text', () => {
    renderAbout('I love keyboards.');
    expect(screen.getByText('I love keyboards.')).toBeDefined();
  });

  it('renders all interests as chips', () => {
    renderAbout('bio', ['Guitar', 'Volleyball', 'Mechanical Keyboards', 'Cooking']);
    expect(screen.getByText('Guitar')).toBeDefined();
    expect(screen.getByText('Volleyball')).toBeDefined();
    expect(screen.getByText('Mechanical Keyboards')).toBeDefined();
    expect(screen.getByText('Cooking')).toBeDefined();
  });

  it('renders avatar with non-empty alt text', () => {
    renderAbout();
    const img = screen.getByRole('img', { name: /profile photo/i });
    expect(img.getAttribute('alt')).toBeTruthy();
  });
});

describe('Property 10: AboutSection renders all interests', () => {
  it('every interest string appears in the rendered output', () => {
    fc.assert(
      fc.property(
        fc.array(
          fc.stringMatching(/^[A-Za-z][A-Za-z0-9 ]{0,20}$/),
          { minLength: 1, maxLength: 8 }
        ),
        (interests) => {
          cleanup();
          renderAbout('bio', interests);
          const bodyText = document.body.textContent ?? '';
          interests.forEach((interest) => {
            expect(bodyText).toContain(interest.trim());
          });
        }
      ),
      { numRuns: 100 }
    );
  });
});

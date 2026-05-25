// Feature: personal-website-spa, Tasks 12.2 + 12.3
import { describe, it, expect, afterEach } from 'bun:test';
import * as fc from 'fast-check';
import { render, screen, cleanup } from '@testing-library/react';
import { ThemeProvider } from '@mui/material';
import theme from '../theme';
import ContactSection from './ContactSection';

// Validates: Requirements 7.1, 7.2

afterEach(cleanup);

function renderContact(
  email = 'test@example.com',
  profiles: { label: string; url: string; icon: null }[] = []
) {
  return render(
    <ThemeProvider theme={theme}>
      <ContactSection email={email} profiles={profiles} />
    </ThemeProvider>
  );
}

describe('ContactSection', () => {
  it('renders mailto link with correct email', () => {
    renderContact('hello@example.com');
    const link = screen.getByRole('link', { name: 'hello@example.com' });
    expect(link.getAttribute('href')).toBe('mailto:hello@example.com');
  });

  it('renders all profile links', () => {
    const profiles = [
      { label: 'GitHub', url: 'https://github.com/user', icon: null },
      { label: 'LinkedIn', url: 'https://linkedin.com/in/user', icon: null },
    ];
    renderContact('a@b.com', profiles);
    profiles.forEach((p) => {
      const link = screen.getByRole('link', { name: p.label });
      expect(link.getAttribute('href')).toBe(p.url);
    });
  });
});

describe('Property 11: Contact links render for all provided data', () => {
  it('all emails and profiles appear as anchors with correct hrefs', () => {
    fc.assert(
      fc.property(
        fc.emailAddress(),
        fc.array(
          fc.record({
            label: fc.stringMatching(/^[A-Za-z][A-Za-z0-9]{1,15}$/),
            url: fc.webUrl(),
            icon: fc.constant(null),
          }),
          { minLength: 0, maxLength: 5 }
        ),
        (email, profiles) => {
          cleanup();
          renderContact(email, profiles);
          const mailtoLink = screen.getByRole('link', { name: email });
          expect(mailtoLink.getAttribute('href')).toBe(`mailto:${email}`);
          profiles.forEach((p) => {
            const link = screen.getByRole('link', { name: p.label });
            expect(link.getAttribute('href')).toBe(p.url);
          });
        }
      ),
      { numRuns: 100 }
    );
  });
});

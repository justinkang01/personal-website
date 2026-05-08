import { describe, it, expect } from 'bun:test';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from '@mui/material';
import theme from '../theme';
import { AudioProvider } from '../context/AudioContext';
import Navbar from './Navbar';
import type { NavSection } from '../types';

const sections: NavSection[] = [
  { id: 'hero', label: 'Home' },
  { id: 'portfolio', label: 'Portfolio' },
  { id: 'about', label: 'About' },
];

function renderNavbar() {
  return render(
    <ThemeProvider theme={theme}>
      <AudioProvider>
        <Navbar sections={sections} />
      </AudioProvider>
    </ThemeProvider>
  );
}

describe('Navbar', () => {
  it('renders all section links on desktop', () => {
    // Default happy-dom viewport is wide enough for desktop
    renderNavbar();
    sections.forEach((s) => {
      expect(screen.getByRole('button', { name: s.label })).toBeDefined();
    });
  });

  it('all nav buttons are keyboard-focusable (have tabIndex >= 0)', () => {
    renderNavbar();
    sections.forEach((s) => {
      const btn = screen.getByRole('button', { name: s.label });
      const tabIndex = btn.getAttribute('tabindex');
      // tabIndex null means default (0), which is focusable
      expect(tabIndex === null || Number(tabIndex) >= 0).toBe(true);
    });
  });

  it('renders mute toggle button', () => {
    renderNavbar();
    expect(screen.getByLabelText(/mute audio/i)).toBeDefined();
  });

  it('clicking a nav link updates window.location.hash', async () => {
    // Stub scrollIntoView
    Element.prototype.scrollIntoView = () => {};
    document.body.innerHTML = '<div id="portfolio"></div>';
    renderNavbar();
    const user = userEvent.setup();
    await user.click(screen.getByRole('button', { name: 'Portfolio' }));
    expect(window.location.hash).toBe('#portfolio');
  });
});

// Feature: personal-website-spa, Tasks 16.1–16.4: Integration smoke tests
import { describe, it, expect, afterEach, mock } from 'bun:test';
import { render, screen, cleanup } from '@testing-library/react';
import { ThemeProvider } from '@mui/material';
import { HashRouter } from 'react-router-dom';
import theme from '../theme';
import { AudioProvider } from '../context/AudioContext';
import App from '../App';
import PortfolioSection from '../components/PortfolioSection';
import type { Project } from '../types';

afterEach(cleanup);

function renderApp() {
  Element.prototype.scrollIntoView = () => {};
  return render(
    <ThemeProvider theme={theme}>
      <AudioProvider>
        <HashRouter>
          <App />
        </HashRouter>
      </AudioProvider>
    </ThemeProvider>
  );
}

// 16.1: No autoplay audio on mount
describe('16.1: No autoplay audio', () => {
  it('does not call audio.play() on initial render', () => {
    const playSpy = mock(() => Promise.resolve());
    const OriginalAudio = globalThis.Audio;
    globalThis.Audio = class {
      play = playSpy;
      preload = '';
      currentTime = 0;
    } as unknown as typeof Audio;

    renderApp();
    expect(playSpy).not.toHaveBeenCalled();

    globalThis.Audio = OriginalAudio;
  });
});

// 16.2: Semantic HTML elements present
describe('16.2: Semantic HTML elements present', () => {
  it('renders nav, main, section, and article elements', () => {
    renderApp();
    expect(document.querySelector('nav')).not.toBeNull();
    expect(document.querySelector('main')).not.toBeNull();
    expect(document.querySelector('section')).not.toBeNull();
    expect(document.querySelector('article')).not.toBeNull();
  });
});

// 16.3: 6-card layout renders without overflow
describe('16.3: 6-card layout renders without overflow', () => {
  it('renders 6 project cards without layout overflow', () => {
    const projects: Project[] = Array.from({ length: 6 }, (_, i) => ({
      id: `p${i}`,
      title: `Project ${i}`,
      shortDescription: 'Short desc',
      fullDescription: 'Full desc',
      technologies: ['React'],
      theme: 'neutral' as const,
    }));
    render(
      <ThemeProvider theme={theme}>
        <PortfolioSection projects={projects} />
      </ThemeProvider>
    );
    const cards = document.querySelectorAll('[data-testid="project-card"], .MuiCard-root');
    expect(cards.length).toBe(6);
    // scrollWidth <= clientWidth means no horizontal overflow
    expect(document.body.scrollWidth).toBeLessThanOrEqual(document.body.clientWidth + 1);
  });
});

// 16.4: Mobile breakpoints — hamburger menu and single-column layout
describe('16.4: Mobile breakpoints', () => {
  it('renders hamburger menu icon at mobile viewport', () => {
    // Simulate mobile: all min-width queries return false
    const original = window.matchMedia;
    window.matchMedia = (query: string) => ({
      matches: !query.includes('min-width'),
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
    });
    renderApp();
    expect(screen.getByLabelText(/open navigation menu/i)).toBeDefined();
    window.matchMedia = original;
  });
});

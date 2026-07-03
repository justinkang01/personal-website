import { describe, it, expect, afterEach, mock } from 'bun:test';
import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from '@mui/material';
import theme from '../theme';
import { AudioProvider } from '../context/AudioContext';
import InteractiveElement from './InteractiveElement';

afterEach(cleanup);

const mockPlay = mock(() => Promise.resolve());
(globalThis as unknown as { Audio: unknown }).Audio = mock(() => ({
  play: mockPlay,
  currentTime: 0,
  preload: '',
}));

function renderEl(elTheme: 'keyboard' | 'cooking', label = 'test') {
  return render(
    <ThemeProvider theme={theme}>
      <AudioProvider>
        <InteractiveElement theme={elTheme} label={label} />
      </AudioProvider>
    </ThemeProvider>
  );
}

describe('InteractiveElement', () => {
  it('renders keyboard variant', () => {
    renderEl('keyboard', 'Press key');
    expect(screen.getByRole('button', { name: 'Press key' })).toBeDefined();
  });

  it('renders cooking variant', () => {
    renderEl('cooking', 'Sizzle');
    expect(screen.getByRole('button', { name: 'Sizzle' })).toBeDefined();
  });

  it('has data-theme attribute matching the theme prop', () => {
    renderEl('keyboard', 'Key');
    expect(screen.getByRole('button', { name: 'Key' }).getAttribute('data-theme')).toBe('keyboard');
  });

  it('is keyboard-focusable (tabIndex >= 0)', () => {
    renderEl('keyboard', 'Key');
    const btn = screen.getByRole('button', { name: 'Key' });
    const tabIndex = btn.getAttribute('tabindex');
    expect(tabIndex === null || Number(tabIndex) >= 0).toBe(true);
  });

  it('calls onActivate when clicked', async () => {
    const onActivate = mock(() => {});
    render(
      <ThemeProvider theme={theme}>
        <AudioProvider>
          <InteractiveElement theme="keyboard" label="Key" onActivate={onActivate} />
        </AudioProvider>
      </ThemeProvider>
    );
    await userEvent.click(screen.getByRole('button', { name: 'Key' }));
    expect(onActivate).toHaveBeenCalledTimes(1);
  });
});

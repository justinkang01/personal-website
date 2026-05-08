import { describe, it, expect } from 'bun:test';
import theme from './index';

describe('MUI theme', () => {
  it('has correct primary palette (keyboard - charcoal)', () => {
    expect(theme.palette.primary.main).toBe('#2C2C2E');
    expect(theme.palette.primary.contrastText).toBe('#F5F5F0');
  });

  it('has correct secondary palette (cooking - amber)', () => {
    expect(theme.palette.secondary.main).toBe('#D4813A');
  });

  it('has dark mode background', () => {
    expect(theme.palette.background.default).toBe('#1C1C1E');
    expect(theme.palette.background.paper).toBe('#2C2C2E');
  });

  it('uses monospace font family', () => {
    expect(theme.typography.fontFamily).toContain('monospace');
  });

  it('matches palette and typography snapshot', () => {
    expect({
      primaryMain: theme.palette.primary.main,
      secondaryMain: theme.palette.secondary.main,
      bgDefault: theme.palette.background.default,
      fontFamily: theme.typography.fontFamily,
    }).toMatchSnapshot();
  });
});

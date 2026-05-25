import { describe, it, expect } from 'bun:test';
import theme from './index';

// WCAG relative luminance
function luminance(hex: string): number {
  const rgb = [1, 3, 5].map((i) => {
    const c = parseInt(hex.slice(i, i + 2), 16) / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2];
}
function contrastRatio(hex1: string, hex2: string): number {
  const [l1, l2] = [luminance(hex1), luminance(hex2)].sort((a, b) => b - a);
  return (l1 + 0.05) / (l2 + 0.05);
}

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

describe('15.2: Color contrast ≥ 4.5:1', () => {
  it('primary text on default background meets WCAG AA', () => {
    // #F5F5F0 on #1C1C1E
    expect(contrastRatio('#F5F5F0', '#1C1C1E')).toBeGreaterThanOrEqual(4.5);
  });

  it('primary text on paper background meets WCAG AA', () => {
    // #F5F5F0 on #2C2C2E
    expect(contrastRatio('#F5F5F0', '#2C2C2E')).toBeGreaterThanOrEqual(4.5);
  });
});

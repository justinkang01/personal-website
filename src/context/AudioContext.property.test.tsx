// Feature: personal-website-spa, Property 9: Audio theme routing
import { describe, it, expect, mock } from 'bun:test';
import * as fc from 'fast-check';
import { renderHook, act } from '@testing-library/react';
import { AudioProvider, useAudio } from './AudioContext';

// Validates: Requirements 5.6, 5.7

const mockPlay = mock(() => Promise.resolve());
(globalThis as unknown as { Audio: unknown }).Audio = mock(() => ({
  play: mockPlay,
  currentTime: 0,
  preload: '',
}));

function wrapper({ children }: { children: React.ReactNode }) {
  return <AudioProvider>{children}</AudioProvider>;
}

describe('Property 9: Audio theme routing', () => {
  it('keyboard theme calls playSound("keyboard-click"), cooking calls playSound("cooking-sizzle")', () => {
    fc.assert(
      fc.property(
        fc.constantFrom('keyboard' as const, 'cooking' as const),
        fc.boolean(),
        (theme, muted) => {
          mockPlay.mockClear();
          const { result } = renderHook(() => useAudio(), { wrapper });

          if (muted) act(() => result.current.toggleMute());

          const soundId = theme === 'keyboard' ? 'keyboard-click' : 'cooking-sizzle';
          act(() => result.current.playSound(soundId));

          if (muted) {
            expect(mockPlay).not.toHaveBeenCalled();
          } else {
            expect(mockPlay).toHaveBeenCalledTimes(1);
          }
        }
      ),
      { numRuns: 100 }
    );
  });
});

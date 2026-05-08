import { describe, it, expect, mock, beforeEach } from 'bun:test';
import { renderHook, act } from '@testing-library/react';
import { AudioProvider, useAudio } from './AudioContext';

// Mock Audio globally
const mockPlay = mock(() => Promise.resolve());
const mockAudio = { play: mockPlay, currentTime: 0, preload: '' };
(globalThis as unknown as { Audio: unknown }).Audio = mock(() => mockAudio);

function wrapper({ children }: { children: React.ReactNode }) {
  return <AudioProvider>{children}</AudioProvider>;
}

describe('AudioProvider', () => {
  beforeEach(() => {
    mockPlay.mockClear();
  });

  it('starts unmuted', () => {
    const { result } = renderHook(() => useAudio(), { wrapper });
    expect(result.current.muted).toBe(false);
  });

  it('toggleMute flips muted state', () => {
    const { result } = renderHook(() => useAudio(), { wrapper });
    act(() => result.current.toggleMute());
    expect(result.current.muted).toBe(true);
    act(() => result.current.toggleMute());
    expect(result.current.muted).toBe(false);
  });

  it('playSound calls audio.play when unmuted', () => {
    const { result } = renderHook(() => useAudio(), { wrapper });
    act(() => result.current.playSound('keyboard-click'));
    expect(mockPlay).toHaveBeenCalledTimes(1);
  });

  it('playSound is a no-op when muted', () => {
    const { result } = renderHook(() => useAudio(), { wrapper });
    act(() => result.current.toggleMute());
    act(() => result.current.playSound('keyboard-click'));
    expect(mockPlay).not.toHaveBeenCalled();
  });
});

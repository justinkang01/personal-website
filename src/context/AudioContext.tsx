import { createContext, useContext, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import type { SoundId } from '../types';

interface AudioContextValue {
  muted: boolean;
  toggleMute: () => void;
  playSound: (soundId: SoundId) => void;
}

const AudioContext = createContext<AudioContextValue | null>(null);

const SOUND_PATHS: Record<SoundId, string> = {
  'keyboard-click': '/sounds/keyboard-click.mp3',
  'cooking-sizzle': '/sounds/cooking-sizzle.mp3',
};

export function AudioProvider({ children }: { children: ReactNode }) {
  const [muted, setMuted] = useState(false);
  const audioRefs = useRef<Partial<Record<SoundId, HTMLAudioElement>>>({});

  function playSound(soundId: SoundId) {
    if (muted) return;
    let audio = audioRefs.current[soundId];
    if (!audio) {
      audio = new Audio(SOUND_PATHS[soundId]);
      audio.preload = 'none';
      audioRefs.current[soundId] = audio;
    }
    audio.currentTime = 0;
    audio.play().catch((err) => {
      console.warn(`Audio playback failed for ${soundId}:`, err);
    });
  }

  return (
    <AudioContext.Provider value={{ muted, toggleMute: () => setMuted((m) => !m), playSound }}>
      {children}
    </AudioContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components -- context provider + hook are intentionally colocated
export function useAudio(): AudioContextValue {
  const ctx = useContext(AudioContext);
  if (!ctx) throw new Error('useAudio must be used within AudioProvider');
  return ctx;
}

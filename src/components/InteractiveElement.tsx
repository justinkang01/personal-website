import { useState, useCallback } from 'react';
import { Box, ButtonBase } from '@mui/material';
import { useAudio } from '../context/AudioContext';

export interface InteractiveElementProps {
  theme: 'keyboard' | 'cooking';
  label: string;
  onActivate?: () => void;
}

function prefersReducedMotion(): boolean {
  try {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  } catch {
    return true; // fallback: skip animations
  }
}

export default function InteractiveElement({ theme, label, onActivate }: InteractiveElementProps) {
  const { playSound } = useAudio();
  const [active, setActive] = useState(false);

  const handleClick = useCallback(() => {
    const soundId = theme === 'keyboard' ? 'keyboard-click' : 'cooking-sizzle';
    playSound(soundId);
    onActivate?.();

    if (!prefersReducedMotion()) {
      setActive(true);
      setTimeout(() => setActive(false), 150);
    }
  }, [theme, playSound, onActivate]);

  const isKeyboard = theme === 'keyboard';

  return (
    <ButtonBase
      onClick={handleClick}
      aria-label={label}
      data-theme={theme}
      data-active={active}
      sx={{
        minWidth: 44,
        minHeight: 44,
        borderRadius: isKeyboard ? '6px' : '50%',
        border: isKeyboard ? '2px solid' : '2px dashed',
        borderColor: isKeyboard ? 'primary.light' : 'secondary.main',
        padding: '8px 16px',
        fontFamily: isKeyboard ? 'monospace' : 'inherit',
        fontSize: '1.25rem',
        userSelect: 'none',
        transition: 'transform 0.1s ease, box-shadow 0.1s ease',
        transform: active ? 'translateY(3px)' : 'translateY(0)',
        boxShadow: active
          ? 'none'
          : isKeyboard
          ? '0 4px 0 rgba(0,0,0,0.4)'
          : '0 2px 8px rgba(212,129,58,0.4)',
        '&:focus-visible': {
          outline: '3px solid',
          outlineColor: 'secondary.main',
          outlineOffset: '2px',
        },
      }}
    >
      {isKeyboard ? '⌨' : '🍳'}
    </ButtonBase>
  );
}

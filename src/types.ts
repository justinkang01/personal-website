// Data models for Personal Website SPA

export interface Project {
  id: string; // unique slug, e.g. "keyboard-configurator"
  title: string;
  shortDescription: string; // shown in collapsed card (≤ 120 chars)
  fullDescription: string; // shown when expanded (markdown or plain text)
  technologies: string[]; // e.g. ["React", "TypeScript", "Rust"]
  imageUrl?: string; // card thumbnail
  repoUrl?: string; // optional GitHub link
  demoUrl?: string; // optional live demo link
  theme?: 'keyboard' | 'cooking' | 'neutral'; // drives card accent color
}

export interface NavSection {
  id: string; // matches DOM element id and hash route fragment
  label: string; // display label in navbar
}

export type SoundId = 'keyboard-click' | 'cooking-sizzle';

export interface AudioState {
  muted: boolean;
  loadedSounds: Set<SoundId>;
}

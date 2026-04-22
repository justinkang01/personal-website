import { Project } from '../types';

export const projects: Project[] = [
  {
    id: 'meal-prep-planner',
    title: 'Weekly Meal Prep Planner',
    shortDescription:
      'Organize weekly meal prep with automated shopping lists, batch cooking schedules, and storage tips.',
    fullDescription:
      'A meal planning tool designed for batch cooking enthusiasts. Plan your week, generate consolidated shopping lists, get optimal cooking order suggestions, and track container storage. Includes timer management for parallel cooking tasks and leftover tracking.',
    technologies: ['React', 'TypeScript', 'IndexedDB', 'PWA'],
    imageUrl: '/images/meal-prep.png',
    repoUrl: 'https://github.com/example/TBD',
    demoUrl: 'TBD',
    theme: 'cooking',
  },
  {
    id: 'typing-rhythm-game',
    title: 'Typing Rhythm Game',
    shortDescription:
      'Musical typing game that combines mechanical keyboard sounds with rhythm game mechanics.',
    fullDescription:
      'A unique rhythm game where players type to the beat using their mechanical keyboard. Each keypress triggers musical notes, and accuracy is scored based on timing. Features multiple difficulty levels, custom song imports, and leaderboards. Celebrates the tactile and auditory experience of mechanical keyboards.',
    technologies: ['React', 'TypeScript', 'Tone.js', 'Web Audio API'],
    imageUrl: '/images/typing-rhythm.png',
    demoUrl: 'TBD',
    theme: 'keyboard',
  },
];

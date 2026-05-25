import type { Project } from '../types';

export const projects: Project[] = [
  {
    id: 'meal-prep-planner',
    title: 'Weekly Meal Prep Planner (WIP)',
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
    title: 'Typing Game',
    shortDescription:
      'Typing game that combines my interest in mechanical keyboards with my love for cats.',
    fullDescription:
      'A simple typing simulation game that helps you improve your typing accuracy and speed by roleplaying as a cat in search of fish and food!',
    technologies: ['HTML', 'JavaScript', 'CSS'],
    imageUrl: '/images/typing-rhythm.png',
    demoUrl: 'https://justinkang01.github.io/typing/',
    repoUrl: 'https://github.com/justinkang01/typing/tree/mainline',
    embeddable: true,
    theme: 'keyboard',
  },
];

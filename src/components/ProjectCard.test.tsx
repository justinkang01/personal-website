import { describe, it, expect, afterEach } from 'bun:test';
import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from '@mui/material';
import theme from '../theme';
import ProjectCard from './ProjectCard';
import type { Project } from '../types';

afterEach(cleanup);

const baseProject: Project = {
  id: 'test-project',
  title: 'Test Project',
  shortDescription: 'A short description.',
  fullDescription: 'The full description with more details.',
  technologies: ['React', 'TypeScript'],
  theme: 'keyboard',
};

function renderCard(project: Project) {
  return render(
    <ThemeProvider theme={theme}>
      <ProjectCard project={project} />
    </ThemeProvider>
  );
}

describe('ProjectCard', () => {
  it('renders title and short description', () => {
    renderCard(baseProject);
    expect(screen.getByText('Test Project')).toBeDefined();
    expect(screen.getByText('A short description.')).toBeDefined();
  });

  it('renders all technology chips', () => {
    renderCard(baseProject);
    expect(screen.getByText('React')).toBeDefined();
    expect(screen.getByText('TypeScript')).toBeDefined();
  });

  it('does not show full description initially', () => {
    renderCard(baseProject);
    expect(screen.queryByText('The full description with more details.')).toBeNull();
  });

  it('expands to show full description on click', async () => {
    renderCard(baseProject);
    await userEvent.click(screen.getByText('Test Project').closest('[data-expanded]')!);
    expect(screen.getByText('The full description with more details.')).toBeDefined();
  });

  it('collapses back on second click', async () => {
    renderCard(baseProject);
    const card = screen.getByText('Test Project').closest('[data-expanded]')!;
    await userEvent.click(card);
    expect(card.getAttribute('data-expanded')).toBe('true');
    await userEvent.click(card);
    expect(card.getAttribute('data-expanded')).toBe('false');
  });

  it('renders repo link when repoUrl is present', async () => {
    const project = { ...baseProject, repoUrl: 'https://github.com/example/repo' };
    renderCard(project);
    await userEvent.click(screen.getByText('Test Project').closest('[data-expanded]')!);
    const link = screen.getByRole('link', { name: /source/i });
    expect(link.getAttribute('href')).toBe('https://github.com/example/repo');
  });

  it('renders demo link when demoUrl is present', async () => {
    const project = { ...baseProject, demoUrl: 'https://demo.example.com' };
    renderCard(project);
    await userEvent.click(screen.getByText('Test Project').closest('[data-expanded]')!);
    const link = screen.getByRole('link', { name: /demo/i });
    expect(link.getAttribute('href')).toBe('https://demo.example.com');
  });

  it('does not render repo link when repoUrl is absent', async () => {
    renderCard(baseProject);
    await userEvent.click(screen.getByText('Test Project').closest('[data-expanded]')!);
    expect(screen.queryByRole('link', { name: /source/i })).toBeNull();
  });
});

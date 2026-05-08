import type { Project } from '../types';

interface PortfolioSectionProps {
  projects: Project[];
}

export default function PortfolioSection({ projects }: PortfolioSectionProps) {
  if (projects.length === 0) return <p>No projects yet — check back soon!</p>;
  return (
    <div>
      {projects.map((p) => (
        <div key={p.id}>{p.title}</div>
      ))}
    </div>
  );
}

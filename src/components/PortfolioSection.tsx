import { Container, Grid, Typography, Box } from '@mui/material';
import ProjectCard from './ProjectCard';
import type { Project } from '../types';

interface PortfolioSectionProps {
  projects: Project[];
}

export default function PortfolioSection({ projects }: PortfolioSectionProps) {
  return (
    <Box component="article" sx={{ py: 8, bgcolor: 'background.default' }}>
      <Container maxWidth="lg">
        <Typography variant="h2" sx={{ mb: 4, fontSize: { xs: '1.75rem', md: '2.5rem' } }}>
          Portfolio
        </Typography>
        {projects.length === 0 ? (
          <Typography color="text.secondary">No projects yet — check back soon!</Typography>
        ) : (
          <Grid container spacing={3}>
            {projects.map((project) => (
              <Grid key={project.id} size={{ xs: 12, sm: 6, md: 4 }}>
                <ProjectCard project={project} />
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </Box>
  );
}

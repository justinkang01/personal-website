import { useState } from 'react';
import {
  Card,
  CardContent,
  CardActions,
  CardMedia,
  Typography,
  Chip,
  Collapse,
  Button,
  Box,
  Stack,
} from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import type { Project } from '../types';
import GameModal from './GameModal';

interface ProjectCardProps {
  project: Project;
}

const PLACEHOLDER_SVG =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='200'%3E%3Crect width='400' height='200' fill='%232C2C2E'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%23AEAEB2' font-size='14'%3ENo image%3C/text%3E%3C/svg%3E";

const ACCENT: Record<NonNullable<Project['theme']>, string> = {
  keyboard: '#48484A',
  cooking: '#D4813A',
  neutral: '#3A3A3C',
};

export default function ProjectCard({ project }: ProjectCardProps) {
  const [expanded, setExpanded] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const accent = ACCENT[project.theme ?? 'neutral'];

  return (
    <Card
      data-expanded={expanded}
      data-hovered={hovered}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      sx={{
        cursor: 'pointer',
        borderTop: `3px solid ${accent}`,
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        boxShadow: hovered ? '0 8px 24px rgba(0,0,0,0.4)' : '0 4px 12px rgba(0,0,0,0.3)',
        transition: 'transform 0.15s ease, box-shadow 0.15s ease',
      }}
      onClick={() => {
        if (!modalOpen) setExpanded((e) => !e);
      }}
    >
      {project.imageUrl && (
        <CardMedia
          component="img"
          height="160"
          image={project.imageUrl}
          alt={project.title}
          loading="lazy"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = PLACEHOLDER_SVG;
          }}
        />
      )}
      {!project.imageUrl && (
        <Box
          sx={{
            height: 80,
            bgcolor: accent,
            opacity: 0.3,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          role="img"
          aria-label={`${project.title} placeholder`}
        />
      )}

      <CardContent>
        <Typography variant="h6" gutterBottom>
          {project.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {project.shortDescription}
        </Typography>
        <Stack sx={{ flexWrap: 'wrap', flexDirection: 'row', gap: 0.5 }}>
          {project.technologies.map((tech, index) => (
            <Chip key={`${tech}-${index}`} label={tech} size="small" variant="outlined" />
          ))}
        </Stack>
      </CardContent>

      <Collapse in={expanded} unmountOnExit>
        <CardContent sx={{ pt: 0 }}>
          <Typography variant="body2" sx={{ mb: 2 }}>
            {project.fullDescription}
          </Typography>
        </CardContent>
        {(project.repoUrl || project.demoUrl) && (
          <CardActions onClick={(e) => e.stopPropagation()}>
            {project.embeddable && project.demoUrl && (
              <Button
                size="small"
                color="inherit"
                onClick={() => setModalOpen(true)}
                startIcon={<PlayArrowIcon />}
                sx={{
                  minWidth: 44,
                  minHeight: 44,
                  border: '1px solid rgba(245,245,240,0.35)',
                  borderRadius: '6px',
                  px: 2,
                  '&:hover': {
                    bgcolor: 'rgba(245,245,240,0.12)',
                    borderColor: 'rgba(245,245,240,0.7)',
                  },
                }}
              >
                Play now
              </Button>
            )}
            {project.repoUrl && (
              <Button
                size="small"
                color="inherit"
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                startIcon={<GitHubIcon />}
                sx={{
                  minWidth: 44,
                  minHeight: 44,
                  border: '1px solid rgba(245,245,240,0.35)',
                  borderRadius: '6px',
                  px: 2,
                  '&:hover': {
                    bgcolor: 'rgba(245,245,240,0.12)',
                    borderColor: 'rgba(245,245,240,0.7)',
                  },
                }}
              >
                Source
              </Button>
            )}
            {project.demoUrl && (
              <Button
                size="small"
                color="inherit"
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                startIcon={<OpenInNewIcon />}
                sx={{
                  minWidth: 44,
                  minHeight: 44,
                  border: '1px solid rgba(245,245,240,0.35)',
                  borderRadius: '6px',
                  px: 2,
                  '&:hover': {
                    bgcolor: 'rgba(245,245,240,0.12)',
                    borderColor: 'rgba(245,245,240,0.7)',
                  },
                }}
              >
                Demo
              </Button>
            )}
          </CardActions>
        )}
      </Collapse>
      {project.embeddable && project.demoUrl && (
        <GameModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          url={project.demoUrl}
          title={project.title}
        />
      )}
    </Card>
  );
}

import { Box, Typography, Button, Container } from '@mui/material';
import InteractiveElement from './InteractiveElement';

interface HeroSectionProps {
  ownerName: string;
  tagline: string;
}

export default function HeroSection({ ownerName, tagline }: HeroSectionProps) {
  function scrollToPortfolio() {
    const el = document.getElementById('portfolio');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <Box
      component="article"
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        background: 'linear-gradient(135deg, #1C1C1E 0%, #2C2C2E 100%)',
      }}
    >
      <Container maxWidth="md">
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: 'center',
            gap: 4,
          }}
        >
          <Box sx={{ flex: 1 }}>
            <Typography variant="h1" sx={{ fontSize: { xs: '2rem', md: '3.5rem' }, mb: 2 }}>
              {ownerName}
            </Typography>
            <Typography variant="body1" sx={{ fontSize: '1.25rem', color: 'text.secondary', mb: 4 }}>
              {tagline}
            </Typography>
            <Button
              variant="contained"
              color="secondary"
              size="large"
              onClick={scrollToPortfolio}
              sx={{ minWidth: 44, minHeight: 44 }}
            >
              View My Work
            </Button>
          </Box>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <InteractiveElement theme="keyboard" label="Press a key" />
            <InteractiveElement theme="cooking" label="Start cooking" />
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

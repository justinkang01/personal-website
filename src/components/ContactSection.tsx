import type { ReactNode } from 'react';
import { Box, Container, Typography, Button } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';

interface ContactSectionProps {
  email: string;
  profiles: { label: string; url: string; icon: ReactNode }[];
}

export default function ContactSection({ email, profiles }: ContactSectionProps) {
  return (
    <Box component="article" sx={{ py: 8, bgcolor: 'background.default' }}>
      <Container maxWidth="sm">
        <Typography variant="h2" sx={{ mb: 2, fontSize: { xs: '1.75rem', md: '2.5rem' } }}>
          Contact
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          Get in touch or find me online.
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'flex-start' }}>
          <Button
            component="a"
            href={`mailto:${email}`}
            target="_blank"
            rel="noopener noreferrer"
            variant="outlined"
            color="secondary"
            startIcon={<EmailIcon />}
            sx={{ minHeight: 44 }}
          >
            {email}
          </Button>

          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            {profiles.map((p) => (
              <Button
                key={p.label}
                component="a"
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                variant="outlined"
                color="inherit"
                startIcon={p.icon}
                sx={{
                  minHeight: 44,
                  borderColor: 'rgba(245,245,240,0.35)',
                  '&:hover': { borderColor: 'rgba(245,245,240,0.7)' },
                }}
              >
                {p.label}
              </Button>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

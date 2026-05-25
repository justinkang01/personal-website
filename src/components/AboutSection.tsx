import { Box, Container, Typography, Avatar, Chip, Stack } from '@mui/material';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import SportsVolleyballIcon from '@mui/icons-material/SportsVolleyball';
import KeyboardIcon from '@mui/icons-material/Keyboard';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import type { SvgIconComponent } from '@mui/icons-material';

interface AboutSectionProps {
  bio: string;
  interests: string[];
  avatarSrc: string;
}

const INTEREST_ICONS: Record<string, SvgIconComponent> = {
  Guitar: MusicNoteIcon,
  Volleyball: SportsVolleyballIcon,
  'Mechanical Keyboards': KeyboardIcon,
  Cooking: RestaurantIcon,
};

export default function AboutSection({ bio, interests, avatarSrc }: AboutSectionProps) {
  return (
    <Box component="article" sx={{ py: 8, bgcolor: 'background.paper' }}>
      <Container maxWidth="md">
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: { xs: 'center', md: 'flex-start' },
            gap: 4,
          }}
        >
          <Avatar
            src={avatarSrc}
            alt="Profile photo"
            sx={{ width: 160, height: 160, flexShrink: 0 }}
          />
          <Box>
            <Typography variant="h2" sx={{ mb: 2, fontSize: { xs: '1.75rem', md: '2.5rem' } }}>
              About Me
            </Typography>
            <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.8 }}>
              {bio}
            </Typography>
            <Typography variant="h6" sx={{ mb: 1.5, fontFamily: 'monospace' }}>
              Interests
            </Typography>
            <Stack sx={{ flexWrap: "wrap", flexDirection: "row", gap: 1 }}>
              {interests.map((interest) => {
                const Icon = INTEREST_ICONS[interest];
                return (
                  <Chip
                    key={interest}
                    label={interest}
                    icon={Icon ? <Icon /> : undefined}
                    variant="outlined"
                    color="secondary"
                  />
                );
              })}
            </Stack>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

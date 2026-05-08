import { useState } from 'react';
import {
  AppBar, Toolbar, Typography, Button, IconButton,
  Drawer, List, ListItemButton, ListItemText, Box, useMediaQuery, useTheme,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import type { NavSection } from '../types';
import { useAudio } from '../context/AudioContext';

interface NavbarProps {
  sections: NavSection[];
}

export default function Navbar({ sections }: NavbarProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { muted, toggleMute } = useAudio();

  function handleNavClick(id: string) {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
    window.location.hash = id;
    setDrawerOpen(false);
  }

  return (
    <AppBar position="sticky" component="nav">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1, fontFamily: 'monospace' }}>
          {'{ jk }'}
        </Typography>

        {isMobile ? (
          <>
            <IconButton
              aria-label={muted ? 'Unmute audio' : 'Mute audio'}
              onClick={toggleMute}
              color="inherit"
              sx={{ minWidth: 44, minHeight: 44 }}
            >
              {muted ? <VolumeOffIcon /> : <VolumeUpIcon />}
            </IconButton>
            <IconButton
              aria-label="Open navigation menu"
              onClick={() => setDrawerOpen(true)}
              color="inherit"
              sx={{ minWidth: 44, minHeight: 44 }}
            >
              <MenuIcon />
            </IconButton>
            <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
              <List sx={{ width: 200 }}>
                {sections.map((s) => (
                  <ListItemButton key={s.id} onClick={() => handleNavClick(s.id)}>
                    <ListItemText primary={s.label} />
                  </ListItemButton>
                ))}
              </List>
            </Drawer>
          </>
        ) : (
          <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
            {sections.map((s) => (
              <Button
                key={s.id}
                color="inherit"
                onClick={() => handleNavClick(s.id)}
                sx={{ minWidth: 44, minHeight: 44 }}
              >
                {s.label}
              </Button>
            ))}
            <IconButton
              aria-label={muted ? 'Unmute audio' : 'Mute audio'}
              onClick={toggleMute}
              color="inherit"
              sx={{ minWidth: 44, minHeight: 44 }}
            >
              {muted ? <VolumeOffIcon /> : <VolumeUpIcon />}
            </IconButton>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
}

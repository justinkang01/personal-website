import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#2C2C2E',    // deep charcoal (keyboard)
      light: '#48484A',
      dark: '#1C1C1E',
      contrastText: '#F5F5F0', // off-white
    },
    secondary: {
      main: '#D4813A',    // warm amber (cooking)
      light: '#E8A96A',
      dark: '#A85C1E',
      contrastText: '#1C1C1E',
    },
    background: {
      default: '#1C1C1E',
      paper: '#2C2C2E',
    },
    text: {
      primary: '#F5F5F0',
      secondary: '#AEAEB2',
    },
  },
  typography: {
    fontFamily: '"JetBrains Mono", "Fira Code", "Courier New", monospace',
    h1: { fontFamily: '"JetBrains Mono", monospace', fontWeight: 700 },
    h2: { fontFamily: '"JetBrains Mono", monospace', fontWeight: 700 },
    h3: { fontFamily: '"JetBrains Mono", monospace', fontWeight: 600 },
    body1: { fontFamily: '"Nunito", "Rounded Mplus 1c", sans-serif', fontSize: '1rem' },
    body2: { fontFamily: '"Nunito", "Rounded Mplus 1c", sans-serif', fontSize: '0.875rem' },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '6px',
          textTransform: 'none',
          boxShadow: '0 4px 0 rgba(0,0,0,0.4)',
          '&:active': {
            boxShadow: '0 1px 0 rgba(0,0,0,0.4)',
            transform: 'translateY(3px)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
          transition: 'transform 0.15s ease, box-shadow 0.15s ease',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: '4px',
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: '0.75rem',
        },
      },
    },
  },
});

export default theme;

import { createTheme } from '@mui/material/styles';
import { lightTheme, darkTheme } from './theme'; // Correction ici

export const muiLightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: lightTheme.primary,
    },
    secondary: {
      main: lightTheme.secondary,
    },
    background: {
      default: lightTheme.body,
      paper: lightTheme.cardBackground,
    },
    text: {
      primary: lightTheme.text,
      secondary: lightTheme.secondary,
    },
    error: {
      main: lightTheme.expenseColor,
    },
    success: {
      main: lightTheme.incomeColor,
    },
  },
  typography: {
    fontFamily: '"Segoe UI", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 600,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 500,
    },
    h3: {
      fontSize: '1.5rem',
      fontWeight: 500,
    },
    h4: {
      fontSize: '1.25rem',
      fontWeight: 500,
    },
    h5: {
      fontSize: '1rem',
      fontWeight: 500,
    },
    h6: {
      fontSize: '0.875rem',
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          borderRadius: '12px',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          textTransform: 'none',
        },
      },
    },
  },
});

export const muiDarkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: darkTheme.primary,
    },
    secondary: {
      main: darkTheme.secondary,
    },
    background: {
      default: darkTheme.body,
      paper: darkTheme.cardBackground,
    },
    text: {
      primary: darkTheme.text,
      secondary: darkTheme.secondary,
    },
    error: {
      main: darkTheme.expenseColor,
    },
    success: {
      main: darkTheme.incomeColor,
    },
  },
  typography: {
    fontFamily: '"Segoe UI", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 600,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 500,
    },
    h3: {
      fontSize: '1.5rem',
      fontWeight: 500,
    },
    h4: {
      fontSize: '1.25rem',
      fontWeight: 500,
    },
    h5: {
      fontSize: '1rem',
      fontWeight: 500,
    },
    h6: {
      fontSize: '0.875rem',
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)',
          borderRadius: '12px',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          textTransform: 'none',
        },
      },
    },
  },
});
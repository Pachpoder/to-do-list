import { alpha, createTheme, lighten } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    primary: {
      main: '#6D28D9',
      light: '#8B5CF6',
      dark: '#4C1D95',
    },
    secondary: {
      main: '#C084FC',
      light: '#E3C3FF',
      dark: '#9C6AE6',
    },
    info: {
      main: '#7C3AED',
    },
    background: {
      default: '#F7F5FF',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#1B1333',
      secondary: '#4B3B62',
    },
  },
  shape: {
    borderRadius: 18,
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    fontWeightMedium: 600,
    h4: {
      fontWeight: 800,
      letterSpacing: '-0.01em',
    },
    h5: {
      fontWeight: 700,
      letterSpacing: '-0.01em',
    },
    button: {
      fontWeight: 700,
      letterSpacing: '0.01em',
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: (themeParam) => ({
        body: {
          backgroundColor: themeParam.palette.background.default,
        },
      }),
    },
    MuiAppBar: {
      styleOverrides: {
        root: ({ theme: t }) => ({
          backgroundColor: alpha(t.palette.background.paper, 0.82),
          border: `1px solid ${alpha(t.palette.primary.main, 0.08)}`,
          boxShadow: `0 12px 40px -20px ${alpha(t.palette.primary.main, 0.4)}`,
          backdropFilter: 'blur(12px)',
        }),
      },
    },
    MuiButton: {
      defaultProps: {
        variant: 'contained',
      },
      styleOverrides: {
        root: ({ theme: t }) => ({
          borderRadius: t.shape.borderRadius,
          textTransform: 'none',
          padding: '10px 16px',
          boxShadow: 'none',
          '&:hover': {
            boxShadow: `0 10px 30px -18px ${alpha(t.palette.primary.main, 0.6)}`,
          },
        }),
      },
    },
    MuiCard: {
      styleOverrides: {
        root: ({ theme: t }) => ({
          borderRadius: t.shape.borderRadius * 1.1,
          border: `1px solid ${alpha(t.palette.primary.main, 0.08)}`,
          boxShadow: `0 18px 50px -30px ${alpha(t.palette.primary.main, 0.35)}`,
          background: `linear-gradient(135deg, ${alpha(
            t.palette.background.paper,
            0.98,
          )}, ${alpha(t.palette.primary.light, 0.04)})`,
        }),
      },
    },
    MuiChip: {
      styleOverrides: {
        root: ({ theme: t }) => ({
          borderRadius: t.shape.borderRadius,
          fontWeight: 600,
        }),
      },
    },
    MuiTabs: {
      styleOverrides: {
        root: ({ theme: t }) => ({
          borderRadius: t.shape.borderRadius,
          padding: t.spacing(0.5),
          backgroundColor: alpha(t.palette.primary.main, 0.04),
        }),
        indicator: ({ theme: t }) => ({
          height: 4,
          borderRadius: 999,
          background: `linear-gradient(90deg, ${t.palette.primary.main}, ${lighten(
            t.palette.primary.main,
            0.18,
          )})`,
          boxShadow: `0 8px 20px -12px ${alpha(t.palette.primary.main, 0.6)}`,
        }),
      },
    },
    MuiTab: {
      styleOverrides: {
        root: ({ theme: t }) => ({
          textTransform: 'none',
          fontWeight: 700,
          borderRadius: t.shape.borderRadius,
          minHeight: 44,
          '&.Mui-selected': {
            color: t.palette.primary.main,
          },
        }),
      },
    },
    MuiPaper: {
      defaultProps: {
        elevation: 1,
      },
      styleOverrides: {
        root: ({ theme: t }) => ({
          borderRadius: t.shape.borderRadius,
          border: `1px solid ${alpha(t.palette.primary.main, 0.08)}`,
        }),
      },
    },
  },
})

export default theme

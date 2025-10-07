import { createTheme } from '@mui/material/styles'
import { esES as coreEsES } from '@mui/material/locale'

// Material Design light theme aligned with university branding placeholders.
// Update primary/secondary colors later with the exact UAO palette.
export const appTheme = createTheme(
  {
  palette: {
    mode: 'light',
    primary: { 
      main: '#e30613', // Rojo oficial UAO (como se ve en las imágenes)
      light: '#ff4444',
      dark: '#b71c1c',
      contrastText: '#ffffff'
    },
    secondary: { 
      main: '#ffffff', // Blanco complementario UAO
      light: '#f5f5f5',
      dark: '#e0e0e0',
      contrastText: '#e30613'
    },
    background: { 
      default: '#fafafa',
      paper: '#ffffff'
    },
    text: {
      primary: '#333333',
      secondary: '#666666'
    },
  },
  typography: {
    fontFamily:
      'Rubik, Roboto, system-ui, -apple-system, Segoe UI, Arial, sans-serif',
    h1: { fontFamily: 'Rubik' },
    h2: { fontFamily: 'Rubik' },
    h3: { fontFamily: 'Rubik' },
  },
  shape: { borderRadius: 10 },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
  },
  coreEsES,
)

export default appTheme


import { red } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface BreakpointOverrides {
    xs: true; // removes the `xs` breakpoint
    sm: true;
    md: true;
    lg: true;
    xl: true;
    desktopfullhd: true;
    desktop2k: true;
    desktop4k: true;
  }
}

// A custom theme for this app
const theme = createTheme({
  palette: {
    primary: {
      main: '#2D3142',
      light: '#BFC0C0',
      dark: '#242734',
      contrastText: '#EF8354',
    },
    secondary: {
      main: '#EF8354',
      light: '#f29b76',
      dark: '#e95818',
      contrastText: '#2D3142',
    },
    error: {
      main: red.A400,
      // main: '#DB5461',
    },
    action: {
      // disabledBackground: '#BFC0C0',
      // disabled: 'set color of text here',
      // disabledOpacity: 0.1,
    },
  },
  spacing: 4,
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
      desktopfullhd: 1920,
      desktop2k: 2560,
      desktop4k: 3840,
    },
  },
});

export default theme;

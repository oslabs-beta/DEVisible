import { red } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

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
  },
  spacing: 4,
});

export default theme;

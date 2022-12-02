import { createTheme } from '@mui/material/styles';

export const themes = createTheme({
  typography: {
    fontFamily: 'Roboto',
    button: {
      textTransform: 'none',
    },
  },
  palette: {
    warning: {
      main: '#E8E8FD',
    },
    primary: {
      main: '#4EA381',
    },
    secondary: {
      main: '#FFFFFF',
    },
    error: {
      main: '#FF0000',
    },
    info: {
      main: '#373867',
    },
  },
});

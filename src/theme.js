import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#232323',
    },
    secondary: {
      main: '#ff6600', 
    },
    footer: {
      main: '#C2C2C2', 
    },
    abuabu:{
      main: '#404040',
    }
    // mode: 'dark',
  },
  typography: {
    fontH1:{
      fontSize : 34,
      fontFamily: 'Arial',
      fontStyle : 'bold',
    },
    fontH2:{
      fontSize : 24,
      fontFamily: 'Arial',
      fontStyle : 'bold',
    },
    teks:{
      fontSize : 14,
      fontFamily: 'Arial',
    },
  },
  
});

export default theme;

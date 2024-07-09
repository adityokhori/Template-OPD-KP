import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#ff6600', 
    },
    footer: {
      main: '#404040', 
    },
  },
  typography: {
    fontH1:{
      fontSize : 50,
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

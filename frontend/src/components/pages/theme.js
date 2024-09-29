import { colors, createTheme, ThemeProvider } from "@mui/material";

const theme = createTheme({
    breakpoints: {
        values: {
          xs: 0,
          sm: 600,
          md: 960,
          lg: 1280,
          xl: 1920,
        },
    },
    typography: {
        fontFamily: 'Roboto, sans-serif',
        h1: {
          fontSize: '2rem',
        },
        h2: {
          fontSize: '1.5rem',
        },
      },
      spacing: 8,
      components: {
        MuiCssBaseline: {
          styleOverrides: {
            body:{
              backgroundColor: '#f0f0f0'
            }
          }
        },
        MuiLink:{
          styleOverrides:{
            root:{
              textDecoration:'none'
            }
          }
        }
      }

});

export default theme;
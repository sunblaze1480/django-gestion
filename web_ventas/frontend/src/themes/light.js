import { createTheme } from "@mui/material";

export const light = createTheme({
  palette: {
    mode: 'light',
    container: {
      main: "#FFFFFF",
      text: "#212121"
    },
    tableHeader: {
      main: "#F5F5F5"
    },
    primary: {
      main: "#1976D2",       // blue
      light: "#63A4FF",
      dark: "#004BA0",
      contrastText: "#fff"
    },
    secondary: {
      main: "#FF9800",       // orange
      light: "#FFB74D",
      dark: "#F57C00",
      contrastText: "#000"
    }
  },
  components: {
    MuiToolbar: {
      styleOverrides: {
        root: {
          minHeight: 50,
          "@media (min-width:0px)": { minHeight: 40 },
          "@media (min-width:600px)": { minHeight: 50 }
        }
      }
    }
  }
});

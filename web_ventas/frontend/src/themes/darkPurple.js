import { createTheme } from "@mui/material";

export const darkPurple = createTheme({
  palette: {
    mode: 'dark',
    container: {
      main: "#121212",
      text: "#E0E0E0"
    },
    tableHeader: {
      main: "#1E1E2F"
    },
    primary: {
      main: "#9C27B0",      // purple
      light: "#BA68C8",
      dark: "#7B1FA2",
      contrastText: "#fff"
    },
    secondary: {
      main: "#26A69A",      // teal
      light: "#4DB6AC",
      dark: "#00897B",
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

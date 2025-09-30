import { createTheme } from "@mui/material";

export const vibrant = createTheme({
  palette: {
    mode: 'light',
    container: {
      main: "#FAFAFA",
      text: "#2C2C2C"
    },
    tableHeader: {
      main: "#EEEEEE"
    },
    primary: {
      main: "#00BCD4",       // cyan
      light: "#62EFFF",
      dark: "#008BA3",
      contrastText: "#fff"
    },
    secondary: {
      main: "#E91E63",       // pink
      light: "#F06292",
      dark: "#C2185B",
      contrastText: "#fff"
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

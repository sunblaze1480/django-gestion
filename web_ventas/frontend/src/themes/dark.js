import { createTheme } from "@mui/material/styles";


export const dark = createTheme({
    palette: {
        mode: 'dark',
        container: {
            main: "#1F1F1F",
            text: "#E0E0E0"
        },
        tableHeader: {
            main: "#2A2A2A"
        }, 
        primary: {
            main: "#3ED1AC",      
            light: "#6FE3C3",      
            dark: "#2FA986",       
            contrastText: "#000" 
        },
        secondary: {
            main: '#E0C2FF',
            light: '#F5EBFF',
            contrastText: '#47008F',
        },        
    },    
    components: {
            MuiToolbar: {
            styleOverrides: {
                root: {
                minHeight: 50,
                "@media (min-width:0px)": {
                    minHeight: 40,
                },
                "@media (min-width:600px)": {
                    minHeight: 50,
                },
                },
            },
            },
        },
    });
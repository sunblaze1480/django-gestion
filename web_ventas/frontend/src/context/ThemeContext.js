import React, { createContext, useState, useContext, useMemo} from "react"
import { ThemeProvider } from "@mui/material/styles"
import { themes } from "../themes"

const ThemeContext = createContext()

export const useThemeContext = ()=> useContext(ThemeContext)

export const ThemeContextProvider = ({children}) => {
    const availableThemes = Object.keys(themes)
    
    
    const [themeName, setThemeName] = useState("dark")
    const theme = themes[themeName];
    
    console.log("Theme name:", themeName, "Theme object:", theme);


    return <ThemeContext.Provider value={{themeName, setThemeName, availableThemes}}>
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
}
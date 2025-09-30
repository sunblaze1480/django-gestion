import {react, useState, useTheme} from "react"
import {darkPurpleTheme} from "../themes/darkPurpleTheme"
import {darkTheme} from "../themes/darkTheme"
import {lightTheme} from "../themes/lightTheme"
import {vibrantTheme} from "../themes/vibrantTheme"


export const usePickTheme = () => {
    //Default is dark theme
    const [theme, setTheme] = useState(lightTheme)
    
    return theme;
}

 
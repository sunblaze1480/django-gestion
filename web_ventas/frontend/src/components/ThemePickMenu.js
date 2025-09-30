import React, {useState, useContext} from "react"
import { useThemeContext } from "../context/ThemeContext"
import { IconButton, Menu, MenuItem } from "@mui/material";
import PaletteIcon from '@mui/icons-material/Palette';

export const ThemePickMenu = () => {
    const {themeName, setThemeName, availableThemes} = useThemeContext();
    const [anchorEl, setAnchorEl] = useState(null);

    const handleOpenMenu = (e) => {
        setAnchorEl(e.currentTarget)
    }

    const handleThemeClicked = (selectedName) => {
        setThemeName(selectedName)
        setAnchorEl(null)
    }
    
    return (
        <>
            <IconButton color="inherit" size="small" onClick={handleOpenMenu}> 
                <PaletteIcon />
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={()=>setAnchorEl(null)}


            >
                {availableThemes.map((name)=>(
                    <MenuItem 
                        key={name}
                        selected={themeName === name}
                        onClick={()=>handleThemeClicked(name)}
                        value={name}
                    >
                     {name}   
                    </MenuItem>
                ))}
            </Menu>
        </>
    )
}
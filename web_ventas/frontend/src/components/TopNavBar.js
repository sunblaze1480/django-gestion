import React from "react";
import { Typography, AppBar, Box, Container, IconButton, Toolbar } from "@mui/material"
import MenuIcon from '@mui/icons-material/Menu';
import { ThemePickMenu } from "./ThemePickMenu";




export default function TopNavBar({open, toggleDrawer}) {
    return(
        <Box sx={{ flexGrow: 1 }}>            
            <AppBar position="static" sx={{ backgroundColor: "#1B1B1B", color: "#E0E0E0" }}>
                <Toolbar>
                    <IconButton onClick={toggleDrawer} edge="start" color="inherit">
                        <MenuIcon></MenuIcon>
                    </IconButton>                       
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Sistema de Gestion
                    </Typography>
                    <Box sx={{ml:'auto'}}
                    >
                        <ThemePickMenu></ThemePickMenu>
                    </Box>
                </Toolbar>
            </AppBar>
        </Box>
    )            
}
import React from "react";
import FlareIcon from '@mui/icons-material/Flare';
import { Typography, AppBar, Box, Container, IconButton, Toolbar } from "@mui/material"
import MenuIcon from '@mui/icons-material/Menu';




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
                </Toolbar>
            </AppBar>
        </Box>
    )            
}
import React from "react";
import FlareIcon from '@mui/icons-material/Flare';
import { appBarContainerStyles, appBarStyles } from '../styles/generalStyles'
import { Typography, AppBar, Box, Container } from "@mui/material"


export default function TopNavBar() {
    return(
        <Box sx={{ display: 'flex' }}>            
            <AppBar sx = {appBarStyles}>                                  
                    <Typography variant='h5' noWrap component='h6' href='#'>
                        Sistema de Gestion
                    </Typography>
            </AppBar>
        </Box>
    )            
}
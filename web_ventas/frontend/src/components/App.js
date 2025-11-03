import React, {Component, useState } from "react";
import {render} from "react-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ClippedDrawer from "./Menus/ClippedDrawer";
import TopNavBar from "./TopNavBar"
import { AlertSnackbar } from "./AlertSnackbar";
import { AlertsContextProvider } from "../context/AlertsContext";
import { ThemeContextProvider } from "../context/ThemeContext";
import { CssBaseline } from '@mui/material';
import { AppBreadcrumbs } from "./AppBreadcrumbs";
import { AppRouter } from "./AppRouter";

export default function App () {    

    const [open, setOpen] = useState(false)

    const toggleDrawer = () => {
        setOpen((prevOpen)=> !prevOpen )
    }
        
        return(            
            <ThemeContextProvider>
                <CssBaseline />
                <div id='app'>
                    <AlertsContextProvider>
                        <TopNavBar open={open} toggleDrawer={toggleDrawer}></TopNavBar>
                        <Router>                                               
                            <ClippedDrawer open={open} setOpen={setOpen}></ClippedDrawer> 
                            <div class='content'>
                                <AppBreadcrumbs/>
                                <div style={{ padding: '0px 16px' }}>
                                    <AppRouter/>
                                </div>                        
                            </div>
                        </Router>
                        <AlertSnackbar/>                                            
                    </AlertsContextProvider>
                </div>
            </ThemeContextProvider>
        ); 
    
}
const appDiv = document.getElementById("main");
render(<App />, appDiv);  
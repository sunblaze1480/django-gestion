import React from "react";
import { useAlertsContext } from "../context/AlertsContext";
import { Snackbar, SnackbarContent } from "@mui/material";

export const AlertSnackbar =  ( ) => {
    const {openAlert, closeAlert, alert} = useAlertsContext()
    
    return (           
        <Snackbar
            open={alert.open}
            autoHideDuration={6000}
            onClose={closeAlert}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        >
            <SnackbarContent severity={alert.severity} message={alert.message} sx={alert.style} />
        </Snackbar> 
    )
}


 

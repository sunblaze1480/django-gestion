import React from "react";
import { Button, IconButton } from "@mui/material";
import AddCircleIcon from '@mui/icons-material/AddCircle';


export const InvoicesPage = () => {

    return (
        <div class='center'>  
        <h3>Esta aplicacion aun no ha sido implementada</h3>
                        <hr></hr>
        <Button href='/invoices/create'
            variant='outlined'
            startIcon={<AddCircleIcon />}             
        >
            Generar factura
        </Button>
        </div>
    )
}
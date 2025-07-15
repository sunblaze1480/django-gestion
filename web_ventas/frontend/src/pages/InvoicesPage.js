import React from "react";
import { Button, IconButton, Typography } from "@mui/material";
import AddCircleIcon from '@mui/icons-material/AddCircle';


export const InvoicesPage = () => {

    return (
        <div class='center'>  
        <Typography variant="h4" component="h1" className='header-title'>
          Facturas
        </Typography>
        <hr></hr>
        <Button href='/invoices/create'
            variant='contained'
            startIcon={<AddCircleIcon />}             
        >
            Generar factura
        </Button>
        </div>
    )
}
import React from 'react'
import {Button, IconButton } from '@mui/material'
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Stack from '@mui/material/Stack';

export const SalesHeaderPageMenu = () => {
    
    return(
        <div>
            <Stack spacing={2} direction="row">  
                <Button href='/sales/create'
                    variant="outlined"
                    startIcon={<AddCircleIcon />} 
                >
                Agregar                           
            </Button>       
            </Stack>            
        </div>
    )
}
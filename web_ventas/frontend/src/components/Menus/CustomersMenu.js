import React, {useState, useContext} from 'react'
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, Snackbar, SnackbarContent } from '@mui/material'
import {useProductsPageMenu} from '../../hooks/useProductsPageMenu';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Stack from '@mui/material/Stack';
import { UseEntityConfigurationDefault } from '../../hooks/useEntityConfiguration';

export function CustomersMenu({crudModal}){
    
    const defaultModel = UseEntityConfigurationDefault('customers');
    const handleAddClick = (modal) => modal.openModal(defaultModel, 'A');
    

    return(
        <div>
            <Stack spacing={2} direction="row">
             <Button variant="outlined"
                startIcon={<AddCircleIcon />} 
                onClick={() => handleAddClick(crudModal)}>
                Agregar                       
            </Button>            
            </Stack>            
        </div>
    )
}
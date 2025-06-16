import React, {useState, useContext} from 'react'
import { Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material'
import {useProductsPageMenu} from '../../hooks/useProductsPageMenu';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Stack from '@mui/material/Stack';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

export function ProductsMenu({crudModal}){

    const {
        handleAddClick, openDialog, setOpenDialog, handleFileChange, handleFileUpload
    } = useProductsPageMenu();


    return(
        <div>
            <Stack spacing={2} direction="row">
             <Button variant="outlined"
                startIcon={<AddCircleIcon />} 
                onClick={() => handleAddClick(crudModal)}>
                Agregar                           
            </Button>
            <Button variant="outlined" color='secondary' startIcon={<FileUploadIcon/>} onClick={()=>setOpenDialog(true)}>
                Importar CSV
            </Button>
            <Dialog open={openDialog} onClose={()=>setOpenDialog(false)}>
                <DialogTitle>Seleccionar archivo CSV</DialogTitle>
                <DialogContent>
                    <input type="file" accept=".csv" onChange={handleFileChange}></input>
                </DialogContent>
                <DialogActions>
                    <Button variant="outlined" startIcon={<CheckCircleIcon/>} color='success' onClick={handleFileUpload}>Subir</Button>
                    <Button variant="outlined" color='error' startIcon={<CancelIcon/>} onClick={()=>setOpenDialog(false)}>Cancelar</Button>
                </DialogActions>
            </Dialog>
            </Stack>
        </div>

    )
}
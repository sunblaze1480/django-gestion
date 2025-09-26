import React, {useState, useContext} from 'react'
import { Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material'
import {useProductsPageMenu} from '../../hooks/useProductsPageMenu';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { BaseMenu } from './BaseMenu';

export function ProductsMenu({crudModal}){

    const {
        handleAddClick, openDialog, setOpenDialog, handleFileChange, handleFileUpload
    } = useProductsPageMenu();


    return(
        <div>
            <BaseMenu
                items={[
                    { label: 'Agregar', onClick:() => handleAddClick(crudModal) },
                    {label: 'Importar CSV', onClick:()=>setOpenDialog(true)}
                ]}
                >
            </BaseMenu>
            <Dialog open={openDialog} onClose={()=>setOpenDialog(false)}>
                <DialogTitle>Seleccionar archivo CSV</DialogTitle>
                <DialogContent>
                    <input type="file" accept=".csv" onChange={handleFileChange}></input>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" startIcon={<CheckCircleIcon/>} color='success' onClick={handleFileUpload}>Subir</Button>
                    <Button variant="contained" color='error' startIcon={<CancelIcon/>} onClick={()=>setOpenDialog(false)}>Cancelar</Button>
                </DialogActions>
            </Dialog>
        </div>

    )
}
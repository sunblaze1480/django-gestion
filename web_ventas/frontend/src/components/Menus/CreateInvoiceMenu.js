import React, {useState, useContext} from 'react'
import { Button } from '@mui/material'
import {useProductsPageMenu} from '../../hooks/useProductsPageMenu';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import PreviewIcon from '@mui/icons-material/Preview';

import Stack from '@mui/material/Stack';


export function CreateInvoiceMenu({invoice, handleGeneracionAutomaticaClicked}){

    const {
        handleAddClick, openDialog, setOpenDialog, handleFileChange, handleFileUpload
    } = useProductsPageMenu();

    const logInvoice = ()=>{
        console.log("----------------")
        console.log(JSON.stringify(invoice))
        console.log("+++++++++++++++++")
        console.log(invoice)
    }

    return(
        <div>
            <Stack spacing={2} direction="row">
                <Button variant="contained" color="warning" onClick={handleGeneracionAutomaticaClicked} startIcon={<AutoAwesomeIcon/>}>Generacion Automatica</Button>
                <Button variant="standard" color="error" onClick={logInvoice} startIcon={<PreviewIcon/>}>Console.log(invoice)</Button>
            </Stack>
        </div>

    )
}            

            
import React, {useState} from "react"
import { TableCell, IconButton, Button } from "@mui/material";
import VisibilityIcon from '@mui/icons-material/VisibilityOutlined';
import {Link} from "react-router-dom"

export const InvoiceRowMenu = ({row}) => {
        
    console.log(row)

    return (       
        <TableCell class = 'table-cell'>
            <IconButton component={Link} to={`/invoices/${row.id}`} title='Ver Detalle' size="small" >
                <VisibilityIcon color='warning' fontSize="inherit" ></VisibilityIcon>
            </IconButton>
        </TableCell>
    )
}
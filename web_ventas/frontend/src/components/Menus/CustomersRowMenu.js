import React from "react"
import { TableCell, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/EditOutlined";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import { useCrudActions } from "../../hooks/useCrudActions"

export const CustomersRowMenu = ({row, crudModal, confirmDialog}) => {
    
    const crudActions = useCrudActions(crudModal, confirmDialog,  "customers");    
        
    return (       
        <TableCell class='table-cell'>
            <IconButton title='Editar' size="small" onClick={() => crudActions.handleEditClick(row)}>
                <EditIcon  fontSize='inherit' color="secondary"/>
            </IconButton>
            <IconButton title='Borrar' size="small" onClick={() => crudActions.handleDeleteClick(row)}>
                <DeleteIcon fontSize='inherit' color="error"/>
            </IconButton>
        </TableCell>
    )
}

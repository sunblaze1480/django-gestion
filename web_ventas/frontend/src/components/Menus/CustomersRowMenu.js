import React from "react"
import { TableCell, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/EditOutlined";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import { useCrudActions } from "../../hooks/useCrudActions" 
import {BaseMenu} from "./BaseMenu"

export const CustomersRowMenu = ({row, crudModal, confirmDialog}) => {
    
    const crudActions = useCrudActions(crudModal, confirmDialog,  "customers");    
        
    return (       
        <TableCell class='table-cell'>
            <BaseMenu
                items={[
                    {label: "Editar", onClick:()=>crudActions.handleEditClick(row)},
                    {label:"Borrar", onClick:()=>crudActions.handleDeleteClick(row)}
                ]}
            >
            </BaseMenu>
        </TableCell>
    )
}

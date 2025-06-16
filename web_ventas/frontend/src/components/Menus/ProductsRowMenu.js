import React from "react"
import { TableCell, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/EditOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { useCrudActions } from "../../hooks/useCrudActions"
import { useProductsRowMenu } from "../../hooks/useProductsRowMenu";

export const ProductsRowMenu = ({row, crudModal, pricingModal, confirmDialog}) => {
    
    const crudActions = useCrudActions(crudModal, confirmDialog,  "products");
    const {handlePricingClicked} = useProductsRowMenu(pricingModal);
        
    return (       
        <TableCell class='table-cell'>
            <IconButton title='Editar' size="small" onClick={() => crudActions.handleEditClick(row)}>
                <EditIcon fontSize="inherit" color="secondary"/>
            </IconButton>
            <IconButton title='Borrar' size="small" onClick={() => crudActions.handleDeleteClick(row)}>
                <DeleteOutlineIcon fontSize="inherit" color="error"/>
            </IconButton>
            <IconButton title='Ver Precios' size="small" onClick={()=> handlePricingClicked(row)}>
                <AttachMoneyIcon fontSize="inherit" color="success"></AttachMoneyIcon>
            </IconButton>
        </TableCell>
    )
}

import React from "react"
import { TableCell, IconButton } from "@mui/material";

import { useCrudActions } from "../../hooks/useCrudActions"
import { useProductsRowMenu } from "../../hooks/useProductsRowMenu";
import { BaseMenu } from "./BaseMenu";

export const ProductsRowMenu = ({row, crudModal, pricingModal, confirmDialog}) => {
    
    const crudActions = useCrudActions(crudModal, confirmDialog,  "products");
    const {handlePricingClicked} = useProductsRowMenu(pricingModal);
        
    return (       
        <TableCell class='table-cell'>
            <BaseMenu
                items={[
                    {label: "Editar", onClick:()=>crudActions.handleEditClick(row)},
                    {label: "Borrar", onClick:()=>crudActions.handleDeleteClick(row)},
                    {label: "Ver Precios Avanzados", onClick:()=>handlePricingClicked(row)}
                ]}
            >
            </BaseMenu>
        </TableCell>
    )
}

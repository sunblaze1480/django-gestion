import React, {useState} from "react"
import { TableCell, IconButton, Button } from "@mui/material";
import { BaseMenu } from "./BaseMenu";

export const InvoiceRowMenu = ({row}) => {
        
    console.log(row)

    return (       
        <TableCell class = 'table-cell'>
            <BaseMenu
                items={[
                    {label: "Ver Detalle", onClick:()=>window.location.href=`/invoices/${row.id}`},
                ]}
            >
            </BaseMenu>
        </TableCell>
    )
}
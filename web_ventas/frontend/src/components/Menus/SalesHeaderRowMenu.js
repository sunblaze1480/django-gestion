import React, {useState} from "react"
import { TableCell, IconButton } from "@mui/material";
import { useSalesHeaderRowMenu } from "../../hooks/useSalesHeaderRowMenu";
import { BaseMenu } from "./BaseMenu";

export const SalesHeaderRowMenu = ({row, detailModal, setVoucherOpen, setDetailData}) => {
        
    const actions = useSalesHeaderRowMenu(detailModal, setVoucherOpen, setDetailData)

    return (       
        <TableCell class = 'table-cell'>
            <BaseMenu
                items={[
                    {label: "Ver Comprobante", onClick:()=>actions.handleVoucherClick(row)},
                    {label:"Ver Detalle", onClick:()=>actions.handleViewDetailsClick(row)}
                ]}
            >
            </BaseMenu>
        </TableCell>
    )
}
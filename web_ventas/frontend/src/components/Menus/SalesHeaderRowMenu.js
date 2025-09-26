import React, {useState} from "react"
import { TableCell, IconButton } from "@mui/material";
import PrintIcon from '@mui/icons-material/Print';
import VisibilityIcon from '@mui/icons-material/VisibilityOutlined';
import { useSalesHeaderRowMenu } from "../../hooks/useSalesHeaderRowMenu";
import DescriptionIcon from '@mui/icons-material/DescriptionOutlined';
import { BaseMenu } from "./BaseMenu";

export const SalesHeaderRowMenu = ({row, detailModal, voucherModal, setDetailData}) => {
        
    const actions = useSalesHeaderRowMenu(detailModal, voucherModal, setDetailData)

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
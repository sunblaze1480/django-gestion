import React, {useState} from "react"
import { TableCell, IconButton } from "@mui/material";
import PrintIcon from '@mui/icons-material/Print';
import VisibilityIcon from '@mui/icons-material/VisibilityOutlined';
import { useSalesHeaderRowMenu } from "../../hooks/useSalesHeaderRowMenu";
import DescriptionIcon from '@mui/icons-material/DescriptionOutlined';

export const SalesHeaderRowMenu = ({row, detailModal, voucherModal, setDetailData}) => {
        
    const actions = useSalesHeaderRowMenu(detailModal, voucherModal, setDetailData)

    return (       
        <TableCell class = 'table-cell'>
            <IconButton title='Comprobante' size="small" onClick={()=>actions.handleVoucherClick(row)}>
                <DescriptionIcon color='secondary'  fontSize="inherit" ></DescriptionIcon>
            </IconButton>
            <IconButton title='Ver Detalle' size="small" onClick={()=>actions.handleViewDetailsClick(row)}>
                <VisibilityIcon color='warning' fontSize="inherit" ></VisibilityIcon>
            </IconButton>
        </TableCell>
    )
}
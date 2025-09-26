import React, {useState,  useMemo} from 'react'
import { Button, IconButton, Typography, Divider } from "@mui/material";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useConfirmDialog } from "../hooks/useConfirmDialog";
import { useEntityConfiguration } from "../hooks/useEntityConfiguration";
import { UseEntityConfigurationKeys } from "../hooks/useEntityConfiguration";
import { GenericTable } from '../components/GenericTable';
import { UseTableData } from "../hooks/UseTableData";
import { getInvoiceHeaders } from "../services/invoicesApi"
import { InvoiceRowMenu } from '../components/Menus/InvoiceRowMenu';
import InvoicesMenu from '../components/Menus/InvoicesMenu';
import { pageHeaderStyles } from '../styles/generalStyles';
import { useTableRowWithMenu } from '../hooks/useTableRowWithMenu';


export const InvoicesPage = () => {

    const entity = "invoiceHeader"
    const { tableData, refreshData} = UseTableData(getInvoiceHeaders);
    const confirmDialog = useConfirmDialog()
    const {columnSet, title} = useEntityConfiguration(entity);
    const keyField = useMemo(() => UseEntityConfigurationKeys(entity), [entity]); 


    const tableDataRows = useMemo(() => 
        tableData.map((item) => ({ ...item, id: item[keyField] })),
        [tableData, keyField]
    );

    
  const columns = useTableRowWithMenu({
              columnSet, 
              RowMenuComponent: InvoiceRowMenu,  
              })

    return (
        <div>

          <div style={pageHeaderStyles()}>          
              <Typography variant="h5" component="h2">
                Facturas
              </Typography>                
              <InvoicesMenu/>          
          </div>            
            <Divider sx={{ mb: 2, borderColor: 'rgba(255,255,255,0.2)' }} />
            <GenericTable          
                columnSet={columns}
                data={tableDataRows}
                containerHeight="75vh"          
            />
        </div>
    )
}
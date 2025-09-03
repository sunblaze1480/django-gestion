import React, {useState,  useMemo} from 'react'
import { Button, IconButton, Typography } from "@mui/material";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useConfirmDialog } from "../hooks/useConfirmDialog";
import { useEntityConfiguration } from "../hooks/useEntityConfiguration";
import { UseEntityConfigurationKeys } from "../hooks/useEntityConfiguration";
import { GenericTable } from '../components/GenericTable';
import { UseTableData } from "../hooks/UseTableData";
import { getInvoiceHeaders } from "../services/invoicesApi"
import { InvoiceRowMenu } from '../components/Menus/InvoiceRowMenu';

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

        const columns = [
          ...columnSet,
          {
            field: "actions",
            headerName: "Acciones",
            width: 100,
            sortable: false,
            renderCell: (row) => (
              <InvoiceRowMenu
                row={row}                        
              />
            ),
          },
        ]; 


    return (
        <div class='center'>  
            <Typography variant="h4" component="h1" className='header-title'>
            {title}
            </Typography>
            <hr></hr>
            <Button href='/invoices/create'
                variant='contained'
                startIcon={<AddCircleIcon />}             
            >
                Generar factura
            </Button>
            <br></br>
            <GenericTable          
                columnSet={columns}
                data={tableDataRows}
                containerHeight="80vh"          
            />
        </div>
    )
}
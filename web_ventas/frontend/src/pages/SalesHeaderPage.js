import React, {useState, useContext, useEffect, useMemo} from 'react'
import { Typography, Divider } from '@mui/material';
import { useEntityConfiguration, UseEntityConfigurationKeys } from '../hooks/useEntityConfiguration';
import { SalesDetailModal } from '../components/Modals/SalesDetailModal';
import { EntityDataProvider } from '../context/EntityDataContext';
import { SalesVoucherModal } from '../components/Modals/SalesVoucherModal';
import { useCrudModal } from '../hooks/useCrudModal';
import { SalesHeaderRowMenu } from '../components/Menus/SalesHeaderRowMenu';
import { getSalesDetails } from '../services/salesApi';
import { SalesHeaderPageMenu } from '../components/Menus/SalesHeaderPageMenu';
import { GenericTable } from '../components/GenericTable';
import { UseTableData } from '../hooks/UseTableData';
import { getSalesHeaders } from '../services/salesApi';
import { useTheme } from '@emotion/react';
import { pageHeaderStyles } from '../styles/generalStyles';

//TODO : Separar en custom hook vs Render
export function SalesHeaderPage() {

    const entity= "salesHeader";
    
    const { tableData, refreshData} = UseTableData(getSalesHeaders);
    const {columnSet, title} = useEntityConfiguration(entity);        
    const [isVoucherOpen, setIsVoucherOpen] = useState(false)
    const detailModal = useCrudModal();    
    const [rowDetailData, setRowDetailData] = useState({})    
    const theme = useTheme();
        

    const handleDetailDataChanged = (order_id) => {
      getSalesDetails(order_id).then((response)=>{        
        setRowDetailData(response[0]);        
        //handleDataChangeAlert('Success', 'Se proceso el pago')
      }).catch((err)=>{console.log(err);
        //handleDataChangeAlert('Error', 'Error procesando el pago')
      })
    }
    

    const columns = [
      ...columnSet,
      {
        field: "actions",
        headerName: "Acciones",
        width: 100,
        sortable: false,
        renderCell: (row) => (
          <SalesHeaderRowMenu
            row={row}
            detailModal={detailModal}
            voucherModal={setIsVoucherOpen}
            setDetailData={setRowDetailData}            
          />
        ),
      },
    ];    
  
    return (
  <div>
    {/* Page header */}
    <div
      style={pageHeaderStyles()}
    >
      <Typography variant="h5" component="h2">
        Ventas
      </Typography>
      
      <SalesHeaderPageMenu />
    </div>

    <Divider sx={{ mb: 2, borderColor: 'rgba(255,255,255,0.2)' }} />

    {/* Data table */}
    <GenericTable
      columnSet={columns}
      data={tableData}
      containerHeight="75vh"
    />

    {/* Modals */}
    {detailModal.open && (
      <EntityDataProvider data={rowDetailData}>
        <SalesDetailModal
          entityData={rowDetailData}
          open={detailModal.open}
          onClose={detailModal.closeModal}
          onDataChanges={handleDetailDataChanged}
        />
      </EntityDataProvider>
    )}

    {isVoucherOpen && (
      <EntityDataProvider data={rowDetailData}>
        <SalesVoucherModal
          entityData={rowDetailData}
          open={isVoucherOpen}
          onClose={() => setIsVoucherOpen(false)}
        />
      </EntityDataProvider>
    )}
  </div>
);
}
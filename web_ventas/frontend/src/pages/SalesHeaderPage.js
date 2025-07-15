import React, {useState, useContext, useEffect, useMemo} from 'react'
import { Typography } from '@mui/material';
import { useEntityConfiguration, UseEntityConfigurationKeys } from '../hooks/useEntityConfiguration';
import { SalesDetailModal } from '../components/Modals/SalesDetailModal';
import { EntityDataProvider } from '../context/EntityDataContext';
import { SalesVoucherModal } from '../components/Modals/SalesVoucherModal';
import { useCrudModal } from '../hooks/useCrudModal';
import { SalesHeaderRowMenu } from '../components/Menus/SalesHeaderRowMenu';
import { getSalesDetails } from '../services/salesApi';
import { SalesHeaderPageMenu } from '../components/Menus/SalesHeaderPageMenu';
import { useAlertsContext } from '../context/AlertsContext';
import { GenericTable } from '../components/GenericTable';
import { UseTableData } from '../hooks/UseTableData';
import { getSalesHeaders } from '../services/salesApi';

//TODO : Separar en custom hook vs Render
export function SalesHeaderPage() {

    const entity= "salesHeader";
    
    const { tableData, refreshData} = UseTableData(getSalesHeaders);
    const {columnSet, title} = useEntityConfiguration(entity);        
    const [isVoucherOpen, setIsVoucherOpen] = useState(false)
    const detailModal = useCrudModal();    
    const [rowDetailData, setRowDetailData] = useState({})    
        

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
  
    return(
      <div className="center">          
        <Typography variant="h4" component="h1" className='header-title'>
          Ventas
        </Typography>
        <hr></hr>
        <div className="center">
            <SalesHeaderPageMenu/>
        </div>
        <br></br>
        <div class='center'>                                     
        <GenericTable          
          columnSet={columns}
          data={tableData}
          containerHeight="80vh"          
        /> 
          {            
            detailModal.open ? (
              <EntityDataProvider data={rowDetailData}>
                <SalesDetailModal
                  entityData={rowDetailData}
                  open={detailModal.open}
                  onClose={detailModal.closeModal}
                  onDataChanges={handleDetailDataChanged}
                />
              </EntityDataProvider>
            ) : ""
          }
          {
            isVoucherOpen ? (
              <EntityDataProvider data={rowDetailData}>
                <SalesVoucherModal
                  entityData={rowDetailData}
                  open={isVoucherOpen}
                  onClose={() => setIsVoucherOpen(false)}                  
                />
              </EntityDataProvider>
            ): ""
          }
          <hr></hr>

        </div>
      </div>
    )
}
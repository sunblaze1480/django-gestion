import React, { useState, useEffect, useContext, useMemo } from "react";
import { Typography } from "@mui/material"
import { ConfirmDialog } from "../components/ConfirmDialog";
import { useCrudModal } from "../hooks/useCrudModal";
import { useConfirmDialog } from "../hooks/useConfirmDialog";
import { UseTableData } from "../hooks/UseTableData";
import { useEntityConfiguration, UseEntityConfigurationKeys } from "../hooks/useEntityConfiguration";
import {CustomersModal} from "../components/Modals/CustomersModal";
import { CustomersRowMenu } from "../components/Menus/CustomersRowMenu";
import { CustomersMenu } from "../components/Menus/CustomersMenu";
import { GenericTable } from "../components/GenericTable";
import { getCustomerData } from "../services/customersApi";



export function CustomersPage() {
      
    const entity= "customers"
    
    const { tableData, refreshData} = UseTableData(getCustomerData);
    const confirmDialog = useConfirmDialog()    
    const crudModal = useCrudModal(refreshData);  
    const {columnSet, title} = useEntityConfiguration(entity);
    const keyField = useMemo(() => UseEntityConfigurationKeys(entity), [entity]); 

    const tableDataRows = useMemo(() => 
      tableData.map((item) => ({ ...item, id: item[keyField] })),
      [tableData, keyField]
    );

    const renderRowMenu = useMemo(() => (params) => (
      <CustomersRowMenu
        row={params.row}
        crudModal={crudModal}        
        confirmDialog={confirmDialog} 
      />
    ), [crudModal,confirmDialog]);
    
    


    const columns = [
      ...columnSet,
      {
        field: "actions",
        headerName: "Acciones",
        width: 100,
        sortable: false,
        renderCell: renderRowMenu
      },
    ];  

    console.log("GenericTable props", { tableDataRows, keyField, columns });
    return (
      <div>
        <div className="center">          
        <Typography variant="h4" component="h1" className='header-title'>
          Lista de Clientes
        </Typography>
        <hr></hr>
        <div className="center">
          <CustomersMenu             
            crudModal={crudModal}
           />
        </div>
        <br></br>
        <GenericTable          
          columnSet={columns}
          data={tableDataRows}
          containerHeight="80vh"          
        /> 
        </div>
        {crudModal.open && crudModal.editingItem && (
            <CustomersModal 
                open={crudModal.open}
                onModalClose={crudModal.closeModal} 
                onDatabaseAction={crudModal.handleModalAction}
                rowData={crudModal.editingItem} 
                mode={crudModal.modeEditCreate}>            
            </CustomersModal>
        )}
        <hr></hr>

        {confirmDialog.confirmDialogState.isOpen && (
          <ConfirmDialog
            open={confirmDialog.confirmDialogState.isOpen}
            title={confirmDialog.confirmDialogState.message}
            onConfirm={confirmDialog.confirmDialogState.onConfirm}
            confirmText="Yes, DELETE"
            cancelText="No, CANCEL"
            onClose={confirmDialog.closeConfirmDialog}
            onCancel={confirmDialog.closeConfirmDialog}
          />
        )}
      </div>
    );
  }
  
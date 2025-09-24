import React, { useState, useEffect, useContext, useMemo } from "react";
import { Typography, Divider } from "@mui/material"
import { ConfirmDialog } from "../components/ConfirmDialog";
import { useCrudModal } from "../hooks/useCrudModal";
import { useConfirmDialog } from "../hooks/useConfirmDialog";
import { CustomMenuWrapper } from "../components/Wrappers/CustomMenuWrapper";
import { ProductsRowMenu } from "../components/Menus/ProductsRowMenu";
import { useEntityConfiguration, UseEntityConfigurationKeys } from "../hooks/useEntityConfiguration";
import {ProductsModal} from "../components/Modals/ProductsModal"
import { AdvancedPricingModal } from "../components/Modals/AdvancedPricingModal";
import { GenericTable } from "../components/GenericTable";
import { UseTableData } from "../hooks/UseTableData";
import { getProductData } from "../services/productsApi";
import { pageHeaderStyles } from "../styles/generalStyles";

export function ProductsPage() {
    
    const entity = "products"
    const {columnSet, title} = useEntityConfiguration(entity);
    const keyField = useMemo(() => UseEntityConfigurationKeys(entity), [entity]);          
    const {tableData, refreshData } = UseTableData(getProductData);
    const confirmDialog = useConfirmDialog()    
    const crudModal = useCrudModal(refreshData); 
    const pricingModal = useCrudModal(refreshData);


    const tableDataRows = useMemo(() => 
      tableData.map((item) => ({ ...item, id: item[keyField] })),
      [tableData, keyField]
    );

    const renderRowMenu = useMemo(() => (params) => (
      <ProductsRowMenu
        row={params.row}
        crudModal={crudModal}
        pricingModal={pricingModal}
        confirmDialog={confirmDialog} 
      />
    ), [crudModal, pricingModal, confirmDialog]);
  
    const columns = useMemo(()=>[
      ...columnSet,
      {
        field: "actions",
        headerName: "Acciones",
        width: 100,
        sortable: false,
        renderCell: renderRowMenu
      },
    ], [columnSet, renderRowMenu]);


    console.log("GenericTable props", { tableDataRows, keyField, columns });    
    return (
      <div>
        <div style={pageHeaderStyles()}>          
        <Typography variant="h5" component="h2">
          Productos
        </Typography>                
          <CustomMenuWrapper 
            entity="products"
            modal={crudModal}
          />             
        </div>

        <Divider sx={{ mb: 2, borderColor: 'rgba(255,255,255,0.2)' }} />
        <GenericTable
          columnSet={columns}
          data={tableDataRows}
          containerHeight="75vh"          
        /> 
        
        {crudModal.open && crudModal.editingItem && (
            <ProductsModal 
                open={crudModal.open}
                onModalClose={crudModal.closeModal} 
                onDatabaseAction={crudModal.handleModalAction}
                rowData={crudModal.editingItem} 
                mode={crudModal.modeEditCreate}>            
            </ProductsModal>            
        )}
        <hr></hr>

            <AdvancedPricingModal
                pricingModal={pricingModal}
                rowData={pricingModal.editingItem}
            />                        


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
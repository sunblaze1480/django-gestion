import React from 'react'
import { CustomersModal } from '../Modals/CustomersModal'
import { ProductsModal } from '../Modals/ProductsModal'

export function CrudModalWrapper({entity, open, onModalClose, onDatabaseAction, rowData, mode}) {
    switch(entity){
        case 'customers':
            return <CustomersModal open={open} onModalClose={onModalClose} onDatabaseAction={onDatabaseAction} rowData={rowData} mode={mode}></CustomersModal>
        case 'products':            
            return <ProductsModal open={open} onModalClose={onModalClose} onDatabaseAction={onDatabaseAction} rowData={rowData} mode={mode}></ProductsModal> 
    }
}
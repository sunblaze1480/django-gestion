import React, {useState, useContext} from 'react'
import { BaseMenu } from './BaseMenu';

export function CreateInvoiceMenu({invoice, handleGeneracionAutomaticaClicked}){

    return(
        <BaseMenu
              items={[
                { label: 'Generacion Automatica', onClick: handleGeneracionAutomaticaClicked },
                { label: 'Log Factura JSON', onClick: () => console.log(invoice) },
            ]}
            >
        </BaseMenu>        
    )
}            

            
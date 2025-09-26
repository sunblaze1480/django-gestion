import React from 'react'
import { BaseMenu } from './BaseMenu';

export const SalesHeaderPageMenu = () => {
    
    return(
        <div>
        <BaseMenu
                items={[
                { label: 'Agregar', onClick: () => window.location.href = '/sales/create' },                
            ]}
            >
        </BaseMenu>          
        </div>
    )
}
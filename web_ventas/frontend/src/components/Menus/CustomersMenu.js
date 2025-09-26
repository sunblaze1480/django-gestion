import React, {useState, useContext} from 'react'
import { UseEntityConfigurationDefault } from '../../hooks/useEntityConfiguration';
import { BaseMenu } from './BaseMenu';

export function CustomersMenu({crudModal}){
    
    const defaultModel = UseEntityConfigurationDefault('customers');
    const handleAddClick = (modal) => modal.openModal(defaultModel, 'A');
    

    return(
        <div>
            <BaseMenu
                items={[
                    { label: 'Agregar', onClick:() => handleAddClick(crudModal) },
                ]}
                >
            </BaseMenu>
        </div>
    )
}
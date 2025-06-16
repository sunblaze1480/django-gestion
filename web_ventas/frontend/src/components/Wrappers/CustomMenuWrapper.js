import React, {useState} from 'react'
import { ProductsMenu } from '../Menus/ProductsMenu'

export function CustomMenuWrapper({entity, modal}) {    
    switch(entity){
        case 'products':            
            return <ProductsMenu crudModal={modal}></ProductsMenu>
        default:
            return <div> </div>
    }
            
}

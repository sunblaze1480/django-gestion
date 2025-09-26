import React, {useMemo} from "react";
import { defaultCustomer, defaultProduct, defaultSalesHeader, defaultSalesOrder, defaultPriceList, defaultInvoiceHeader } from "../schemas/defaultModels";
import { entityColumnSets, entityKeys, entityMessages, titles } from "../config/entityConfigurations";

const entityDefaults = {
    customers: defaultCustomer,
    products: defaultProduct,
    salesHeader: defaultSalesHeader,
    salesOrder: defaultSalesOrder,
    priceList: defaultPriceList,
    invoiceHeader: defaultInvoiceHeader
}


export function useEntityConfiguration(entity) {
    const result = useMemo(() => {
        const columnSet = entityColumnSets[entity];
        const title = titles[entity];
        return {columnSet, title};
    }, [entity]);

    return result;
}

export function UseEntityConfigurationMessages(entity, message){    
    console.log(entity)
    if (entity)
    {        
        const retMessage = entityMessages[entity][message]                
        if (retMessage != undefined){
            return retMessage
        }        
    }
    return " "    
}

export function UseEntityConfigurationKeys(entity){
    console.log("entity")
    if (entity)
    {
        const key = entityKeys[entity]
        if (key != undefined){
            return key
        }        
    }
    return " "      
}

export function UseEntityConfigurationDefault(entity){
    if (entity)
    {
        const def = entityDefaults[entity]
        if (def){
            return def
        }else {console.log(`No se encuentra default para ${entity}`)}
    }
}
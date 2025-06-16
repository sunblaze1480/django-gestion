import React, {useState, useContext, useEffect} from "react";
import { UseEntityConfigurationMessages } from "./useEntityConfiguration";
import { useAlertsContext } from "../context/AlertsContext";
import { getAdvancedPricing, addAdvancedPricing, getPricingTypes } from "../services/productsApi";

export const useAdvancedPricingModal = (rowData) => {

    const [prices, setPrices] = useState([]);        
    const [newRows, setNewRows] = useState([]);
    const [ pricingTypes, setPricingTypes] = useState([]);

    const { openAlert, closeAlert, alert, handleDataChangeAlert} = useAlertsContext();
    

    const handleAddClicked = () => {
        setNewRows([...newRows, {product:rowData.product_id ,price_type: ' ', unit_price: ' ' }])       
    }


    const handleInputChanged = (event,field, index) => {
        const { value } = event.target;        
        const changedRows = [...newRows];
        changedRows[index][field] = value;
        setNewRows(changedRows);
    }
    
    const handleUpdateClicked = () => {

        addAdvancedPricing(newRows).then(()=>{            
            openAlert('Success',UseEntityConfigurationMessages('advancedPricing', 'created') )                
        }).catch((err)=>{
            console.log(err)
            openAlert('error',"Error invocando API de actualizacion de precios")
        })        
        
    }
    
    useEffect(() => {
        if (rowData.product_id) {
            getAdvancedPricing(rowData.product_id)
                .then((pricing) => setPrices(pricing))
                .catch((err) => console.log(err));
        }
        getPricingTypes().then((types)=> setPricingTypes(types)).catch((err)=>console.log(err))
    }, [rowData]);

    return {prices,
            newRows,
            pricingTypes,
            handleAddClicked,
            handleInputChanged,
            handleUpdateClicked,

    }
}


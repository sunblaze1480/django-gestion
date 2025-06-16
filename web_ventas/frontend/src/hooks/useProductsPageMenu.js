import React, {useState} from 'react'
import Papa from 'papaparse'
import { callMassUpdate } from '../services/productsApi'
import { alertStyles } from '../styles/generalStyles'
import { UseEntityConfigurationDefault } from './useEntityConfiguration'
import {useAlertsContext} from '../context/AlertsContext'


export function useProductsPageMenu(){

    const [openDialog, setOpenDialog]= useState(false)
    const [file, setFile] = useState("")    
    const defaultModel = UseEntityConfigurationDefault('products');
    const {openAlert} = useAlertsContext()

    const handleAddClick = (modal) => modal.openModal(defaultModel, 'A');

    const handleFileChange = (e) => {
        if (e.target.files[0])
        {
            setFile(e.target.files[0])
        }
    }

    const handleFileUpload = async()=>{
        if (file){            
            //Parse the csv
            const reader = new FileReader()
            //Func Onload
            reader.onload = async() =>{
                const csvdata = reader.result;                
                try{
                    const parsedData = Papa.parse(csvdata, {header:false,skipEmptyLines:true})                    

                    //Convert Array to object so we can json it
                    const jsonData = parsedData.data.map(([product_id,product_desc, unit_price, unit_of_measure, units_quantity])=>({product_id,product_desc, unit_price, unit_of_measure, units_quantity}))
                    callMassUpdate(jsonData).then((msg)=>{                        
                        openAlert("Success", "CSV Cargado con exito" );                                                 
                    }).catch((error)=>{
                        openAlert("Error", "Error cargando CSV" );                        
                        console.error(error)
                    })
                }catch(error){
                    openAlert("Error", "Error cargando CSV" );                    
                }
            } //Fin onload
            
            reader.readAsText(file)
        }
    }

    return {
        handleAddClick,
        openDialog,
        setOpenDialog,
        handleFileChange,
        handleFileUpload,
    }
}
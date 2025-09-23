import React, { useState } from "react";
import { Typography, Stack, Button,Autocomplete, Dialog,DialogActions,DialogTitle, DialogContent, Paper,TextField } from "@mui/material";
import { useAlertsContext } from "../context/AlertsContext";
import { useTableContext } from "../context/TableDataContext";
import Papa from 'papaparse'
import { callUploadPriceList } from "../services/priceListApi";

export const CreatePriceListPage = () => {

    const {
        tableData, setTableData, refreshData
      } = useTableContext();
    
    const [priceList, setPriceList] = useState({})
    const [file, setFile] = useState({});
    const {openAlert, closeAlert, alert, handleDataChangeAlert} = useAlertsContext();
    const [openDialog, setOpenDialog] = useState(false);
    const hasOptions = tableData && tableData.length > 0;


    const handleChangePriceList = (event, newValue) => {
        setPriceList((prev)=>({...prev, name: newValue.name}))
    }
    
    const handleDescriptionChange = (event) => {
        setPriceList((prev)=>({...prev, description: event.target.value}))
    }

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
                    //Parsing to get a js object from the file data
                    const parsedData = Papa.parse(csvdata, {header:false,skipEmptyLines:true})                                        

                    //Add that detail data to the header
                    
                    
                    //Convert Array to object so we can json it                    
                    const detail_data = parsedData.data.map(([product_code, product_description, product_price, packaging, units_per_package]) => ({ product_code, product_description, product_price, packaging, units_per_package }));
                    const completePriceList = { ...priceList, price_list_detail: detail_data };                                                        
                    setPriceList(completePriceList)

                    callUploadPriceList(completePriceList) .then((msg)=>{
                        openAlert("success", "CSV Cargado!")                                                
                    }).catch((error)=>{
                        openAlert("error", "error cargando csv")
                        console.error(error.message)
                    })
                }catch(error){
                    console.log(error.message)
                    openAlert("error", "Error cargando csv")
                }
            } //Fin onload
            
            reader.readAsText(file)
        }
    }
    
    return (   
        <div class='center'>
            <Paper elevation="12" sx={{width:650, marginBottom:'2%'}}>
                <Typography variant="h6" component="h6" className='header-title'>
                    Seleccione Lista de Precios o cree una nueva
                </Typography>
            <Stack spacing={2} sx={{ width: 450 }}>
                <Autocomplete
                    sx={{width:300}}
                    id='priceListName'
                    freeSolo
                    options={hasOptions? tableData: []}
                    renderInput={(params) => <TextField
                            {...params}
                            label={hasOptions ? "Seleccionar o crear " : "Sin opciones..."}>                            
                        </TextField>}                    
                    getOptionLabel={(option) => option.name || option}
                    onChange={handleChangePriceList}
                ></Autocomplete>
                <TextField variant='standard' label="descripcion" id="price-list-desc" onChange={handleDescriptionChange}>                    
                </TextField>
            </Stack>
            </Paper>
            <Paper elevation="12" sx={{width:650, marginBottom:'2%'}}>
                <Button variant="contained" onClick={()=>setOpenDialog(true)}>
                    Cargar desde archivo
                </Button>
                <Dialog open={openDialog} onClose={()=>setOpenDialog(false)}>
                    <DialogTitle>Seleccionar archivo CSV</DialogTitle>
                    <DialogContent>
                        <input type="file" accept=".csv" onChange={handleFileChange}></input>
                    </DialogContent>
                    <DialogActions>
                        <Button variant="contained" color='primary' onClick={handleFileUpload}>Subir</Button>
                        <Button variant="contained" color='secondary' onClick={()=>setOpenDialog(false)}>Cancel</Button>
                    </DialogActions>
                </Dialog>
            </Paper>
        </div>
    )
}
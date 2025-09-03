import React, { useState, useEffect } from 'react';
import Modal from '@mui/material/Modal';
import { TextField, Button, Typography, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import Box from '@mui/material/Box';
import { callUpdateCreateAPI } from '../../services/productsApi';
import { modalTextFieldStyle, modalTitleStyle } from '../../styles/modalStyles';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

export function ProductsModal({open, onModalClose, onDatabaseAction, rowData, mode}) {

    const productCategories = ['AFIP', 'VENTA', 'COMPR', '']

    if (!rowData) {
        return null;
      }
  
    const [editedData, setEditedData] = useState(rowData?rowData:{});
    
    const handleChange = (field, value) => {setEditedData((prevEditedData)=>({...prevEditedData, [field]:value}))}

    useEffect(()=>{setEditedData(rowData? rowData:{})}, [rowData]);

    const handleSave = async ()=> {
        callUpdateCreateAPI(editedData, mode).then((msg)=>{            
            onDatabaseAction('Success', msg);
            onModalClose();
        })
        .catch((error)=>{                        
            const errorResponseJson = JSON.parse(error.message);                     
            onDatabaseAction('Error', errorResponseJson.Error);            
            console.log(errorResponseJson.Error);
        })                        
    }

    if (editedData){
        return (            
            <Modal
                open={open} 
                onClose={onModalClose}>                                                                                                
                    <Box class='modalContent content-center modal-small'>
                        <div class='modalTitle'>
                        
                        <Typography component="h4" variant="h4" sx={modalTitleStyle}>
                            {rowData.product_id?
                                (<>Producto: <p style={{color:'rgb(55 189 47)', display: 'inline'}}>{rowData.product_id}</p></> )
                                :
                                ("Crear Nuevo Producto")
                            }   
                            </Typography>                                                                                             
                        </div>
  
                            <TextField  variant="standard" label='Codigo Producto' type='number' required value={editedData.product_id} onChange={(e)=>(handleChange('product_id', e.target.value))} sx={modalTextFieldStyle}></TextField>
                            <TextField variant="standard" label='Descripcion' fullWidth value={editedData.product_desc} onChange={(e)=>(handleChange('product_desc', e.target.value))} sx={modalTextFieldStyle}></TextField>                        
                            <TextField variant="standard" label='Precio Unitario' type='number'  value={editedData.unit_price} onChange={(e)=>(handleChange('unit_price', e.target.value))} sx={modalTextFieldStyle}></TextField>                        
                            <TextField variant="standard" label='Cantidad en Paquete' type='number' value={editedData.units_quantity} onChange={(e)=>(handleChange('units_quantity', e.target.value))} sx={modalTextFieldStyle}></TextField>                        
                            <TextField variant="standard"  label='Unidad Medida' value={editedData.unit_of_measure} onChange={(e)=>(handleChange('unit_of_measure', e.target.value))} sx={modalTextFieldStyle}></TextField>                        
                            <TextField variant="standard"  label='Stock Disponible' type='number' value={editedData.stock_quantity}  onChange={(e)=>(handleChange('stock_quantity', e.target.value))} sx={modalTextFieldStyle}></TextField>
                            <TextField
                            select
                            label="Category"
                            variant="standard"
                            fullWidth
                            value={editedData.category}
                            onChange={(e) => handleChange('category', e.target.value)}
                            sx={modalTextFieldStyle}
                            >
                            {productCategories.map((cat) => (
                                <MenuItem key={cat} value={cat}>
                                {cat}
                                </MenuItem>
                            ))}
                            </TextField>
                        <div>
                            <Button variant='outlined' color='success' startIcon={<CheckCircleIcon/>} onClick={handleSave}>Guardar</Button>
                        </div>                             
                    </Box>                
            </Modal>
        )    
    }
     return (<div></div>) ; 

    
}
import React, { useState, useEffect } from 'react';
//MUI IMports
import { TextField, Button, Typography, Modal, Box } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
//APIs
import { callUpdateCreateAPI } from '../../services/customersApi';
//Styles
import { modalTextFieldStyle, modalTitleStyle, modalContentStyle } from '../../styles/modalStyles';
import { useTheme } from '@emotion/react';


export function CustomersModal({open, onModalClose, onDatabaseAction, rowData, mode}) {

    if (!rowData) {
        return null;
    }

    const theme = useTheme();
    const [editedData, setEditedData] = useState(rowData?rowData:{});
    useEffect(()=>{setEditedData(rowData? rowData:{})}, [rowData]);
    
    //Functions
    const handleChange = (field, value) => {setEditedData((prevEditedData)=>({...prevEditedData, [field]:value}))}

    const handleSave = async ()=> {        
        callUpdateCreateAPI(editedData, mode).then((msg)=>{            
            onDatabaseAction('Success', msg);
            onModalClose();
        })
        .catch((error)=>{                        
            console.log(error);
        })                        
    }



    if (editedData){
        return (            
            <Modal
                open={open} 
                onClose={onModalClose}>                                                                                                
                    <Box style={modalContentStyle(theme)}>
                    <div class='modalTitle'>                        
                        <Typography component="h4" variant="h4" sx={modalTitleStyle}>
                            {rowData.customer_id?
                                (<>Cliente: <p style={{color:'rgb(55 189 47)', display: 'inline'}}>{rowData.customer_id}</p></> )
                                :
                                ("Crear Nuevo Cliente")
                            }   
                            </Typography>                                                                                             
                    </div>     
                        <TextField  variant="standard" required  label='Codigo Cliente' type='number'  size="small" value={editedData.customer_id} onChange={(e)=>(handleChange('customer_id', e.target.value))} sx={modalTextFieldStyle}></TextField>                                       
                        <TextField  variant="standard" required label='Nombre' value={editedData.name} onChange={(e)=>(handleChange('name', e.target.value))} sx={modalTextFieldStyle}></TextField>                        
                        <TextField variant="standard"  label='# Cuenta Cliente' size="small" type='number'  value={editedData.cust_account} onChange={(e)=>(handleChange('cust_account', e.target.value))} sx={modalTextFieldStyle}></TextField>                        
                        <TextField variant="standard"  label='CUIT/CUIL'  size="small" type='number' value={editedData.tax_id} onChange={(e)=>(handleChange('tax_id', e.target.value))} sx={modalTextFieldStyle}></TextField>                        
                        <TextField variant="standard" required label='Direccion' value={editedData.address} onChange={(e)=>(handleChange('address', e.target.value))} sx={modalTextFieldStyle}></TextField>                        
                        <TextField variant="standard"  label='Telefono' type='number' value={editedData.phone}  onChange={(e)=>(handleChange('phone', e.target.value))} sx={modalTextFieldStyle}></TextField>    
                        <TextField variant="standard"  label='Email' type='email' size="small" value={editedData.email}  onChange={(e)=>(handleChange('email', e.target.value))} sx={modalTextFieldStyle}></TextField>    
                        <div>
                            <Button variant='outlined' color='success' startIcon={<CheckCircleIcon/>} onClick={handleSave}>Guardar</Button>
                        </div>                             
                    </Box>                
            </Modal>
        )    
    }
     return (<div></div>) ; 

    
}
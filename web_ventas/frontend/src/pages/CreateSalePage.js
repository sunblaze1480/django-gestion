import React, { useEffect, useState } from 'react'
import { TextField,  Typography, Button, Autocomplete, Paper, Grid, Select, MenuItem, IconButton, FormControl, InputLabel} from '@mui/material'
import { UseCreateSalePage } from '../hooks/UseCreateSalePage';
import Stack from '@mui/material/Stack';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CheckIcon from '@mui/icons-material/Check';
import DeleteIcon from '@mui/icons-material/Delete';



export function CreateSalePage () {

    const {
        customerData,
        productData,
        salesOrder,
        advancedPricing,
        handleCustomerChange,
        handleAddProduct,
        handleChangeProduct,
        handleRemoveProduct,
        handleQuantityChange,
        handlePriceChange,
        handleSaveClick,
        openAdvancedPricing,
        handleAdvancedPriceSelect
    } = UseCreateSalePage();    

    return (
        <div >
        <Typography variant="h4" component="h1" className='header-title'>
          Crear Nueva Venta
        </Typography>
        <hr></hr>



        <Paper elevation="12" sx={{ width: '90%',  padding: '20px'}} >  
            <div class='sales-input'>
                
                <Autocomplete
                    id="customer-selection"
                    sx={{ width: '100%' }}        
                    options={customerData}                
                    getOptionLabel={(option)=>`${option.customer_id} - ${option.name} - ${option.address}`}                
                    onChange={handleCustomerChange}
                    renderInput={(params) => <TextField margin="dense" label="Cliente" variant='standard' {...params} />}
                ></Autocomplete>  
            </div>                            
                {salesOrder.order_detail.map((detail, index)=>(
                <div class='sales-detail-input' key={index}>
                    <Grid container spacing={2}>
                        <Grid item sx={15}>
                            <Autocomplete
                                id={`product-selection-${index}`}
                                sx={{ width: 500 }}              
                                options={productData}
                                getOptionLabel={(option)=>`${option.product_id} - ${option.product_desc}`}                
                                onChange={(event, newValue)=>handleChangeProduct(event, newValue, index)}
                                renderInput={(params) => <TextField  margin="dense" label="Producto" variant='standard' {...params} />}
                            ></Autocomplete>  
                        </Grid>
                        <Grid item sx={1}>
                            <TextField  sx={{ width: 80 }} variant='standard' margin="dense" label="Cantidad"  type='number'  id={`quantity-selection-${index}`} onChange={(event)=>handleQuantityChange(event, index)}></TextField>
                        </Grid>                               
                        <Grid item sx={3}>
                            <TextField variant='standard' type='number' margin="dense" label="Precio Unitario"  id={`price-selection-${index}`} value={`${parseFloat(detail.unit_price).toFixed(2)}`} onChange={(event)=>handlePriceChange(event, index)}></TextField>
                        </Grid>
                        <Grid item sx={3}>
                        <FormControl variant="standard" margin='dense' fullWidth>
                                <InputLabel id={`price-options-label-${index}`}>Precios Avanzados</InputLabel>
                                <Select
                                    labelId={`price-options-label-${index}`}
                                    id={`price-options-${index}`}
                                    value={detail.unit_price}
                                    onChange={(e)=>handleAdvancedPriceSelect(e, index)}
                                    onOpen={()=>openAdvancedPricing( index)} 
                                    sx={{marginTop:1}}                       
                                >
                                {advancedPricing.length>0? (
                                     advancedPricing.map((price)=>(
                                        <MenuItem value={price.unit_price}>{price.price_type_details.description} - {price.unit_price}</MenuItem>
                                     ))                                                              
                                ) : ""
                                }                                
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item sx={3}> 
                        <TextField  variant="standard"  margin="dense" color='warning' focused id={`subtotal-${index}`} label='Subtotal' value={`${parseFloat(detail.amount).toFixed(2)}`}></TextField>
                        </Grid>
                        <IconButton aria-label="delete"  size="small" color='error' onClick={handleRemoveProduct}><DeleteIcon fontSize='inherit'/></IconButton>
                    </Grid>            
                </div>))}                         
                    <Typography variant="h6"className='highlight-text-dark' align='right'>Total:   ${parseFloat(salesOrder.total_amount).toFixed(2)}</Typography>
            </Paper>
            <hr></hr>
            <Stack spacing={2} direction="row"  sx={{ marginTop: '20px' }}>
                <Button variant="outlined" color="secondary" onClick={handleAddProduct} startIcon={<AddCircleIcon/>}>
                    Agregar Producto
                </Button>
                <Button variant="outlined" color="success" onClick={handleSaveClick} startIcon={<CheckIcon/>}>
                    GUARDAR
                </Button> 
            </Stack>
        </div>
    )
}
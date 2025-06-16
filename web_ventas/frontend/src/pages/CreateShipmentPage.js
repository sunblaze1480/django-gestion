import React, { useEffect, useState } from 'react'
import { TextField,  Typography, Button, Autocomplete, Paper, Grid, Select, MenuItem, Menu} from '@mui/material'
import { UseCreateSalePage } from '../hooks/UseCreateSalePage';
import Stack from '@mui/material/Stack';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CheckIcon from '@mui/icons-material/Check';



export function CreateShipmentPage () {

    const {
        customerData,
        productData,
        salesOrder,
        advancedPricing,
        handleCustomerChange,
        handleAddProduct,
        handleChangeProduct,
        handleQuantityChange,
        handlePriceChange,
        handleSaveClick,
        openAdvancedPricing,
        handleAdvancedPriceSelect
    } = UseCreateSalePage();
    

    return (
        <div >
        <Typography variant="h4" component="h1" className='header-title'>
          Crear Reparto
        </Typography>
        <hr></hr>



        <Paper elevation="12" sx={{ width: '90%',  padding: '20px'}} >         
                <Typography variant="h6">Seleccionar pedidos a entregar</Typography>
                {salesOrder.order_detail.map((detail, index)=>(
                <div class='display-flex' key={index}>
                    <Grid container spacing={2}>
                        <Grid item sx={15}>
                            <Autocomplete
                                id={`product-selection-${index}`}
                                sx={{ width: 500 }}              
                                options={productData}
                                getOptionLabel={(option)=>`${option.product_id} - ${option.product_desc}`}                
                                onChange={(event, newValue)=>handleChangeProduct(event, newValue, index)}
                                renderInput={(params) => <TextField variant='standard' {...params} />}
                            ></Autocomplete>  
                        </Grid>
                        <Grid item sx={1}>
                            <TextField  sx={{ width: 80 }} variant='standard' type='number'  id={`quantity-selection-${index}`} onChange={(event)=>handleQuantityChange(event, index)}></TextField>
                        </Grid>                               
                        <Grid item sx={3}>
                            <TextField variant='standard' type='number'  id={`price-selection-${index}`} value={`${parseFloat(detail.unit_price).toFixed(2)}`} onChange={(event)=>handlePriceChange(event, index)}></TextField>
                        </Grid>
                        <Grid item sx={3}>
                            <Select
                                
                                id={`price-options-${index}`}
                                labelId={`price-options-${index}`}
                                variant='standard'
                                value={detail.unit_price}
                                onChange={(e)=>handleAdvancedPriceSelect(e, index)}
                                onOpen={()=>openAdvancedPricing(index)}                        
                            >
                            {advancedPricing.length>0? (
                                 advancedPricing.map((price)=>(
                                    <MenuItem   label='Precios Configurados' value={price.unit_price}>{price.price_type_details.description} - {price.unit_price}</MenuItem>
                                 ))                                                              
                            ) : ""
                            }                                
                            </Select> 
                        </Grid>
                        
                        <Grid item sx={3}>
                            <Typography variant="h6" className='highlight-text'>  ${parseFloat(detail.amount).toFixed(2)}</Typography>
                        </Grid>
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
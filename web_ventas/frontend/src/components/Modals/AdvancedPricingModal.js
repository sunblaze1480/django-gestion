import { Typography, Modal, TextField, Grid, Box, Button, MenuItem, Select, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import { getAdvancedPricing, addAdvancedPricing, getPricingTypes } from "../../services/productsApi";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useAdvancedPricingModal } from "../../hooks/useAdvancedPricingModal";

export const AdvancedPricingModal = ({ pricingModal, rowData, handlePick=null }) => {
    if (!rowData) {
        return null;
    }

    const {   
        prices,
        newRows,
        pricingTypes,
        handleAddClicked,
        handleInputChanged,
        handleUpdateClicked } = useAdvancedPricingModal(rowData);


    return (
  
        <Modal
            open={pricingModal.open}
            onClose={pricingModal.closeModal}
        >           
            <Box class='modalContent content-center modal-small'>
            <div class='modalTitle'> 
            <Typography variant='h6'>
                    Precios para producto:
                </Typography>
                <Typography>
                    {rowData.product_id} - {rowData.product_desc}
                </Typography>
            </div>
                {prices.length > 0 ? (
                    <Grid container spacing={2} sx={{ marginTop: 2 }}>
                        {prices.map((item) => (
                            <Grid container item key={item.id} spacing={2}>
                                <Grid item xs={6}>
                                    <TextField
                                        variant='standard'
                                        label='Tipo de precio'
                                        value={item.price_type_details?.description || ''}
                                        fullWidth
                                        InputProps={{ readOnly: true }}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        variant='standard'
                                        label='Precio'
                                        value={item.unit_price}
                                        fullWidth                                        
                                    />
                                </Grid>
                            </Grid>
                        ))}
                    
                    </Grid>
                ) : (
                    <Typography variant='body2' sx={{ marginTop: 2 }}>
                        No hay precios configurados
                    </Typography>
                )}
            {newRows.length> 0 ?(
                <div class='center'>
                    {newRows.map((item, index)=>(
                        <Grid container spacing={2}  sx={{ marginTop: '1%' }} alignItems='flex-end'>
                            <Grid item xs={6}>
                                {pricingTypes.length>0 ? (
                                    <Select        
                                        sx={{ width: '100%' }}                                
                                        labelId="select-price-type"
                                        id={"select-price-type-"}
                                        value={item['price_type']}
                                        onChange={(e)=>handleInputChanged(e, 'price_type', index)}                                                                                  
                                        variant='standard'                                  
                                    >
                                        {pricingTypes.map((type)=>(
                                            <MenuItem value={type.id}>{type.description}</MenuItem>
                                        ))}
                                    </Select>
                                    ): ""}
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    variant='standard'
                                    label='Precio'
                                    value={item.unit_price}
                                    fullWidth
                                    type="number"
                                    onChange={(e)=>handleInputChanged(e, 'unit_price',  index)}                                        
                                />
                            </Grid>
                        </Grid>
                    ))}
                </div>
            ): ""
            }            
                <Stack direction='row' spacing={2} sx={{width:'100%', marginTop: '5%'}} alignItems='center'>
                    <Button variant='outlined' color='secondary' startIcon={<AddCircleIcon/>} onClick={handleAddClicked}>
                        Agregar
                    </Button> 
                    <Button variant='outlined' color='success' startIcon={<AddCircleIcon/>} onClick={handleUpdateClicked}>
                        Actualizar
                    </Button> 
                </Stack>                             
            </Box>          
        </Modal>    
    );
};

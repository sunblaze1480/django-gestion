import React from 'react'
import { TextField,  Typography, Button, Autocomplete, Grid, Box, Divider} from '@mui/material'
import Stack from '@mui/material/Stack';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CheckIcon from '@mui/icons-material/Check';
import { useCreateInvoicePage } from '../hooks/useCreateInvoicePage';
import { CreateInvoiceMenu } from '../components/Menus/CreateInvoiceMenu';
import InvoiceTargetAmountModal from '../components/Modals/InvoiceTargetAmountModal';
import { containerStyles, pageHeaderStyles } from '../styles/generalStyles';
import { useTheme } from '@emotion/react';


export const CreateInvoicePage = () => {

    const { 
        productData,
        customerData,
        invoice,
        targetAmountOpen,
        handleCustomerChange,
        handleAddProduct,
        handleChangeProduct,
        handleChangeQuantity,
        handlePriceChange,
        handleSubmitInvoice,
        handleGeneracionAutomaticaClicked,
        handleClose,
        invoiceGenerator } = useCreateInvoicePage();

        const theme = useTheme();
    
   return (
    <div>

        <div style={pageHeaderStyles()}>

            <Typography variant="h5" component="h2">
              Generar nueva factura
            </Typography> 
            <CreateInvoiceMenu 
                invoice={invoice} 
                handleGeneracionAutomaticaClicked={handleGeneracionAutomaticaClicked}
            />
        </div>

        <Divider sx={{ mb: 2, borderColor: 'rgba(255,255,255,0.2)' }} />               
        <div style={{ ...containerStyles(theme), height: '60vh' }}>
            <Autocomplete
                id="customer-selection"
                sx={{ width: '50%' }}        
                options={customerData}             
                getOptionLabel={(option)=>`${option.customer_id??''} - ${option.name??''} - ${option.address??''}`}                
                onChange={handleCustomerChange}
                value={customerData.find(c => c.customer_id === invoice.customer) ?? null}
                size="small"
                renderInput={(params) => <TextField margin="dense" label="Cliente" size="small" variant='filled' {...params} />}
            ></Autocomplete> 
           
            <Stack spacing={2} direction="row"  sx={{ marginTop: '20px' }}>
                <Button variant="contained" size="small" color="secondary" onClick={handleAddProduct} startIcon={<AddCircleIcon/>}>
                    Agregar producto
                </Button>
            </Stack>
            {invoice.details.map((row, index)=>(
                <div key={index}>
                    <Grid container spacing={2} sx={{fontSize:10, flexWrap: 'nowrap', overflowX:'auto', minWidth:'600'}}>
                        <Grid item xs={5}>
                            <Autocomplete
                                id={`product-selection-${index}`}
                                options={productData}                                
                                value={productData.find(p => p.product_id === invoice.details[index].product) ?? null}
                                getOptionLabel={(option)=>`${option.product_id} - ${option.product_desc}`}                
                                onChange={(event, newValue)=>handleChangeProduct(event, newValue, index)}
                                renderInput={(params) => <TextField label='Producto' margin="dense" variant='standard' {...params} />}
                            ></Autocomplete>  
                        </Grid>
                        <Grid item xs={1}>
                            <TextField  disabled label='Cant. Paquete' sx={{  marginLeft: '2%', minWidth: '50' }} variant='standard'  margin="dense" type='number'  id={`quantity-in-package-${index}`} value={`${row.quantity_in_package}`}></TextField>
                        </Grid>   
                        <Grid item xs={1}>
                            <TextField label='Cantidad'   variant='standard'  margin="dense" type='number'  id={`quantity-selection-${index}`} value={`${row.quantity}`} onChange={(event)=>handleChangeQuantity(event, index)}></TextField>
                        </Grid>                             
                        <Grid item xs={1}>
                            <TextField  label='Precio Unitario'  variant='standard' margin="dense" type='number'  id={`price-selection-${index}`} value={`${parseFloat(row.declared_unit_price).toFixed(2)}`} onChange={(event)=>handlePriceChange(event, index)}></TextField>
                        </Grid>
                        <Grid item xs={1}>
                            <TextField label='IVA Unit.'   variant="standard"  margin="dense" id={`tax-amount-${index}`} value={`${parseFloat(row.unit_tax_amount).toFixed(2)}`}></TextField>                            
                        </Grid>                      
                        <Grid item xs={1}>
                            <TextField  label='Subtotal'  variant="standard"  margin="dense" color='primary' focused id={`subtotal-${index}`}  value={`${parseFloat(row.gross_amount).toFixed(2)}`}></TextField>                             
                        </Grid>
                        <Grid item xs={1}>
                            <TextField  label='Subtotal IVA'  variant="standard"  margin="dense" color='warning' focused id={`subtotal-tax-${index}`} value={`${parseFloat(row.tax_amount).toFixed(2)}`}></TextField>                                                         
                        </Grid>
                        <Grid item xs={1}>
                            <TextField  label='Subtotal + IVA (Factura B)'  variant="standard"  margin="dense" color='secondary' focused id={`subtotal-net-${index}`} value={`${parseFloat(row.net_amount).toFixed(2)}`}></TextField>                                                         
                        </Grid>
                    </Grid>            
                </div>
            ))}
        </div>      
            
            <hr></hr>                  
                <Box sx={containerStyles(theme)}>
                <Grid container spacing={1} alignItems="center">
                    <Grid item xs={5}></Grid>
                    <Grid item xs={1} sx={{ textAlign: 'right' }}>
                        <Typography>Totales: </Typography>
                    </Grid>
                    <Grid item xs={2} sx={{ textAlign: 'right' }}>
                        <TextField
                        label="Total Bruto:"
                        variant="outlined"
                        size="small"
                        value={parseFloat(invoice.total_gross_amount).toFixed(2)}
                        InputProps={{ readOnly: true }}
                        />
                    </Grid>
                    <Grid item xs={2} sx={{ textAlign: 'right' }}>
                        <TextField
                        label="Total IVA:"
                        variant="outlined"
                        size="small"
                        value={parseFloat(invoice.total_tax_amount).toFixed(2)}
                        InputProps={{ readOnly: true }}
                        />
                    </Grid>
                    <Grid item xs={2} sx={{ textAlign: 'right' }}>
                        <TextField
                        label="Total + IVA (Factura B):"
                        variant="outlined"
                        size="small"
                        value={parseFloat(invoice.total_net_amount).toFixed(2)}
                        InputProps={{ readOnly: true }}
                        />
                    </Grid>
                </Grid>
                </Box>     
    <hr></hr>
    <Stack spacing={2} direction="row"  sx={{ marginTop: '20px' }}>
        <Button variant="contained" color="primary" onClick={handleSubmitInvoice} startIcon={<CheckIcon/>}>Guardar</Button>
    </Stack>
    <InvoiceTargetAmountModal
        open={targetAmountOpen}
        onClose={handleClose}
        confirmAction={invoiceGenerator}
    ></InvoiceTargetAmountModal>

    </div>    
   )
}
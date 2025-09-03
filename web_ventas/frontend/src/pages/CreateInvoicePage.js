import React from 'react'
import { TextField,  Typography, Button, Autocomplete, Paper, Grid, Box} from '@mui/material'
import Stack from '@mui/material/Stack';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CheckIcon from '@mui/icons-material/Check';
import { useCreateInvoicePage } from '../hooks/useCreateInvoicePage';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import InvoiceTargetAmountModal from '../components/Modals/InvoiceTargetAmountModal';


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

        const logInvoice = ()=>{
            console.log("----------------")
            console.log(JSON.stringify(invoice))
            console.log("+++++++++++++++++")
            console.log(invoice)
    }
    
   return (
    <div>
        <Typography variant="h4" component="h1" className='header-title'>
            Nueva Factura
        </Typography>
        <hr></hr>
        <div class="center">
            <Button variant="contained" color="warning" onClick={handleGeneracionAutomaticaClicked} startIcon={<AutoAwesomeIcon/>}>Generacion Automatica</Button>
            <Button variant="standard" color="error" onClick={logInvoice} startIcon={<AutoAwesomeIcon/>}>Console.log(invoice)</Button>
        </div>
        <br></br>
        <Paper elevation="12" sx={{ width: '100%', minWidth:'1200px',  padding: '2%'}}>                      
            <Box sx={{ 
                maxHeight: '400px', 
                overflowX: 'auto',
                overflowY: 'auto',
                overflow: 'auto',
                                
                mb: 2,
                '& .MuiTextField-root': {
                    fontSize: '0.875rem',
                },
                '& .MuiInputLabel-root': {
                    fontSize: '0.875rem',
                },
                '& .MuiInputBase-input': {
                    fontSize: '0.875rem',
                },
                '& .MuiAutocomplete-root': {
                    fontSize: '0.875rem',
                }
            }}>   
            <Autocomplete
                id="customer-selection"
                sx={{ width: '30%' }}        
                options={customerData}             
                getOptionLabel={(option)=>`${option.customer_id??''} - ${option.name??''} - ${option.address??''}`}                
                onChange={handleCustomerChange}
                value={customerData.find(c => c.customer_id === invoice.customer) ?? null}
                renderInput={(params) => <TextField margin="dense" label="Cliente" variant='standard' {...params} />}
            ></Autocomplete>           
            <Stack spacing={2} direction="row"  sx={{ marginTop: '20px' }}>
                <Button variant="contained" size="small" color="secondary" onClick={handleAddProduct} startIcon={<AddCircleIcon/>}>
                    Agregar producto
                </Button>
            </Stack>
            {invoice.details.map((row, index)=>(
                <div key={index}>
                    <Grid container spacing={2} sx={{fontSize:10, flexWrap: 'nowrap'}}>
                        <Grid item xs={4}>
                            <Autocomplete
                                id={`product-selection-${index}`}
                                sx={{ width: 500 }}              
                                options={productData}                                
                                value={productData.find(p => p.product_id === invoice.details[index].product) ?? null}
                                getOptionLabel={(option)=>`${option.product_id} - ${option.product_desc}`}                
                                onChange={(event, newValue)=>handleChangeProduct(event, newValue, index)}
                                renderInput={(params) => <TextField label='Producto' margin="dense" variant='standard' {...params} />}
                            ></Autocomplete>  
                        </Grid>
                        <Grid item xs={1}>
                            <TextField  disabled label='Cant. Paquete' sx={{ width: 60, marginLeft: '2%' }} variant='standard'  margin="dense" type='number'  id={`quantity-in-package-${index}`} value={`${row.quantity_in_package}`}></TextField>
                        </Grid>   
                        <Grid item xs={1}>
                            <TextField label='Cantidad' sx={{ width: 60 }} variant='standard'  margin="dense" type='number'  id={`quantity-selection-${index}`} value={`${row.quantity}`} onChange={(event)=>handleChangeQuantity(event, index)}></TextField>
                        </Grid>                             
                        <Grid item xs={1}>
                            <TextField  label='Precio Unitario' variant='standard' margin="dense" type='number'  id={`price-selection-${index}`} value={`${parseFloat(row.declared_unit_price).toFixed(2)}`} onChange={(event)=>handlePriceChange(event, index)}></TextField>
                        </Grid>
                        <Grid item xs={1}>
                            <TextField label='IVA Unit.' variant="standard"  margin="dense" id={`tax-amount-${index}`} value={`${parseFloat(row.unit_tax_amount).toFixed(2)}`}></TextField>                            
                        </Grid>                      
                        <Grid item xs={1}>
                            <TextField  label='Subtotal' variant="standard"  margin="dense" color='primary' focused id={`subtotal-${index}`}  value={`${parseFloat(row.gross_amount).toFixed(2)}`}></TextField>                             
                        </Grid>
                        <Grid item xs={1}>
                            <TextField  label='Subtotal IVA' variant="standard"  margin="dense" color='warning' focused id={`subtotal-tax-${index}`} value={`${parseFloat(row.tax_amount).toFixed(2)}`}></TextField>                                                         
                        </Grid>
                        <Grid item xs={1}>
                            <TextField  label='Subtotal + IVA (Factura B)' variant="standard"  margin="dense" color='secondary' focused id={`subtotal-net-${index}`} value={`${parseFloat(row.net_amount).toFixed(2)}`}></TextField>                                                         
                        </Grid>
                    </Grid>            
                </div>
            ))}
            <hr></hr>
            </Box>            
                <Box sx= {{                
                mb: 2,
                '& .MuiTextField-root': {
                    fontSize: '0.875rem',
                },
                '& .MuiInputLabel-root': {
                    fontSize: '0.875rem',
                },
                '& .MuiInputBase-input': {
                    fontSize: '0.875rem',
                },
                '& .MuiAutocomplete-root': {
                    fontSize: '0.875rem',
                }}}>
                <Grid container spacing={2}> 
                    <Grid item xs={7}></Grid>
                    <Grid align='right'  item xs={1} >
                        <Typography>Totales: </Typography>                                                         
                    </Grid>
                    <Grid align='right'  item xs={1} >
                        <TextField  label='Total Bruto:' variant="standard"  margin="dense" color='success' focused id={`total-gross`} value={`${parseFloat(invoice.total_gross_amount).toFixed(2)}`}></TextField>                                                         
                    </Grid>
                    <Grid align='right' item xs={1} >
                        <TextField  label='Total IVA:' variant="standard"  margin="dense" color='success' focused id={`total-tax`} value={`${parseFloat(invoice.total_tax_amount).toFixed(2)}`}></TextField>                                                         
                    </Grid>
                    <Grid align='right' item xs={1} >
                        <TextField  label='Total + IVA (Factura B):' variant="standard"  margin="dense" color='success' focused id={`total-net`} value={`${parseFloat(invoice.total_net_amount).toFixed(2)}`}></TextField>                                                         
                    </Grid>            
                </Grid> 
                </Box>                            
    </Paper>
    <hr></hr>
    <Stack spacing={2} direction="row"  sx={{ marginTop: '20px' }}>
        <Button variant="contained" color="success" onClick={handleSubmitInvoice} startIcon={<CheckIcon/>}>Guardar</Button>
    </Stack>
    <InvoiceTargetAmountModal
        open={targetAmountOpen}
        onClose={handleClose}
        confirmAction={invoiceGenerator}
    ></InvoiceTargetAmountModal>

    </div>    
   )
}
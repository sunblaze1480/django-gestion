import React, {useState, useContext} from 'react'
import { Modal, TextField, Table, TableRow, TableCell, TableContainer,  TableHead, TableBody,  Button, Select, MenuItem, FormControl, InputLabel, Stack  } from '@mui/material'
import PaidIcon from '@mui/icons-material/Paid';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';

import { useSalesDetailModal } from '../../hooks/useSalesDetailModal';


export function SalesDetailModal({entityData, open, onClose, onDataChanges}){

    const {orderStatus, handleChangeAmount, handlePaymentClicked, handleChangeOrderStatus, handleChangeOrderStatusClicked} = useSalesDetailModal(entityData, onDataChanges);    

    return (
        <Modal
            open={open}
            onClose={onClose}>            
            <div class='modalContent modal-big'>                
                <div class='display-flex'>
                    <div class='content-left margin-bottom-3 width-50'>
                            <div class='order-detail-modal-content'>Orden n°:<span class='highlight-text'>  {entityData.id}</span></div>
                            <div class='order-detail-modal-content'>Cliente n°:  
                                <span class='highlight-text'>  {entityData.customer.customer_id} - {entityData.customer.name} - {entityData.customer.address} </span>
                            </div> 
                            <div class='order-detail-modal-content'>Monto Total:  $<span class='highlight-text'> {entityData.total_amount}</span></div>
                            <div class='order-detail-modal-content'>Monto Pagado:  $<span class='highlight-text'> {entityData.paid_amount}</span></div>
                            <div class='order-detail-modal-content'>Estado:    <span class='highlight-text'>{entityData.order_status}</span></div>
                            <div class='order-detail-modal-content'>Fecha:    <span class='highlight-text'>{entityData.order_date}</span></div>                                                
                    </div>
                </div>    
                                                                
                <TableContainer>
                    <Table sx={{ minWidth: 650, maxWidth:650 }} size="large" class='styled-table'>
                        <TableHead class='table-head'>
                            <TableRow>
                                <TableCell class='table-cell-smaller'>Cod. Producto</TableCell>
                                <TableCell class='table-cell'>Descripcion</TableCell>
                                <TableCell class='table-cell'>Precio</TableCell>
                                <TableCell class='table-cell-smaller'>Cantidad</TableCell>                                
                                <TableCell class='table-cell'>Subtotal</TableCell>
                                <TableCell class='table-cell'>Estado</TableCell>
                                <TableCell class='table-cell'>Metodo Pago</TableCell>
                                <TableCell class='table-cell'>Repartidor</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {entityData.order_detail.map((detail)=>(
                                <TableRow>
                                    <TableCell class='table-cell-smaller'>{detail.product.product_id}</TableCell>
                                    <TableCell class='table-cell'>{detail.product.product_desc}</TableCell>
                                    <TableCell class='table-cell-smaller'>{detail.product.unit_price}</TableCell>
                                    <TableCell class='table-cell-smaller'>{detail.quantity}</TableCell>
                                    <TableCell class='table-cell'>${detail.amount}</TableCell>
                                    <TableCell class='table-cell'>{detail.status}</TableCell>
                                    <TableCell class='table-cell'>{detail.payment_method}</TableCell>
                                    <TableCell class='table-cell'>{detail.driver}</TableCell>
                                </TableRow>
                            ))}                            
                        </TableBody>
                    </Table>
                </TableContainer>                
                <br></br>
                <Stack direction='row'>
                    <div class='flex-padding-1 column'>
                        <TextField variant='standard' type='number' label='Pagar Monto' onChange={handleChangeAmount} sx={{padding:1}}></TextField>                    
                        <Button variant="outlined" color="secondary" onClick={handlePaymentClicked} startIcon={<PaidIcon/>}>Pagar</Button>                                                      
                    </div>
                    <div class='flex-padding-1 column'>
                        <FormControl variant="standard" sx={{ minWidth: 180, padding:1 }}>
                            <InputLabel  id='select-cambio-estado-label'>Estado </InputLabel >
                            <Select  
                                labelId='select-cambio-estado-label'
                                label="Estado"
                                id='select-cambio-estado-label'
                                value={orderStatus}
                                onChange={handleChangeOrderStatus}
                            >
                                <MenuItem value='Pendiente'>Pendiente</MenuItem>
                                <MenuItem value='A Despachar'>A Despachar</MenuItem>
                                <MenuItem value='Despachada'>Despachada</MenuItem>
                                <MenuItem value='Entregada'>Entregada</MenuItem>
                                <MenuItem value='Completada'>Completada</MenuItem>
                                <MenuItem value='Cerrada'>Cerrada</MenuItem>
                            </Select>
                        </FormControl>
                        <Button variant="outlined" color="primary" onClick={handleChangeOrderStatusClicked} startIcon={<KeyboardDoubleArrowRightIcon/>}>Cambiar</Button> 
                    </div>                            
                </Stack>
                <br></br>                              
            </div>
        </Modal>
    )
}
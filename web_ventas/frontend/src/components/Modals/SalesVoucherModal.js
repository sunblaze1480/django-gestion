import React, {useState, useContext, useRef} from 'react'
import { Modal, Table, TableRow, TableCell, TableContainer, TableHead, TableBody, TableFooter , Button } from '@mui/material'
import PrintIcon from '@mui/icons-material/Print';
import { TableDataProvider } from '../../context/TableDataContext';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';



export function SalesVoucherModal({entityData, open, onClose}){

    const modalRef = useRef(null);

    const handleCopyToClipboard = async () => {        
        try {
            if (modalRef.current) {                                                                                
                const contentDiv = document.getElementById('main-section');
                const range = document.createRange()
                range.selectNodeContents(contentDiv)
                const selection = window.getSelection()
                selection.removeAllRanges()
                selection.addRange(range)
                document.execCommand('copy')
                selection.removeAllRanges()
                                        
            }
        } catch (error) {
            console.error('Failed to copy text: ', error);
            alert('Failed to copy contents to clipboard.');
        }
    }; 
    return (
        <Modal
            open={open}
            onClose={onClose}>            
            <div id = 'main-section' ref={modalRef} class='modalContent content-center modal-small'>
                <div class='content-left'>                        
                    <div class='order-detail-modal-content highlight-text-dark'><span >{entityData.customer.address}</span> </div>
                    <div class='order-detail-modal-content'><span >{entityData.order_date}</span></div>                       
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
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {entityData.order_detail.map((detail)=>(
                                <TableRow>
                                    <TableCell class='table-cell-smaller'>{detail.product.product_id}</TableCell>
                                    <TableCell class='table-cell'>{detail.product.product_desc}</TableCell>
                                    <TableCell class='table-cell-smaller'>${detail.product.unit_price}</TableCell>
                                    <TableCell class='table-cell-smaller'>{detail.quantity}</TableCell>
                                    <TableCell class='table-cell'>${detail.amount}</TableCell>
                                </TableRow>
                            ))}           
                            <TableRow className='sales-voucher-total'>                                
                                <TableCell rowSpan={1} colSpan={3}></TableCell>
                                <TableCell class="content-right highlight-text-dark">Total: </TableCell>
                                <TableCell class="highlight-text-dark" >${entityData.total_amount} </TableCell>
                            </TableRow>                
                        </TableBody>                        
                    </Table>
                </TableContainer>                 
                <Button
                        variant="contained"
                        startIcon={<ContentCopyIcon />}
                        onClick={handleCopyToClipboard}
                    >
                        Copiar
                    </Button>
                
            </div> 
        </Modal>        
    )
}
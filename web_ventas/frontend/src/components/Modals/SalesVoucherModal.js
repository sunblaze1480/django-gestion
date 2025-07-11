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
                <Table>
                    <TableHead align='left' class='content-left'>
                        <TableRow class='content-left'>
                            <TableCell align='left' class='order-detail-modal-content highlight-text-dark'>{entityData.customer.address}</TableCell>                                
                        </TableRow>
                        <TableRow class='content-left'>
                            <TableCell align='left' class='order-detail-modal-content'>{entityData.order_date}</TableCell>                                
                        </TableRow>
                        <TableRow>                            
                        </TableRow>
                        <TableRow>                            
                        </TableRow>
                    </TableHead>
                </Table>            
                <TableContainer class="table-container">
                    <Table sx={{ minWidth: 650, maxWidth:650 }} size="large" class='styled-table'>                        
                        <TableHead class='table-head'>
                            <TableRow>
                                <TableCell class='content-center' rowSpan={2}>Artículo</TableCell>
                                <TableCell class='content-center' rowSpan={2}>Precio</TableCell>
                                <TableCell class='content-center' rowSpan={2}>Cantidad</TableCell>                                
                                <TableCell class='content-center' rowSpan={2}>Subtotal</TableCell>
                            </TableRow>
                            <TableRow>                                
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {entityData.order_detail.map((detail)=>(
                                <TableRow>                                    
                                    <TableCell class='table-cell'>{detail.product.product_desc}</TableCell>
                                    <TableCell class='table-cell-smaller'>${detail.product.unit_price}</TableCell>
                                    <TableCell class='table-cell-smaller'>{detail.quantity}</TableCell>
                                    <TableCell class='table-cell'>${detail.amount}</TableCell>
                                </TableRow>
                            ))}
                            <TableRow>                                
                            </TableRow>
                            <TableRow></TableRow>
                            <TableRow className='sales-voucher-total'>                                
                                <TableCell rowSpan={1} colSpan={2}></TableCell>
                                <TableCell class="content-center highlight-text-dark">Total: </TableCell>
                                <TableCell class="content-center highlight-text-dark" >${entityData.total_amount} </TableCell>
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
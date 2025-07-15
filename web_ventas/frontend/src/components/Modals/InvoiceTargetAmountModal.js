import React, {useRef }  from 'react';
import Modal from '@mui/material/Modal';
import { TextField, Button, Typography, Box } from '@mui/material';


export default function InvoiceTargetAmountModal ({open, onClose, onConfirm}) {
    const inputAmount = useRef();

    return (
        <Modal
            open={open}
            onClose={onClose}
        >
            <Box class='modalContent content-center modal-small'> 
                <TextField inputAmount={inputAmount} type="number" variant="outlined" label="Monto a Facturar" ></TextField>
            </Box>
        </Modal>
    )

}

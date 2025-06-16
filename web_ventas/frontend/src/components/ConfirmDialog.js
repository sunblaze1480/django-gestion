import React, { useState} from "react";
import { Button, Dialog, DialogActions, DialogTitle, DialogContent } from "@mui/material";


export const ConfirmDialog = ({open, onClose, title, onCancel, onConfirm, confirmText, cancelText}) => {
        
    return(
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>{title}</DialogTitle>
            <DialogActions>
                <Button
                    variant='contained'
                    color='primary'
                    onClick={onConfirm}>
                    {confirmText}
                </Button>
                <Button
                    variant='contained'
                    color='secondary'
                    onClick={onCancel}>
                    {cancelText}
                </Button>
            </DialogActions>
        </Dialog>
    )    
}
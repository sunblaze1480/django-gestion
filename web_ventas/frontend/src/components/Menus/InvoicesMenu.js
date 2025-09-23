import React from 'react';
import { Box, Button } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';

const InvoicesMenu = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        gap: 2,                             
        flexWrap: 'wrap' 
      }}
    >
      <Button
        href="/invoices/create"
        variant="contained"
        startIcon={<AddCircleIcon />}
      >
        Generar factura
      </Button>
    </Box>
  );
};

export default InvoicesMenu;

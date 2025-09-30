import React from 'react';
import {
  Modal,
  Box,
  Typography,
  Table,
  TableRow,
  TableCell,
  TableContainer,
  TableHead,
  TableBody,
  Stack,
  Divider
} from '@mui/material';
import { useTheme, styled } from '@mui/material/styles';

const modalInvoiceStyle = (theme) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80%',
  maxWidth: '800px',
  maxHeight: '90vh',
  bgcolor: theme.palette.background.paper,
  borderRadius: 8,
  boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
  p: 4,
  overflowY: 'auto',
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(3),
});

// Optional: Alternate row color for better readability
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(even)': {
    backgroundColor: theme.palette.action.hover,
  },
}));

export function SalesVoucherModal({ salesData, open, onClose }) {
  const theme = useTheme();

  console.log(salesData)

  // Compute total
const totalAmount = salesData.order_detail.reduce(
  (acc, item) => acc + (parseFloat(item.amount) || 0),
  0
);

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={modalInvoiceStyle(theme)}>
        {/* Header */}
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">Factura #{salesData.id}</Typography>
          <Typography variant="subtitle2">{salesData.date}</Typography>
        </Stack>

        <Stack direction="column" spacing={1}>
          <Typography variant="subtitle1">
            Cliente: <strong>{salesData.customer.name}</strong>
          </Typography>
          <Typography variant="subtitle2">
            {salesData.customer.address}
          </Typography>
        </Stack>

        <Divider />

        {/* Table */}
        <TableContainer>
          <Table sx={{ minWidth: 600 }} size="small">
            <TableHead>
              <TableRow>
                <TableCell>Descripción</TableCell>
                <TableCell align="right">Precio Unitario</TableCell>
                <TableCell align="right">Cantidad</TableCell>
                <TableCell align="right">Subtotal</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {salesData.order_detail.map((item, idx) => (
                <StyledTableRow key={idx}>
                  <TableCell>{item.product.product_desc}</TableCell>
                  <TableCell align="right">${item.product.unit_price}</TableCell>
                  <TableCell align="right">{item.quantity}</TableCell>
                  <TableCell align="right">
                    ${(item.product.unit_price * item.quantity)}
                  </TableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Divider />

        {/* Footer: Total */}
        <Stack direction="row" justifyContent="flex-end" spacing={2}>
          <Typography variant="subtitle1">Total:</Typography>
          <Typography variant="h6" fontWeight={700}>
            ${totalAmount}
          </Typography>
        </Stack>
      </Box>
    </Modal>
  );
}

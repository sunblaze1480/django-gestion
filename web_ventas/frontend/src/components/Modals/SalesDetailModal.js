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
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Stack,
  TextField
} from '@mui/material';
import PaidIcon from '@mui/icons-material/Paid';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import { useTheme, styled } from '@mui/material/styles';
import { useSalesDetailModal } from '../../hooks/useSalesDetailModal';
import { modalSalesDetailStyle } from '../../styles/modalStyles';

// Styled number input
const StyledNumberInput = styled(TextField)(({ theme }) => ({
  '& input': {
    padding: theme.spacing(1),
  }
}));

export function SalesDetailModal({ entityData, open, onClose, onDataChanges, isBig }) {
  const theme = useTheme();
  const {
    orderStatus,
    handleChangeAmount,
    handlePaymentClicked,
    handleChangeOrderStatus,
    handleChangeOrderStatusClicked
  } = useSalesDetailModal(entityData, onDataChanges);

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={modalSalesDetailStyle(theme)}>
        {/* Header Info */}
        <Stack direction="column" spacing={1} mb={3}>
          <Typography variant="subtitle1">
            Orden n°: <strong>{entityData.id}</strong>
          </Typography>
          <Typography variant="subtitle1">
            Cliente: <strong>{entityData.customer.customer_id} - {entityData.customer.name} - {entityData.customer.address}</strong>
          </Typography>
          <Typography variant="subtitle1">
            Monto Total: <strong>${entityData.total_amount}</strong>
          </Typography>
          <Typography variant="subtitle1">
            Monto Pagado: <strong>${entityData.paid_amount}</strong>
          </Typography>
          <Typography variant="subtitle1">
            Estado: <strong>{entityData.order_status}</strong>
          </Typography>
          <Typography variant="subtitle1">
            Fecha: <strong>{entityData.order_date}</strong>
          </Typography>
        </Stack>

        {/* Table */}
        <TableContainer sx={{ maxHeight: '40vh', mb: 3 }}>
          <Table stickyHeader size="small">
            <TableHead>
              <TableRow>
                <TableCell>Cod. Producto</TableCell>
                <TableCell>Descripcion</TableCell>
                <TableCell>Precio</TableCell>
                <TableCell>Cantidad</TableCell>
                <TableCell>Subtotal</TableCell>
                <TableCell>Estado</TableCell>
                <TableCell>Metodo Pago</TableCell>
                <TableCell>Repartidor</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {entityData.order_detail.map((detail) => (
                <TableRow key={detail.product.product_id}>
                  <TableCell>{detail.product.product_id}</TableCell>
                  <TableCell>{detail.product.product_desc}</TableCell>
                  <TableCell>{detail.product.unit_price}</TableCell>
                  <TableCell>{detail.quantity}</TableCell>
                  <TableCell>${detail.amount}</TableCell>
                  <TableCell>{detail.status}</TableCell>
                  <TableCell>{detail.payment_method}</TableCell>
                  <TableCell>{detail.driver}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Actions */}
        <Stack
  direction={{ xs: 'column', sm: 'row' }}
  spacing={2}
  mt={3}
  alignItems="flex-start"
>
  {/* Left side: Payment */}
  <Stack spacing={1} sx={{ flex: 1 }}>
    <TextField
      label="Monto a Pagar"
      type="number"
      size="small"
      onChange={handleChangeAmount}
      fullWidth
    />
    <Button
      variant="contained"
      color="secondary"
      startIcon={<PaidIcon />}
      onClick={handlePaymentClicked}
      fullWidth
      sx={{ mt: 0.5 }} // small spacing from input
    >
      Pagar
    </Button>
  </Stack>

  {/* Right side: Order Status */}
  <Stack spacing={1} sx={{ flex: 1 }}>
    <FormControl fullWidth size="small">
      <InputLabel id="select-order-status-label">Estado</InputLabel>
      <Select
        labelId="select-order-status-label"
        value={orderStatus}
        onChange={handleChangeOrderStatus}
      >
        <MenuItem value="Pendiente">Pendiente</MenuItem>
        <MenuItem value="A Despachar">A Despachar</MenuItem>
        <MenuItem value="Despachada">Despachada</MenuItem>
        <MenuItem value="Entregada">Entregada</MenuItem>
        <MenuItem value="Completada">Completada</MenuItem>
        <MenuItem value="Cerrada">Cerrada</MenuItem>
      </Select>
    </FormControl>
    <Button
      variant="contained"
      color="primary"
      startIcon={<KeyboardDoubleArrowRightIcon />}
      onClick={handleChangeOrderStatusClicked}
      fullWidth
      sx={{ mt: 0.5 }} // small spacing from select
    >
      Cambiar
    </Button>
  </Stack>
</Stack>
      </Box>
    </Modal>
  );
}

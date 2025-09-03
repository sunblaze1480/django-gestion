import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Divider,
} from "@mui/material";

import { getInvoiceDetails } from "../services/invoicesApi";
import { useAlertsContext } from "../context/AlertsContext";

export function InvoiceDetailPage() {
  const { id } = useParams();
  const [invoice, setInvoice] = useState(null);
  const { openAlert } = useAlertsContext();

  useEffect(() => {
    console.log(id)
    if (id) {
      getInvoiceDetails(id)
        .then((data) => {setInvoice(data);console.log(data)})
        .catch((error) => openAlert(error));
    }
  }, [id, openAlert]);

  if (!invoice) return <Typography>Cargando Factura</Typography>;

  return (
    <Box sx={{ p: 3 }}>
      {/* Invoice Header */}
      <Typography variant="h6" gutterBottom>
        Factura #{invoice.id} - Tipo ({invoice.invoice_type})
      </Typography>
      <Typography variant="body1">Cliente: {invoice.customer}</Typography>
      <Typography variant="body1">Fecha: {invoice.invoice_date}</Typography>

      <Divider sx={{ my: 2 }} />

      {/* Details Table */}
      <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
                <TableCell>Linea</TableCell>
                <TableCell>Producto</TableCell>
                <TableCell>Cant. en Paquete</TableCell>
                <TableCell>Un. Medida</TableCell>
                <TableCell>Cant. Paquetes</TableCell>
                <TableCell align="right">Precio Unitario</TableCell>
                <TableCell align="right">Monto Bruto</TableCell>
                <TableCell align="right">Impuestos</TableCell>
                <TableCell align="right">Monto Neto</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {invoice.details?.map((row) => (
              <TableRow key={row.line_number}>
                <TableCell>{row.line_number}</TableCell>
                <TableCell>{`${row.product.product_id} - ${row.product.product_desc}`}</TableCell>
                <TableCell>{row.quantity_in_package}</TableCell>
                <TableCell>{row.product.unit_of_measure}</TableCell>
                <TableCell>{row.quantity}</TableCell>
                <TableCell align="right">
                  {row.declared_unit_price?.toFixed(2)}
                </TableCell>
                <TableCell align="right">
                  {row.gross_amount?.toFixed(2)}
                </TableCell>
                <TableCell align="right">
                  {row.tax_amount?.toFixed(2)}
                </TableCell>
                <TableCell align="right">
                  {row.net_amount?.toFixed(2)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Totals */}
      <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}>
        <Box>
          <Typography variant="body2">
            Total Bruto: {invoice.total_gross_amount?.toFixed(2) ?? "-"}
          </Typography>
          <Typography variant="body2">
            Total Impuestos: {invoice.total_tax_amount?.toFixed(2) ?? "-"}
          </Typography>
          <Typography variant="subtitle1" fontWeight="bold">
            Total Neto: {invoice.total_net_amount?.toFixed(2) ?? "-"}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

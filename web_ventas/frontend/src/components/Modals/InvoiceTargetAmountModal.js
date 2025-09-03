import React, { useRef } from "react";
import { Modal, Box, TextField, Button, Typography, Stack } from "@mui/material";

export default function InvoiceTargetAmountModal({ open, onClose, confirmAction }) {
  const inputAmount = useRef();

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "background.paper",
          borderRadius: 3,
          boxShadow: 24,
          p: 4,
          width: 400,
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <div class="modalTitle">
            <Typography variant="h6" textAlign="center">
                Facturacion automatica por monto
            </Typography>
        </div>


        <TextField
          inputRef={inputAmount}
          type="number"
          variant="outlined"
          label="Monto a Facturar"
          fullWidth
        />

        <Stack direction="row" spacing={2} justifyContent="flex-end">
          <Button onClick={onClose} color="secondary" variant="outlined">
            Cancelar
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => confirmAction(Number(inputAmount.current.value))}
          >
            OK
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
}
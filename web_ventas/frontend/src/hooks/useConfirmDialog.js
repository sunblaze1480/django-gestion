import { useState } from "react";

export const useConfirmDialog = () => {
  const [confirmDialogState, setConfirmDialogState] = useState({
    isOpen: false,
    message: '',
    onConfirm: null,
  });

  const openConfirmDialog = (message, onConfirm) => {
    setConfirmDialogState({ isOpen: true, message, onConfirm });
  };

  const closeConfirmDialog = () => {    
    setConfirmDialogState({    isOpen: false,
      message: '',
      onConfirm: null });
  };

  return { confirmDialogState, openConfirmDialog, closeConfirmDialog };
};

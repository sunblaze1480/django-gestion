import { useState, useCallback, useMemo } from "react";
import { useAlertsContext } from "../context/AlertsContext";

export const useCrudModal = (refreshData) => {
  const [open, setOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [modeEditCreate, setModeEditCreate] = useState('A'); 
  
  const { handleDataChangeAlert } = useAlertsContext();
  //const { refreshData } = useTableContext();

  const openModal = useCallback((item = null, mode = 'A') => {    
    setEditingItem(item);
    setModeEditCreate(mode);
    setOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setOpen(false);
    setEditingItem(null);
  }, []);

  const handleModalAction = useCallback((status, message) => {
    if (status === 'Success') {
      closeModal();
      refreshData();
    }
    handleDataChangeAlert(status, message);
  }, [closeModal, refreshData, handleDataChangeAlert]);
  
  const refresh = ()=>{
    refreshData()
  }

  // Memoize the state setters to keep them stable
  const memoizedSetOpen = useCallback(setOpen, []);
  const memoizedSetEditingItem = useCallback(setEditingItem, []);

  return useMemo(() => ({ 
    open, 
    setOpen: memoizedSetOpen, 
    editingItem, 
    setEditingItem: memoizedSetEditingItem, 
    modeEditCreate, 
    openModal, 
    closeModal, 
    handleModalAction,
    refresh
  }), [
    open, 
    memoizedSetOpen,
    editingItem, 
    memoizedSetEditingItem,
    modeEditCreate, 
    openModal, 
    closeModal, 
    handleModalAction
  ]);
};
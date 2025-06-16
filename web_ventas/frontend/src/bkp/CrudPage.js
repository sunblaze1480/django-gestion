import React, { useState, useEffect, useContext } from "react";
import { Snackbar, SnackbarContent, IconButton } from "@mui/material"
import { ConfirmDialog } from "../components/ConfirmDialog";
import { useTableActions } from "../hooks/useTableActions";
import { useTableContext } from "../context/TableDataContext";
import { UseEntityConfigurationKeys } from "../hooks/useEntityConfiguration";
import { CrudTableWrapper } from "../components/Wrappers/CrudTableWrapper";
import { CrudModalWrapper } from "../components/Wrappers/CrudModalWrapper";
import { CustomMenuWrapper } from "../components/Wrappers/CustomMenuWrapper";

export function CrudPage({ entity }) {


    const {
        tableData, setTableData, alertOpen, setAlertOpen, alert, setAlert, handleDataChanges, handleSnackbarClose
      } = useTableContext();

    
    const keyField = UseEntityConfigurationKeys(entity)    

    const {
      page,
      rowsPerPage,
      handleChangePage,
      handleChangeRowsPerPage,
      editingItem,
      isModalOpen,
      modeEditCreate,
      handleModalAction,
      handleAddClick,
      handleEditClick,
      handleDeleteClick,
      openModal,
      closeModal,
      confirmDialogState,
      openConfirmDialog,
      closeConfirmDialog,
      confirmDialogDeleteRecord,
    } = useTableActions(entity, handleDataChanges, keyField);
  
    return (
      <div>
        <div className="center">
          <CrudTableWrapper
            entity={entity}
            data={tableData}
            tableActions={{
              page,
              rowsPerPage,
              handleChangePage,
              handleChangeRowsPerPage,
              handleAddClick,
              handleEditClick,
              handleDeleteClick,
            }}
          />
        </div>
        {isModalOpen && editingItem && (
          <CrudModalWrapper
            entity={entity}
            open={isModalOpen}
            onModalClose={closeModal}
            onDatabaseAction={handleModalAction}
            rowData={editingItem}
            mode={modeEditCreate}
          />
        )}
        <div className="center">
          <CustomMenuWrapper entity={entity} />
        </div>
        {confirmDialogState.isOpen && (
          <ConfirmDialog
            open={confirmDialogState.isOpen}
            title={confirmDialogState.message}
            onConfirm={confirmDialogState.onConfirm}
            confirmText="Yes, DELETE"
            cancelText="No, CANCEL"
            onClose={closeConfirmDialog}
          />
        )}
        <Snackbar
          open={alertOpen}
          autoHideDuration={6000}
          onClose={handleSnackbarClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        >
          <SnackbarContent severity={alert.severity} message={alert.message} sx={alert.style} />
        </Snackbar>
      </div>
    );
  }
  
import React, { useState } from "react";
import { UseEntityConfigurationDefault, UseEntityConfigurationMessages, UseEntityConfigurationKeys } from "./useEntityConfiguration";
import { callEntityDeleteApi } from "./UseEntityCrudApi";
import { useAlertsContext } from "../context/AlertsContext";
import { useTableContext } from "../context/TableDataContext";

export const useCrudActions = (modal, confirmDialog, entity) => {
        
    const defaultModel = UseEntityConfigurationDefault(entity);
    const confirmDeleteMessage = UseEntityConfigurationMessages(entity, 'confirmDelete');
    const deleteSuccessMessage = UseEntityConfigurationMessages(entity, 'deletedEntity');
    const keyField = UseEntityConfigurationKeys(entity)        
    
    const handleAddClick = () => modal.openModal(defaultModel, 'A');

    const handleEditClick = (item) => 
      {
        console.log("Edit Click")
        modal.openModal(item, 'U')

      };
  

    const handleDeleteClick = (item) => {        
      confirmDialog.openConfirmDialog(
        `${confirmDeleteMessage} ${item[keyField]}?`,
        async () => {
          try {
            await callEntityDeleteApi(entity, item[keyField]);            
            modal.handleModalAction("Success", `${deleteSuccessMessage} ${item[keyField]}`)
          } catch (error) {
            modal.handleModalAction('Error', error.message);
          } finally {
            confirmDialog.closeConfirmDialog();
          }
        }
      );
    };
    return {        
        handleAddClick,
        handleEditClick,
        handleDeleteClick,        
    }
}
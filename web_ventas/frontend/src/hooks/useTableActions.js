import { usePagination } from "./usePagination";
//import { useModal } from "./useModal";
import { useConfirmDialog } from "./useConfirmDialog";
import { callEntityDeleteApi } from "./UseEntityCrudApi";
import { UseEntityConfigurationMessages, UseEntityConfigurationDefault } from "./useEntityConfiguration";

export const useTableActions = (entity, handleDataChanges, keyField) => {
  const pagination = usePagination();
  //const modal = useModal();
  const confirmDialog = useConfirmDialog();

  const defaultModel = UseEntityConfigurationDefault(entity);
  const confirmDeleteMessage = UseEntityConfigurationMessages(entity, 'confirmDelete');
  const deleteSuccessMessage = UseEntityConfigurationMessages(entity, 'deletedEntity');

  const handleAddClick = () => modal.openModal(defaultModel, 'A');

  const handleEditClick = (item) => modal.openModal(item, 'U');

  const handleModalAction =(status, message)=>{
    //Only close modal if is OK        
    if (status==='Success'){
      modal.closeModal();
    }
    handleDataChanges(status, message)
  }

  const handleDeleteClick = (item) => {
    confirmDialog.openConfirmDialog(
      `${confirmDeleteMessage} ${item[keyField]}?`,
      async () => {
        try {
          await callEntityDeleteApi(entity, item[keyField]);
          handleDataChanges('Success', `${deleteSuccessMessage} ${item[keyField]}`);
        } catch (error) {
          handleDataChanges('Error', error.message);
        } finally {
          confirmDialog.closeConfirmDialog();
        }
      }
    );
  };

  return {
    ...pagination,
    ...modal,
    ...confirmDialog,
    handleModalAction,
    handleAddClick,
    handleEditClick,
    handleDeleteClick,
  };
};

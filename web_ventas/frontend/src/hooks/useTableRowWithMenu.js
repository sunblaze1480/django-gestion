import React, { useCallback, useMemo } from "react";

export const useTableRowWithMenu = ({ columnSet, RowMenuComponent, rowMenuProps }) => {
  const renderRowMenu = useCallback(
    (params) => (
      <RowMenuComponent
        row={params.row}
        {...rowMenuProps}
      />
    ),
    [RowMenuComponent, rowMenuProps]
  );

  const columns = useMemo(
    () => [
      ...columnSet,
      {
        field: "actions",
        headerName: "Acciones", 
        width: 100,
        sortable: false,
        renderCell: renderRowMenu,
      },
    ],
    [columnSet, renderRowMenu]
  );

  return columns;
};

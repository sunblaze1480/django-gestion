import React, { useState } from "react";
import { DataGrid, GridToolbar, useGridApiRef } from '@mui/x-data-grid';
import { containerStyles, dataGridStyles } from "../styles/generalStyles";
import { useTheme } from '@emotion/react';


export const GenericTable = React.memo(({ data, columnSet, containerHeight = "50vh" }) => {

  const [pageSize, setPageSize] = useState(25);

  const detailData = data || [];

  const theme = useTheme();

  return (

    <div style={{ ...containerStyles(theme), height: containerHeight }}>
      <DataGrid
        rows={detailData}
        columns={columnSet}
        pageSize={pageSize}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        rowHeight={38}
        sx={dataGridStyles}
        initialState={{
          ...detailData.initialState,
          pagination: { paginationModel: { pageSize: 25 } },
        }}
        rowsPerPageOptions={[10, 25, 50]}
        filterMode="client"
        components={{ Toolbar: GridToolbar }}
      />
    </div>

  )
},
  (prevProps, nextProps) => {
    // Only re-render if the 'data' prop changes
    return prevProps.data === nextProps.data;
  })
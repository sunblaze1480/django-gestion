import React, { useState, useEffect, useMemo } from "react";
import {  Paper, TableContainer  } from "@mui/material";
import { DataGrid, GridToolbar, useGridApiRef } from '@mui/x-data-grid';
import { useEntityConfiguration } from '../hooks/useEntityConfiguration';


export const GenericTable = React.memo(({ data, columnSet, containerHeight = "70vh" }) => {

  const [pageSize, setPageSize] = useState(25);
          
  const detailData = data || [];     
  
  console.log("render")
  return (
    <Paper elevation="12">
    <div style={{ height:containerHeight, width: '100%' }}>                 
        <DataGrid          
          rows={detailData}          
          columns={columnSet}
          pageSize={pageSize}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          rowHeight={38}
          initialState={{
            ...detailData.initialState,
            pagination: { paginationModel: { pageSize: 25 } },
          }}
          rowsPerPageOptions={[10, 25, 50]}
          filterMode="client"
          components={{ Toolbar: GridToolbar }}          
        />
    </div>
    </Paper>
  )
},
 (prevProps, nextProps) => {
  // Only re-render if the 'data' prop changes
  return prevProps.data === nextProps.data;
})
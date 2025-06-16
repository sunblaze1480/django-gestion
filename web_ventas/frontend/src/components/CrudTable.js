import React from "react";
import { Typography, Table, TableRow, TableHead, TableCell, TableBody, Paper, IconButton } from "@mui/material";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import { usePagination } from "../hooks/usePagination";

export function CrudTable({ data, columns, rowMenu }) {


  const {page, rowsPerPage, handleChangePage, handleChangeRowsPerPage} = usePagination();
  
  const getValueFromJson = (obj, path) => {
    return path.split('.').reduce((acc, key) => {
      return acc && acc[key] !== undefined ? acc[key] : '';
    }, obj);
  };

  return (
    
      <Paper elevation='12'>
        <TableContainer sx={{  maxHeight: 650 }}>
          <Table  size="large" class='styled-table'>
            <TableHead class='table-head'>
              <TableRow>
                {columns.map((column) => (
                  <TableCell key={column.field} class={column.className} >
                    {column.headerName}
                  </TableCell>
                ))}
                <TableCell class='table-cell'>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.length > 0 ? (
                data.slice(page * rowsPerPage, (page + 1) * rowsPerPage).map((row) => (
                  <TableRow key={row.id} class='table-row'>
                    {columns.map((column) => (
                      <TableCell key={column.field} class={column.className}>
                        {getValueFromJson(row, column.field) || 'N/A'}
                      </TableCell>
                    ))}                    
                        {rowMenu ? rowMenu(row) : null}                    
                  </TableRow>
                ))
              ) : ""}
            </TableBody>
          </Table>
        </TableContainer>
        <div class='table-footer'>
            <TablePagination
              optionsPerPage={[10, 25, 50]}
              component='div'
              count={data.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </div>
      </Paper>    
  );
}

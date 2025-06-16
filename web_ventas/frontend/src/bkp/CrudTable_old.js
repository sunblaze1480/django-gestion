import React from "react";
import { Typography, Table, TableRow, TableHead, TableCell, TableBody, Paper, IconButton } from "@mui/material";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';

export function CrudTable({ data, columns, tableActions, entity }) {
  return (
    <div className='center'>
      <Paper elevation='12'>
        <Typography variant='h4' component='h4'>
          {entity}
        </Typography>
        <TableContainer>
          <Table sx={{ minWidth: 650, maxWidth: 650 }} size="large" class='styled-table'>
            <TableHead class='table-head'>
              <TableRow>
                {columns.map((column) => (
                  <TableCell key={column.field} class={column.className}>
                    {column.header}
                  </TableCell>
                ))}
                <TableCell class='table-cell-smaller'>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.length > 0 ? (
                data.slice(tableActions.page * tableActions.rowsPerPage, (tableActions.page + 1) * tableActions.rowsPerPage).map((row) => (
                  <TableRow key={row.id} class='table-row'>
                    {columns.map((column) => (
                      <TableCell key={column.field} class={column.className}>
                        {row[column.field]}
                      </TableCell>
                    ))}
                    <TableCell class='table-cell-smaller'>
                      <IconButton onClick={() => tableActions.handleEditClick(row)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton onClick={() => tableActions.handleDeleteClick(row)}>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              ) : ""}
            </TableBody>
          </Table>
          <div class='table-footer'>
            <IconButton onClick={() => tableActions.handleAddClick()}>
              <AddCircleIcon style={{ color: '#5156bd', fontSize: 45 }} />
            </IconButton>
            <TablePagination
              optionsPerPage={[10, 25, 50]}
              component='div'
              count={data.length}
              rowsPerPage={tableActions.rowsPerPage}
              page={tableActions.page}
              onPageChange={tableActions.handleChangePage}
              onRowsPerPageChange={tableActions.handleChangeRowsPerPage}
            />
          </div>
        </TableContainer>
      </Paper>
    </div>
  );
}

import { useState } from "react";

export const usePagination = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);

  const handleChangePage = (_, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => setRowsPerPage(event.target.value);

  return { page, rowsPerPage, handleChangePage, handleChangeRowsPerPage };
};
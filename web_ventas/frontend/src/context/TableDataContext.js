import React, { useState, useContext, createContext, useEffect } from 'react';
import { alertStyles } from '../styles/generalStyles';

const TableDataContext = createContext();

export function useTableContext() {
  return useContext(TableDataContext);
}

export const TableDataProvider = ({ getData, children }) => {
  const [tableData, setTableData] = useState([]);

  // Fetch initial data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getData();
        setTableData(data);
      } catch (error) {
        handleDataChanges('Error', 'Failed to load data');
      }
    };

    fetchData();
  }, [getData]);

  

  // Refresh data (can be used elsewhere if needed)
  const refreshData = async () => {
    try {
      const data = await getData();
      setTableData(data);
    } catch (error) {
      console.error("Error fetching data after operation:", error);
    }
  };



  return (
    <TableDataContext.Provider
      value={{
        tableData,
        setTableData,        
        refreshData,        
      }}
    >
      {children}
    </TableDataContext.Provider>
  );
};

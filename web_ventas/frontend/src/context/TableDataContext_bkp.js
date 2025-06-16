import React, { useState, useContext, createContext, useEffect } from 'react'
import { alertStyles } from '../styles/generalStyles';


const TableDataContext = createContext();

export function useTableContext() {
    return useContext(TableDataContext)
}
export const TableDataProvider = ({getData, children})=> {
    const [tableData, setTableData] = useState([]);
    const [alertOpen, setAlertOpen]  = useState(false);
    const [alert, setAlert] = useState({
        severity: 'success',
        message: '',
        style: 'success'
    });
    
    useEffect(() => {
        getData().then((data) => {            
            setTableData(data);
        });
    }, [getData]);


    const handleDataChanges = (status, msg) => {
        
        let newStyle;
        const messageString = typeof msg === 'object' ? JSON.stringify(msg) : msg
           
        if (status === 'Success'){
            getData().then((data)=>{
                setTableData(data);
            })
            newStyle = alertStyles.success     
        }else {
            newStyle = alertStyles.error
        }
        setAlert({severity: status, message: messageString, style: newStyle});   
        setAlertOpen(true);
        
    }
    const handleSnackbarClose =()=>{
        setAlertOpen(false);
    }
        
    return (
        <TableDataContext.Provider value={{
            tableData, setTableData, alertOpen, setAlertOpen, handleSnackbarClose, alert, setAlert, handleDataChanges}}>
            {children}
        </TableDataContext.Provider>
    )
}
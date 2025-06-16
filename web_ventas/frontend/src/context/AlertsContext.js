import React, { useState, useContext, createContext } from 'react';
import { alertStyles } from '../styles/generalStyles';

const AlertsContext = createContext();

export function useAlertsContext(){
    return useContext(AlertsContext);
}

export const AlertsContextProvider = ({children}) => {    
    const [alert, setAlert] = useState({
        open: false,
        severity: 'success',
        message: '',
        style: 'success',
    });

    const openAlert = (status, message ) => {
        
        setAlert({open:true, severity: status, message: message, style: getAlertStyle(status)})        
    }

    const closeAlert = () => [
        setAlert((prev) =>({...prev, open:false}))
    ]

    const handleDataChangeAlert = (status, msg) => {
        const messageString = typeof msg === 'object' ? JSON.stringify(msg) : msg;
        const newStyle = getAlertStyle(status);    
        setAlert({ open: true, severity: status, message: messageString, style: newStyle });        

      };
    
      // Get the style based on the status
      const getAlertStyle = (status) => {
        const param = status.toUpperCase()
        return param === 'SUCCESS' ? alertStyles.success : alertStyles.error;
      };

      return (
        <AlertsContext.Provider value={{ openAlert, closeAlert, alert, handleDataChangeAlert}}>
            {children}
        </AlertsContext.Provider>
      )
}
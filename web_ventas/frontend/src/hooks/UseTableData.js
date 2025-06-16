import React, { useState, useEffect } from 'react';

export const UseTableData = (getData) => {
    const [tableData, setTableData] = useState([])
    const [dataChanges, setDataChanges] =  useState(true)

    useEffect(()=> {
        if (dataChanges){
            getData()
            .then((data)=>setTableData(data))
            .catch((err)=>(console.error(err)))
        }
        setDataChanges(false)
    }, [dataChanges])

    const refreshData = () => {
        /*getData()
            .then((data)=>setTableData(data))
            .catch((err)=>(console.error(err)))*/
        setDataChanges(true)
    }

    return {
        tableData,
        dataChanges,
        setDataChanges,
        refreshData
    }
}
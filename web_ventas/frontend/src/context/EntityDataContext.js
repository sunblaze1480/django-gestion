import React, {useState, useContext, createContext, useEffect} from 'react'

const EntityDataContext = createContext();

export function UseEntityDataContext() {
    return useContext(EntityDataContext)
}

export const EntityDataProvider =({data, children})=> {
    const [entityData, setEntityData] = useState(data)

    return (
        <EntityDataContext.Provider value={{entityData, setEntityData}}>
            {children}
        </EntityDataContext.Provider>
    )
}
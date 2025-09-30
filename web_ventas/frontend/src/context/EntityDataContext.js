import React, {useState, useContext, createContext, useEffect} from 'react'

//We create the context
const EntityDataContext = createContext();

//Use X Context that invokes useContext() with the context we just created
export function UseEntityDataContext() {
    return useContext(EntityDataContext)
}


//The provider that rueturns the things
export const EntityDataProvider =({data, children})=> {
    const [entityData, setEntityData] = useState(data)

    return (
        <EntityDataContext.Provider value={{entityData, setEntityData}}>
            {children}
        </EntityDataContext.Provider>
    )
}
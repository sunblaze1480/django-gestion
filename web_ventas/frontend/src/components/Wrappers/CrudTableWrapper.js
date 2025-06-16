import React from 'react'
import { CrudTable } from '../CrudTable'
import { useEntityConfiguration } from '../../hooks/useEntityConfiguration'


export function CrudTableWrapper ({data, entity, tableActions}) {    

    const {columnSet, title} = useEntityConfiguration(entity);

    return (
            <CrudTable data={data} columns={columnSet} tableActions={tableActions} entity={title}></CrudTable>
    )
}
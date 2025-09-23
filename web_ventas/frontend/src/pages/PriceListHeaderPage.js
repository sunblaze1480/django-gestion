import React, {useState} from 'react'
import { Button, Box, Typography, MenuItem, Paper, Select } from '@mui/material';
import { useTableContext } from '../context/TableDataContext';
import { getPriceListsDetails, callUploadPriceList } from '../services/priceListApi';
import {useAlertsContext} from '../context/AlertsContext'
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { GenericTable } from '../components/GenericTable';
import { useEntityConfiguration, UseEntityConfigurationKeys } from '../hooks/useEntityConfiguration';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

export const PriceListHeaderPage = () => {
        
    const entity = "priceListDetail"
    const {columnSet, title} = useEntityConfiguration(entity);   
    const keyField = UseEntityConfigurationKeys(entity); 

    const MenuProps = {
      PaperProps: {
        style: {
          maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
          width: 400,
        },
      },
    };

    const {
        tableData, setTableData, refreshData
      } = useTableContext();              
    //const rows = tableData.map((item, index) => ({ ...item, id: item[keyField] }))
    
    const [priceList, setPriceList] = useState({})
    const [detailData, setDetailData] = useState([])
    

    
    const handleSelectionChange = (event) => {
        const {
          target: { value },
        } = event; 
        console.log(value);    
        setPriceList(value);
        getPriceListsDetails(value.id).then((data)=>{
            console.log(data);
            const updatedData = data.price_list_detail.map((item, index) => ({ ...item, id: index }));
            setDetailData(updatedData); }).catch((err)=>console.log(err))
      };
     
            
    return (
        <div>
            <Typography variant="h6" component="h6" className='header-title'>
                Listas de Precios
            </Typography>
            <hr></hr>            
                <Paper elevation="12" sx={{ width: 700, marginBottom: '1%', padding: '1%', display:'flex' }}>                   
                    <div class = 'flex-elements'>
                        <p>Seleccione una lista de precios: </p>
                        <Select
                            value={priceList}
                            onChange={handleSelectionChange}
                            labelId="price-list-select"
                            id="price-list-select"                    
                            MenuProps={MenuProps}
                            sx={{ minWidth: 200 }}
                            variant='standard'
                        >
                            {tableData? tableData.map((row)=> (
                            <MenuItem 
                                key={row.id}
                                value={row}
                            >
                                {row.name}
                            </MenuItem>   
                        )) : ""
                    }
                        </Select> 
                    </div>                 
                    <div class = 'flex-elements'>
                        <Typography variant="h6" component="h6"><span >Desc: </span>{priceList.description? priceList.description: ""}</Typography>
                        <Typography variant="h6" component="h6"><span >Tipo: </span>{priceList.type? priceList.type : ""}</Typography>
                        <Typography variant="h6" component="h6"><span>Categoria: </span>{priceList.category? priceList.category : ""}</Typography>
                    </div>
                </Paper>            
            <div>
                {priceList ? (
                <div class="center" >        
                    <GenericTable                                                    
                        columnSet={columnSet}
                        data={detailData}     
                        containerHeight="60vh"
                        keyField={keyField}
                         
                    /> 
                </div>
                )
                : " " } 
            </div>
            <hr></hr>
            <div>
                <Button href='/pricelists/create'
                        variant="outlined"
                        startIcon={<AddCircleIcon />} 
                    >
                    Crear/Actualizar                        
                </Button> 
            </div>                           

        </div>
    )
}
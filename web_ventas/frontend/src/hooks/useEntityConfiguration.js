import React, {useMemo} from "react";
import { defaultCustomer, defaultProduct, defaultSalesHeader, defaultSalesOrder, defaultPriceList, defaultInvoiceHeader } from "../schemas/defaultModels";

const entityDefaults = {
    customers: defaultCustomer,
    products: defaultProduct,
    salesHeader: defaultSalesHeader,
    salesOrder: defaultSalesOrder,
    priceList: defaultPriceList,
    invoiceHeader: defaultInvoiceHeader
}

const entityColumnSets = {
    customers : [   
        { field: 'customer_id', headerName: 'ID Cliente', width:120, className: 'table-cell-smaller' },
        { field: 'name', headerName: 'Nombre', width:220 , className: 'table-cell' },
        { field: 'cust_account', headerName: 'Cuenta Cliente', width:180,  className: 'table-cell' },
        { field: 'tax_id', headerName: 'CUIT', width:250, className: 'table-cell' },
        { field: 'address', headerName: 'Direccion',  width:280 , className: 'table-cell' },
        { field: 'phone', headerName: 'Telefono', width:250 , className: 'table-cell' }, 
        { field: 'email', headerName: 'Email', width:250 , className: 'table-cell' }
    ],
    products : [
        { field: 'product_id', headerName: 'Codigo producto', width:180 ,  className: 'table-cell-smaller' },
        { field: 'product_desc', headerName: 'Descripcion', width:440 , className: 'table-cell-large' },
        { field: 'unit_price', headerName: 'Precio Unidad', width: 180 ,className: 'table-cell' },
        { field: 'units_quantity', headerName: 'Cant en Paquete', width: 200 , className: 'table-cell' },
        { field: 'unit_of_measure', headerName: 'Unidad Medida', width: 200 , className: 'table-cell-smaller' },
        { field: 'stock_quantity', headerName: 'Cant. en Stock', width: 200 , className: 'table-cell-smaller' },
        { field: 'category' , headerName: 'Categoria', width: 150, className: 'table-cell-smaller'}          
    ],
    salesHeader: [
        {field: 'id', headerName:'N° Venta', width: 250, valueGetter: (params) => params.row?.id },
        {field: 'customer.customer_id', headerName:'Id Cliente', width: 120,   valueGetter: (params) => params.row?.customer?.customer_id},
        {field: 'customer.name', headerName:'Nombre Cliente', width: 180, valueGetter: (params) => params.row?.customer?.name},
        {field: 'customer.address', headerName:'Direccion', width: 380, valueGetter: (params) => params.row?.customer?.address},
        {field: 'order_date', headerName:'Fecha', width: 200},
        {field: 'order_status', headerName:'Estado', width: 120},
        {field: 'total_amount', headerName:'Monto Total', width: 120},
        {field: 'paid_amount', headerName:'Monto Pagado', width: 120},
    ],
    priceListDetail:[
        {field: 'product_code', headerName:'Cod Producto', width: 250},
        {field: 'product_description', headerName:'Descripcion', width: 480},
        {field: 'product_price', headerName:'Precio', width: 250},
        {field: 'packaging', headerName:'Empaquetado', width: 250},
        {field: 'units_per_package', headerName:'Cant x Paquete', width: 250},
    ],
    priceListHeader:[
        {field: 'id', headerName:'ID Lista', className: 'table-cell-smaller'},
        {field: 'name', headerName:'Nombre Lista', className: 'table-cell-smaller'},
        {field: 'description', headerName:'Descripcion', className: 'table-cell'},
        {field: 'type', headerName:'Tipo Lista', className: 'table-cell'},
    ],
    advancedPricing:[
        {field:'id', headerName:'id', width: 250},
        {field:'product', headerName:'Cod Producto', width: 250},
        {field:'price_type', headerName: 'Descripcion/Tipo',width: 480},
        {field: 'unit_price', headerName: 'Precio', width: 250},
        {field: 'date_updated', headerName: 'Fecha de actualizacion', width: 250}
    ],
    advancedPricingModal:[
        {field:'price_type', headerName: 'Descripcion/Tipo',width: 400},
        {field: 'unit_price', headerName: 'Precio', width: 250},
        {field: 'date_updated', headerName: 'Fecha de actualizacion', width: 250},        
    ],
    invoiceHeader:[
        {field: 'id', headerName: 'id', width: 30},
        {field: 'invoice_type', headerName: 'Tipo Fact.', width: 60},
        {field: 'customer.customer_id', headerName:'Id Cliente', width: 120,   valueGetter: (params) => params.row?.customer?.customer_id},
        {field: 'customer.name', headerName:'Nombre Cliente', width: 180, valueGetter: (params) => params.row?.customer?.name},
        {field: 'customer.address', headerName:'Direccion', width: 300, valueGetter: (params) => params.row?.customer?.address},
        {field: 'invoice_date', headerName: 'Fecha Factura', width: 120},
        {field: 'total_gross_amount', headerName: 'Total Bruto', width: 200},
        {field: 'total_tax_amount', headerName: 'Total Impuestos', width: 200},
        {field: 'total_net_amount', headerName: 'Total Neto', width: 200},
    ]
}

const entityKeys = {
    customers : 'customer_id',
    products: 'product_id',
    salesHeader: 'id',
    salesDetail: 'sales_header.id',
    advancedPricing: '',
    invoiceHeader: 'id',
    invoiceDetail:'invoice_header.id'
}


const entityMessages = {
    customers:
    {
        deletedEntity : 'Borrado Cliente codigo: ',
        confirmDelete : 'Confirma eliminar el cliente: '
    },
    products:
    {
        deletedEntity : 'Borrado Producto codigo: ',
        confirmDelete : 'Confirma eliminar el Producto: '
    },
    advancedPricing: 
    {
        created: 'Nuevo Precio cargado',
        deleted: 'Eliminado Precio'
    }
}

const titles = {
    customers: 'Clientes',
    products: 'Productos',
    invoiceHeader:'Facturas'
}

export function useEntityConfiguration(entity) {
    const result = useMemo(() => {
        const columnSet = entityColumnSets[entity];
        const title = titles[entity];
        return {columnSet, title};
    }, [entity]);

    return result;
}

export function UseEntityConfigurationMessages(entity, message){    
    console.log(entity)
    if (entity)
    {        
        const retMessage = entityMessages[entity][message]                
        if (retMessage != undefined){
            return retMessage
        }        
    }
    return " "    
}

export function UseEntityConfigurationKeys(entity){
    console.log("entity")
    if (entity)
    {
        const key = entityKeys[entity]
        if (key != undefined){
            return key
        }        
    }
    return " "      
}

export function UseEntityConfigurationDefault(entity){
    if (entity)
    {
        const def = entityDefaults[entity]
        if (def){
            return def
        }else {console.log(`No se encuentra default para ${entity}`)}
    }
}
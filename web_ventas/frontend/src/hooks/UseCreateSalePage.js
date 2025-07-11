import React, { useEffect, useState } from 'react'
import { getCustomerData } from '../services/customersApi';
import { getProductData, getAdvancedPricing } from '../services/productsApi';
import { createSale } from '../services/salesApi';
import { defaultSalesOrder } from '../schemas/defaultModels';
import { useTableContext } from '../context/TableDataContext';
import { useAlertsContext } from '../context/AlertsContext';


export const UseCreateSalePage =() => {

    const RATE_IVA = 0.21


    const [customerData, setCustomerData] = useState([]);
    const [productData, setProductData] = useState([]);    
    const [salesOrder, setSalesorder] = useState(defaultSalesOrder); 
    const [advancedPricing, setAdvancedPricing] = useState([])
        
    const { openAlert, closeAlert, alert, handleDataChangeAlert} = useAlertsContext();
    const { tableData, setTableData, refreshData} = useTableContext();

    const handleDataChanges = () => {
        handleDataChangeAlert("Success", "Venta Creada!")
        refreshData()
    }

    useEffect(()=>{
        getCustomerData().then((data)=>(setCustomerData(data))).catch((error)=>console.error("ERROR FETCHING CUSTOMER DATA"));
        getProductData().then((data)=>(setProductData(data))).catch((error)=>console.error("ERROR FETCHING PRODUCT DATA"))
    }, [])


    const updatePriceAndTotal = (prevSalesOrder, price, index) => {
    
        const updatedDetail = [...prevSalesOrder.order_detail];        
        updatedDetail[index].unit_price = parseFloat(price);            
        updatedDetail[index].amount = updatedDetail[index].unit_price*updatedDetail[index].quantity;
        updatedDetail[index].subtotal_tax = updatedDetail[index].amount * RATE_IVA
        updatedDetail[index].subtotal_net = updatedDetail[index].amount + updatedDetail[index].subtotal_tax

        const totalAmount = updatedDetail.reduce((a, {amount})=> a+amount, 0);
        const totalTax = updatedDetail.reduce((a,{subtotal_tax})=> a+subtotal_tax, 0)
        const totalNet = updatedDetail.reduce((a,{subtotal_net})=> a+subtotal_net, 0)

        return {...prevSalesOrder, order_detail: updatedDetail, total_amount: totalAmount, total_tax: totalTax, total_net: totalNet }
    }

    const handleCustomerChange = (event, newValue) =>{
        setSalesorder((prevSalesOrder)=>({...prevSalesOrder, customer : newValue && newValue.customer_id !== undefined ? newValue.customer_id:null}));                
    }

    const handleAddProduct = () => {
        setSalesorder((prevSalesOrder)=>{
            const updatedDetail = [...prevSalesOrder.order_detail];
            updatedDetail.push({product: 0, unit_price: 0, quantity: 1, amount:0});
            return {...prevSalesOrder, order_detail:updatedDetail};
        })
    }

    const handleChangeProduct = (event, newValue, index) => {
         const tax = newValue.unit_price * RATE_IVA

         const detailLine = {
            product : newValue.product_id,
            status: "Pending",    
            quantity: 1,
            amount: newValue.unit_price,
            payment_method: " ",
            driver: " ",
            comments: " ",
            unit_price: newValue.unit_price,
            subtotal_tax: tax,
            subtotal_net: newValue.unit_price + tax
         };                 
        
        setSalesorder((prevSalesOrder)=>{
            const updatedDetail = [...prevSalesOrder.order_detail];
            updatedDetail[index] = detailLine;
            return {...prevSalesOrder, order_detail:updatedDetail};                        
        })        
    }

    const handleRemoveProduct = (event, index) => {
        setSalesorder((prevSalesOrder)=> {
            const updatedDetail = [...prevSalesOrder.order_detail]
            updatedDetail.splice(index, 1)
            const totalAmount = updatedDetail.reduce((a,{amount})=>a+amount, 0)
            const totalTax = updatedDetail.reduce((a,{subtotal_tax})=> a+subtotal_tax, 0)
            const totalNet = updatedDetail.reduce((a,{subtotal_net})=> a+subtotal_net, 0)
            return {...prevSalesOrder, order_detail: updatedDetail, total_amount: totalAmount, total_tax: totalTax, total_net: totalNet }

        })
    }

    const handleQuantityChange = (event, index) => {
        setSalesorder((prevSalesOrder)=>{            
                        
            const updatedDetail = [...prevSalesOrder.order_detail];
            updatedDetail[index].quantity=event.target.value;
            updatedDetail[index].amount = updatedDetail[index].unit_price*updatedDetail[index].quantity;
            updatedDetail[index].subtotal_tax = updatedDetail[index].amount * RATE_IVA
            updatedDetail[index].subtotal_net = updatedDetail[index].amount + updatedDetail[index].subtotal_tax

            const totalAmount = updatedDetail.reduce((a, {amount})=> a+amount, 0);
            const totalTax = updatedDetail.reduce((a,{subtotal_tax})=> a+subtotal_tax, 0)
            const totalNet = updatedDetail.reduce((a,{subtotal_net})=> a+subtotal_net, 0)

                        
            return {...prevSalesOrder, order_detail: updatedDetail, total_amount: totalAmount, total_tax: totalTax, total_net: totalNet}
        })
    }

    const handlePriceChange =(event, index) =>{
        const {value} = event.target * 1
        setSalesorder((prevSalesOrder)=> 
            updatePriceAndTotal(prevSalesOrder, value, index)
        )
    }

    const filterEmptyRows = (obj) => {
        if ("product" in obj && obj.product > 0)
        {
            return true;
        }        
        return false;
    }

    const handleSaveClick = () => {
        setSalesorder((prevSalesOrder)=>{
            const cleanedDetail = salesOrder.order_detail.filter(filterEmptyRows)
            return {...prevSalesOrder, order_detail: cleanedDetail}            
        })
        //Call API for Create Sale
        createSale(salesOrder).then((response)=>{            
            handleDataChanges('Success', 'Venta creada!');
            setSalesorder(defaultSalesOrder);                        

        }).catch((error)=>{
            alert("error calling Create API")
            console.error("Error calling Create API");            
        })
    }

    const openAdvancedPricing = (index) => {
        //Load the prices for this specific item, only when user WANTS to open the dropdown
        const prod =salesOrder.order_detail[index].product
        if (prod && prod != undefined)
        {
            getAdvancedPricing(prod)
            .then((pricing) => (setAdvancedPricing(pricing)))
            .catch((err) => console.log(err));
        }else {
            console.log("No hay precios configurados")
        }
        
    }

    const handleAdvancedPriceSelect = (event, index) =>{
        console.log(event.target.value)
        const value = event.target.value
        console.log(value)    
        setSalesorder((prevSalesOrder)=> 
            updatePriceAndTotal(prevSalesOrder, value, index)
        )
    }

    return {
        customerData,
        productData,
        salesOrder, 
        advancedPricing,   
        handleCustomerChange,
        handleAddProduct,
        handleChangeProduct,
        handleRemoveProduct,
        handleQuantityChange,
        handlePriceChange,
        handleSaveClick,
        openAdvancedPricing,
        handleAdvancedPriceSelect
    }

}
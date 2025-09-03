import React, { useState, useEffect } from 'react'
import { UseTableData } from '../hooks/UseTableData';
import { defaultInvoiceHeader, defaultInvoiceDetail } from '../schemas/defaultModels';
import { getProductData } from '../services/productsApi'
import { getCustomerData } from '../services/customersApi';
import { createInvoice, invoiceAutomaticGenerator } from '../services/invoicesApi';
import { useAlertsContext } from '../context/AlertsContext';



export const useCreateInvoicePage = () => 
{
    
    const [productData, setProductData] = useState([])
    const [customerData, setCustomerData] = useState([])
    const [invoice, setInvoice] = useState(defaultInvoiceHeader)
    const [targetAmount, setTargetAmount] = useState(0)
    const [targetAmountOpen, setTargetAmountOpen] = useState(false)
    const { alert, openAlert, handleDataChangeAlert} = useAlertsContext();



    useEffect(()=>{
        getCustomerData().then((data)=>setCustomerData(data)).catch((error)=>(console.log("error fetching customer data")))
        getProductData().then((data)=>setProductData(data)).catch((error)=>(console.log("error fetching product data")))
    },[])

    
    const handleCustomerChange = (event, newValue) =>{
        setInvoice((prevInvoice)=>({...prevInvoice, customer : newValue && newValue.customer_id !== undefined ? newValue.customer_id:null}));                
    }
    
    
    const handleAddProduct = () => {
        setInvoice((prevInvoice)=> {
            const updatedDetail = [...prevInvoice.details];
            updatedDetail.push({...defaultInvoiceDetail})
            return {...prevInvoice, details: updatedDetail}
        })        
    }

    const handleChangeProduct = (event, newValue, index) => {        
        const detailLine = {
        product: newValue.product_id,
        declared_unit_price: newValue.unit_price,
        unit_tax_amount: newValue.unit_price * 0.21,
        quantity: 1,
        quantity_in_package: newValue.units_quantity,
        gross_amount: newValue.unit_price * newValue.units_quantity,
        tax_amount: (newValue.unit_price * 0.21) * newValue.units_quantity,
        net_amount: (newValue.unit_price * 1.21) * newValue.units_quantity
        };

    setInvoice((prevInvoice)=>{
        const updatedDetail = [...prevInvoice.details];
        updatedDetail[index] = detailLine;
        const totalAmount = updatedDetail.reduce((a, {gross_amount})=>a+gross_amount,0)
        const totalTax = updatedDetail.reduce((a, {tax_amount})=>a+tax_amount,0)
        const totalNet = updatedDetail.reduce((a, {net_amount})=> a+net_amount,0) 
        return {...prevInvoice, details:updatedDetail, total_gross_amount: totalAmount, total_tax_amount: totalTax, total_net_amount: totalNet};                        
    })        
    }

    const handleChangeQuantity = (event, index) => {
        setInvoice((prevInvoice)=> {
            const updatedDetail = [...prevInvoice.details];
            updatedDetail[index].quantity = event.target.value;
            updatedDetail[index].gross_amount = (updatedDetail[index].declared_unit_price *  updatedDetail[index].quantity_in_package) *  event.target.value;
            updatedDetail[index].tax_amount = updatedDetail[index].unit_tax_amount * event.target.value;
            updatedDetail[index].net_amount = updatedDetail[index].gross_amount + updatedDetail[index].tax_amount
            const totalAmount = updatedDetail.reduce((a, {gross_amount})=>a+gross_amount,0)
            const totalTax = updatedDetail.reduce((a, {tax_amount})=>a+tax_amount,0)
            const totalNet = updatedDetail.reduce((a, {net_amount})=> a+net_amount,0)
            return {...prevInvoice, detail : updatedDetail, total_taxes: totalTax, total_gross: totalAmount, total_net: totalNet}
        })        
    }

    const handlePriceChange = (event, index) => {
        setInvoice((prevInvoice)=> {
            const updatedDetail = [...prevInvoice.details];
            updatedDetail[index].declared_unit_price = event.target.value;
            updatedDetail[index].gross_amount = updatedDetail[index].quantity * (event.target.value *  updatedDetail[index].quantity_in_package);
            updatedDetail[index].unit_tax_amount = event.target.value * 0.21;
            updatedDetail[index].tax_amount = updatedDetail[index].unit_tax_amount * updatedDetail[index].quantity;
            updatedDetail[index].net_amount = updatedDetail[index].subtotal + updatedDetail[index].tax_amount
            const totalAmount = updatedDetail.reduce((a, {gross_amount})=>a+gross_amount,0)
            const totalTax = updatedDetail.reduce((a, {tax_amount})=>a+tax_amount,0)
            const totalNet = updatedDetail.reduce((a, {net_amount})=> a+net_amount,0)
            return {...prevInvoice, detail : updatedDetail, total_taxes: totalTax, total_gross: totalAmount, total_net: totalNet}
        })
    }

    const handleSubmitInvoice = ()=> {
        createInvoice(invoice)
        .then(() => {
            handleDataChangeAlert("Success", "Factura Creada!");
            setInvoice(defaultInvoiceHeader);
        })
        .catch((error) => {
            openAlert('error', "API Response: " + error);
        });
    }

    const invoiceGenerator = (target_amount) => {
        invoiceAutomaticGenerator({customer:invoice.customer, target_amount:target_amount}).then((resp)=>setInvoice(resp)).catch((error)=>openAlert('error', "API Response: "+error))
        setTargetAmountOpen(false)
    }

    const handleClose = () => {
        setTargetAmountOpen(false)
    }
        
    const handleGeneracionAutomaticaClicked = () => {
        setTargetAmountOpen(true)
    }



    return {
        customerData,
        productData,
        invoice,
        targetAmountOpen,
        handleCustomerChange,
        handleAddProduct,
        handleChangeProduct,
        handleChangeQuantity,
        handlePriceChange,
        handleSubmitInvoice,
        handleGeneracionAutomaticaClicked,
        handleClose,
        invoiceGenerator
    }
}
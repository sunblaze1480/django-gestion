import React, { useState } from 'react'
import { UseTableData } from '../hooks/UseTableData';
import { defaultInvoice, defaultInvoiceDetail } from '../schemas/defaultModels';
import { getProductData } from '../services/productsApi'

export const useCreateInvoicePage = () => 
{
    
    const {tableData} = UseTableData(getProductData)
    const [invoice, setInvoice] = useState(defaultInvoice)

    const handleAddProduct = () => {
        setInvoice((prevInvoice)=> {
            const updatedDetail = [...prevInvoice.detail];
            updatedDetail.push({...defaultInvoiceDetail})
            return {...prevInvoice, detail: updatedDetail}
        })        
    }

    const handleChangeProduct = (event, newValue, index) => {        
        const detailLine = {
        product: newValue.product_id,
        unit_price: newValue.unit_price,
        tax_amount: newValue.unit_price * 0.21,
        quantity: 1,
        units_quantity: newValue.units_quantity,
        subtotal: newValue.unit_price * newValue.units_quantity,
        subtotal_tax: newValue.unit_price * 0.21,
        subtotal_net: newValue.unit_price * 0.89
        };

    setInvoice((prevInvoice)=>{
        const updatedDetail = [...prevInvoice.detail];
        updatedDetail[index] = detailLine;
        const totalAmount = updatedDetail.reduce((a, {subtotal})=>a+subtotal,0)
        const totalTax = updatedDetail.reduce((a, {subtotal_tax})=>a+subtotal_tax,0)
        const totalNet = updatedDetail.reduce((a, {subtotal_net})=> a+subtotal_net,0) 
        return {...prevInvoice, detail:updatedDetail, total_gross: totalAmount, total_taxes: totalTax, total_net: totalNet};                        
    })        
    }

    const handleChangeQuantity = (event, index) => {
        setInvoice((prevInvoice)=> {
            const updatedDetail = [...prevInvoice.detail];
            updatedDetail[index].quantity = event.target.value;
            updatedDetail[index].subtotal = (updatedDetail[index].unit_price *  updatedDetail[index].units_quantity) *  event.target.value;
            updatedDetail[index].subtotal_tax = updatedDetail[index].tax_amount * event.target.value;
            updatedDetail[index].subtotal_net = updatedDetail[index].subtotal + updatedDetail[index].subtotal_tax
            const totalAmount = updatedDetail.reduce((a, {subtotal})=>a+subtotal,0)
            const totalTax = updatedDetail.reduce((a, {subtotal_tax})=>a+subtotal_tax,0)
            const totalNet = updatedDetail.reduce((a, {subtotal_net})=> a+subtotal_net,0)
            return {...prevInvoice, detail : updatedDetail, total_taxes: totalTax, total_gross: totalAmount, total_net: totalNet}
        })        
    }

    const handlePriceChange = (event, index) => {
        setInvoice((prevInvoice)=> {
            const updatedDetail = [...prevInvoice.detail];
            updatedDetail[index].unit_price = event.target.value;
            updatedDetail[index].subtotal = updatedDetail[index].quantity * event.target.value;
            updatedDetail[index].tax_amount = event.target.value * 0.21;
            updatedDetail[index].subtotal_tax = updatedDetail[index].tax_amount * updatedDetail[index].quantity;
            updatedDetail[index].subtotal_net = updatedDetail[index].subtotal + updatedDetail[index].subtotal_tax
            const totalAmount = updatedDetail.reduce((a, {subtotal})=>a+subtotal,0)
            const totalTax = updatedDetail.reduce((a, {subtotal_tax})=>a+subtotal_tax,0)
            const totalNet = updatedDetail.reduce((a, {subtotal_net})=> a+subtotal_net,0)
            return {...prevInvoice, detail : updatedDetail, total_taxes: totalTax, total_gross: totalAmount, total_net: totalNet}
        })
    }

    return {
        tableData,
        invoice,
        handleAddProduct,
        handleChangeProduct,
        handleChangeQuantity,
        handlePriceChange,
    }
}
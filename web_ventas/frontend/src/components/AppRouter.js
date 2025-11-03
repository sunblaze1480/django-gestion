import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { TableDataProvider } from "../context/TableDataContext";

import { getCustomerData } from "../services/customersApi";
import { getSalesHeaders } from "../services/salesApi";
import { SalesHeaderPage } from "../pages/SalesHeaderPage";
import { CreateSalePage } from "../pages/CreateSalePage";
import { getPriceListsHeaders } from "../services/priceListApi";

import { ProductsPage } from "../pages/ProductsPage";
import { CustomersPage } from "../pages/CustomersPage";
import { PriceListHeaderPage } from "../pages/PriceListHeaderPage";
import { CreatePriceListPage } from "../pages/CreatePriceListPage";
import { ShipmentsPage } from "../pages/ShipmentsPage";
import { InvoicesPage } from "../pages/InvoicesPage";
import { CreateInvoicePage } from "../pages/CreateInvoicePage";
import { InvoiceDetailPage } from "../pages/InvoiceDetailPage"

export const AppRouter = () => {
return (
<Routes>
        <Route path='/products' element={                                
                <ProductsPage />                                 
        } />                               
        <Route path='/customers' element={
            <TableDataProvider getData={getCustomerData}>
                <CustomersPage/>
            </TableDataProvider>                                
        } />   
            <Route path='/sales/create' element={
            <TableDataProvider getData={getCustomerData}>
                <CreateSalePage />
            </TableDataProvider>                                
        } />                                 
        <Route path='/sales' element={
            <TableDataProvider getData={getSalesHeaders}>
                <SalesHeaderPage></SalesHeaderPage>
            </TableDataProvider>
        }/>
        <Route path='/pricelists/create' element={
            <TableDataProvider getData={getPriceListsHeaders}>
                <CreatePriceListPage></CreatePriceListPage>
        </TableDataProvider>
        }/>
        <Route path='/pricelists' element={
            <TableDataProvider getData={getPriceListsHeaders}>
                <PriceListHeaderPage></PriceListHeaderPage>
        </TableDataProvider>
        }/>
        <Route path='/shipments' element={
            <TableDataProvider getData={getPriceListsHeaders}>
                <ShipmentsPage></ShipmentsPage>
        </TableDataProvider>
        }/>
        <Route path='invoices' element= {
            <InvoicesPage/>
        }/>
        <Route path='invoices/:id' element= {
            <InvoiceDetailPage/>
        }/>
        <Route path='invoices/create' element = {
            <CreateInvoicePage/>
        }/>
    </Routes>
)

}


import React, {Component, useState } from "react";
import {render} from "react-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ClippedDrawer from "./Menus/ClippedDrawer";
import TopNavBar from "./TopNavBar"
import { TableDataProvider } from "../context/TableDataContext";
import { getCustomerData } from "../services/customersApi";
import { getSalesHeaders } from "../services/salesApi";
import { SalesHeaderPage } from "../pages/SalesHeaderPage";
import { CreateSalePage } from "../pages/CreateSalePage";
import { ProductsPage } from "../pages/ProductsPage";
import { CustomersPage } from "../pages/CustomersPage";
import { getPriceListsHeaders } from "../services/priceListApi";
import { PriceListHeaderPage } from "../pages/PriceListHeaderPage";
import { AlertSnackbar } from "./AlertSnackbar";
import { AlertsContextProvider } from "../context/AlertsContext";
import { CreatePriceListPage } from "../pages/CreatePriceListPage";
import { ShipmentsPage } from "../pages/ShipmentsPage";
import { InvoicesPage } from "../pages/InvoicesPage";
import { CreateInvoicePage } from "../pages/CreateInvoicePage";
import { InvoiceDetailPage } from "../pages/InvoiceDetailPage"
import { createTheme, ThemeProvider, CssBaseline } from '@mui/material';
import { AppBreadcrumbs } from "./AppBreadcrumbs";
export default function App () {    

    const [open, setOpen] = useState(false)

        const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        container: {
            main: "#1F1F1F",
            text: "#E0E0E0"
        },
        tableHeader: {
            main: "#2A2A2A"
        }
    },    
    });

    const toggleDrawer = () => {
        setOpen((prevOpen)=> !prevOpen )
    }
        
        return(            
            <ThemeProvider theme={darkTheme}>
                <CssBaseline />
            <div id='app'>

                <AlertsContextProvider>
                    <Router>
                        <TopNavBar open={open} toggleDrawer={toggleDrawer}></TopNavBar>
                        <ClippedDrawer open={open} setOpen={setOpen}></ClippedDrawer>                        
                        <div class='content'>
                            <AppBreadcrumbs/>
                        <div style={{ padding: '0px 24px' }}>
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
                        </div>
                        
                        </div>
                    </Router>
                    <AlertSnackbar>                        
                    </AlertSnackbar>
                </AlertsContextProvider>
            </div>
            </ThemeProvider>
        ); 
    
}
const appDiv = document.getElementById("main");
render(<App />, appDiv);  
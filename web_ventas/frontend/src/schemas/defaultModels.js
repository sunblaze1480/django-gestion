export const defaultCustomer = {
    customer_id : 0,
    name : '',
    cust_account : '',
    tax_id : 0,
    address : '',
    phone : 0,
    email : ''
}
    //States
export const defaultProduct = {
        product_id: 0,
        product_desc: ' ',
        unit_price: 0,
        units_quantity: 0,
        unit_of_measure: ' ',
        stock_quantity: 0
} 

export const defaultSalesHeader = { 
    id: 0,
    order_type: '',
    customer: {},
    order_date: '',
    order_status: '',
    total_amount: 0    
}

export const defaultSalesOrder = {  
        customer: 0,
        order_type: "SO",
        order_date: "2024-01-01",
        order_status: "Pendiente",
        total_amount: 0.0,
        total_tax : 0.0,
        total_net: 0.0,
        order_detail: [
    {            
      product: 0,
      status: " ",    
      quantity: 0.0,
      amount: 0.0,
      payment_method: " ",
      driver: " ",
      comments: " ",
      unit_price: 0,
      subtotal_tax: 0,
      subtotal_net: 0
    }
  ]
}

export const defaultPriceList = {
  id: 0,
  name: " ",
  description: " ",
  type: "",
  price_list_detail: [
      {
          product: 0,
          product_price: "0",
          packaging: "",
          units_per_package: 0
      }
  ]
}

export const defaultInvoiceDetail = {
  
  product: 0,
  unit_price: 0,
  tax_amount:0,
  quantity: 1,
  subtotal:0,
  subtotal_tax: 0,
  subtotal_net: 0

}

export const defaultInvoice = {
    detail:[
      defaultInvoiceDetail
    ], 
    total_gross:0,
    total_taxes: 0,
    total_net: 0
}


import React from "react"

export const useProductsRowMenu = (pricingModal) => {

    const handlePricingClicked = (rowData)=> {
      console.log("clickeaste abrir modal de precios")
      console.log(rowData)
      pricingModal.openModal(rowData, 'A')      
    }
    return {
        handlePricingClicked
    }

}

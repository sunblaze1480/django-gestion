import React, {useState} from "react";
import { getSalesDetails } from "../services/salesApi";

export const useSalesHeaderRowMenu = (detailModal, voucherModal, setDetailData) => {

    const handleViewDetailsClick = (row) => {      
        getSalesDetails(row.id).then((response)=>{
          console.log("Pepito")
          console.log(response)
          setDetailData(response);
          detailModal.openModal();
        }).catch((err)=>{console.log(err)});    
      }
             
      const handleVoucherClick = (row) => {
        getSalesDetails(row.id).then((response)=>{     
          setDetailData(response);                  
          voucherModal(true);
        }).catch((err)=>{console.log(err)});   
      } 
      
      return {
        handleViewDetailsClick,
        handleVoucherClick
      }
}    
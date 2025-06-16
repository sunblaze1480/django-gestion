import React, {useState} from "react";
import { getSalesDetails } from "../services/salesApi";

export const useSalesHeaderRowMenu = (detailModal, voucherModal, setDetailData) => {

    const handleViewDetailsClick = (row) => {      
        getSalesDetails(row.id).then((response)=>{     
          setDetailData(response[0]);  
          detailModal.openModal();                
        }).catch((err)=>{console.log("a")});      
      }
             
      const handleVoucherClick = (row) => {
        getSalesDetails(row.id).then((response)=>{     
          setDetailData(response[0]);                  
          voucherModal(true);
        }).catch((err)=>{console.log(err)});   
      } 
      
      return {
        handleViewDetailsClick,
        handleVoucherClick
      }
}


    
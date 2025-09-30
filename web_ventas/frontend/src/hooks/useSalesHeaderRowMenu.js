import React, {useState} from "react";
import { getSalesDetails } from "../services/salesApi";

export const useSalesHeaderRowMenu = (detailModal, setVoucherOpen, setDetailData) => {

    const handleViewDetailsClick = (row) => {      
        getSalesDetails(row.id).then((response)=>{
          setDetailData(response);
          detailModal.openModal();
        }).catch((err)=>{console.log(err)});    
      }
             
      const handleVoucherClick = (row) => {
        getSalesDetails(row.id).then((response)=>{    
          setDetailData(response);
          console.log(response);               
          setVoucherOpen(true);
        }).catch((err)=>{console.log(err)});
      } 

      return {
        handleViewDetailsClick,
        handleVoucherClick
      }
}    
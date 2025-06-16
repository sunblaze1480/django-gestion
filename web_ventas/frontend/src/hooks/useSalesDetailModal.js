import React, {useState} from 'react'
import { useAlertsContext } from '../context/AlertsContext';
import { changeSalesOrderStatus, MakePayment } from '../services/salesApi';


export const useSalesDetailModal = (entityData, onDataChanges) => {
    const [paymentAmount, setPaymentAmount] = useState(0);
    const [ orderStatus, setOrderStatus] = useState(entityData.order_status || "");
    const { openAlert } = useAlertsContext()

    const handleChangeAmount=(event)=>{   
        setPaymentAmount(event.target.value);
    }

    const handlePaymentClicked =() => {
        if (paymentAmount > 0)
        {            
            MakePayment({order_id:entityData.id, amount:paymentAmount}).then(()=>{
                onDataChanges(entityData.id)
                openAlert("Success", "Pago Procesado" );                 
            }).catch((error)=>(console.error('ERROR')))
        } 
    }

    const handleChangeOrderStatus = (event) => {        
        setOrderStatus(event.target.value)

    }

    const handleChangeOrderStatusClicked = () => {
        const params = {order_id: entityData.id, status: orderStatus }        
        changeSalesOrderStatus(params)
        entityData.order_status= orderStatus;
        onDataChanges(entityData.id)
        openAlert("Success", "Estado modificado" ); 
    }

    return {orderStatus, handleChangeAmount, handlePaymentClicked, handleChangeOrderStatus, handleChangeOrderStatusClicked}
}
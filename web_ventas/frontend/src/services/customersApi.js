const endpoints = {
    'getCustomers': '/api/customers',
    'updateCustomer': `/api/customers/`,
    'removeCustomer': `/api/customers/`,
    'createCustomer': `/api/create-customer/`
}

const messages = {
    'A' : 'Cargado el Cliente codigo: ',
    'U' : 'Actualizado el Cliente codigo: '
}

const getApiProps=( editedData, mode)=>{
    const req = {
      apiurl : '',
      props : {method: '', headers:{ 'Content-Type': 'application/json'}, body: JSON.stringify(editedData)}
    }
    if (mode === 'U') {
      req.apiurl = `${endpoints.updateCustomer}${editedData.customer_id}`;
      req.props.method = 'PATCH'        
    }else{
      req.apiurl = `${endpoints.createCustomer}`;
      req.props.method = 'POST'
    }

    return req;
  }

  //REMOVING PROMISE CONSTRUCTOR ANTIPATTERN, REPLACE IN THE REST 
  export const getCustomerData = async () => {
    try {
        const response = await fetch(endpoints.getCustomers);
        if (!response.ok) {
            throw new Error('Error calling Customers API');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        throw error;
    }
}

export const callUpdateCreateAPI = (editedData, mode) =>{        
    return new Promise(async(resolve, reject)=>{
        const req = getApiProps(editedData, mode );
        let msg = '';
        try{
            const response = await fetch(req.apiurl, req.props);                
            if (response.ok){                                
                msg = `${messages[mode]}${editedData.customer_id}`;
                resolve(msg);
            }  else 
            { 
                console.log("ERROR");
                const errorResponse = await response.json();
                reject(new Error(JSON.stringify(errorResponse)));  
            }        
        }catch(error){
            reject(error);
        }        
})}

export const callDeleteApi = (customer_id) =>{
    return new Promise(async(resolve, reject)=>{
      try{
       const response = await fetch(`${endpoints.removeCustomer}${customer_id}`, { 
          method: 'DELETE',
          headers: {'Content-type':'Application/JSON'}
        })          
        if (response.ok){
            const resp = await response.json();
            console.log(response);
            resolve(response.message);
        }  else
        {
          console.log(response);
          reject("Error calling delete API");
        }          
      }catch(error)
      {
        console.log(error.message);
        reject(error);
      }
     })
  }



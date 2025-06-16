const getProductsEndpoint = '/api/get-products';

const endpoints = {
    'getProducts': 'api/get-products',
    'updateProduct': `/api/update-product/`,
    'removeProduct': `/api/delete-product/`,
    'massUpdate': `/api/products/massupdate`,
    'getAdvancedPricing': `/api/products/advancedPricing/`,
    'getPricingTypes': `/api/products/pricingTypes`,
    'addAdvancedPricing': `/api/products/advancedPricing`
}



const messages = {
    'A' : 'Cargado el producto codigo: ',
    'U' : 'Actualizado el producto codigo: '
}

const getApiProps=( editedData, mode)=>{
    const req = {
      apiurl : '',
      props : {method: '', headers:{ 'Content-Type': 'application/json'}, body: JSON.stringify(editedData)}
    }
    if (mode === 'U') {
      req.apiurl = `/api/update-product/${editedData.product_id}`;
      req.props.method = 'PUT'        
    }else{
      req.apiurl = `/api/create-product`;
      req.props.method = 'POST'
    }

    return req;
  }

export const getProductData = () => {
    return new Promise(async(resolve, reject)=>{
        try {
            const response = await fetch(getProductsEndpoint)
            if (response.ok){
                const data = await response.json();                
                resolve(data);
            }else{
                throw new Error('Error calling Products API')
            }            
        }
        catch(e){
            reject(e);
        }
    })
}

export const callUpdateCreateAPI = (editedData, mode) =>{        
    return new Promise(async(resolve, reject)=>{
        const req = getApiProps(editedData, mode );
        let msg = '';
        try{
            const response = await fetch(req.apiurl, req.props);                
            if (response.ok){                                
                msg = `${messages[mode]}${editedData.product_id}`;                
                resolve(msg);
            }  else 
            {
                const errorResponse = await response.json();                
                console.log(errorResponse)
                reject(new Error(JSON.stringify(errorResponse)));  
            }        
        }catch(error){
            console.log(error);
            reject(error);
        }        
})}

export const callDeleteApi = (product_id) =>{
    return new Promise(async(resolve, reject)=>{
      try{
       const response = await fetch(`${endpoints.removeProduct}${product_id}`, { 
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

  export const callMassUpdate = (product_list) => {
    
    return new Promise(async(resolve, reject)=> {
      const props = { method: 'POST', 
                headers: {'Content-Type': 'application/json'},
                body : JSON.stringify(product_list)}
      try{
          const response = await fetch(endpoints.massUpdate, props)
          if (response.ok){
            resolve(response.message)
          }else
          {            
            reject(response.error)
          }          
      }
      catch(error)
      {
        console.log(error)
        reject(error.message)
      }
    })
}

export const getAdvancedPricing = (product_id) => {
    
  return new Promise(async(resolve, reject)=> {
    const url = `${endpoints.getAdvancedPricing}?product_id=${encodeURIComponent(product_id)}`;
    const props = { method: 'GET', 
              headers: {'Content-Type': 'application/json'}
            }
    try{
        const response = await fetch(url, props)
        if (response.ok){
          const resp = await response.json();
          console.log(response);
          resolve(resp);
        }else
        {            
          reject(response)
        }          
    }
    catch(error)
    {
      console.log(error)
      reject(error.message)
    }
  })
}

export const addAdvancedPricing = (price_data) => {
    console.log(JSON.stringify(price_data))
  return new Promise(async(resolve, reject)=> {
    const url = `${endpoints.addAdvancedPricing}`;
    const props = { method: 'POST', 
              headers: {'Content-Type': 'application/json'},
              body : JSON.stringify(price_data)
            }
            
    try{
        const response = await fetch(url, props)
        if (response.ok){
          const resp = await response.json();
          console.log(response);
          resolve(resp);
        }else
        {            
          reject(response)
        }          
    }
    catch(error)
    {
      console.log(error)
      reject(error.message)
    }
  })
}


export const getPricingTypes = () => {
    
  return new Promise(async(resolve, reject)=> {
    const url = `${endpoints.getPricingTypes}`;
    const props = { method: 'GET', 
              headers: {'Content-Type': 'application/json'}
            }
    try{
        const response = await fetch(url, props)
        if (response.ok){
          const resp = await response.json();
          console.log(response);
          resolve(resp);
        }else
        {            
          reject(response)
        }          
    }
    catch(error)
    {
      console.log(error)
      reject(error.message)
    }
  })
}


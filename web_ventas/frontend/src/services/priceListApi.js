const endpoints = {
    'getPriceListHeaders': '/sales/pricelist/headers',
    'getPriceLists': '/sales/pricelist' ,
    'getPriceListsDetails': '/sales/pricelist/',
    'createPriceList' : '/sales/pricelist',    
    'uploadPriceList': '/sales/pricelist/upload'
}

export const getPriceListsHeaders = () => {
    return new Promise(async(resolve, reject)=> {    
        const props = {method:'GET', Headers: {'Content-Type':'application/json'}}
        const response = await fetch(endpoints.getPriceListHeaders, props)
        let json_resp = await response.json()
        if (response.ok)
        {            
            resolve(json_resp)
        }else{
            reject(json_resp)
        }
    })
}

export const getPriceListsDetails = (listId) => {    
    return new Promise (async(resolve,reject) => {
        const props = {method: 'GET', headers: {'Content-Type':'application/json'}}
        const response = await fetch(`${endpoints.getPriceListsDetails}${listId}`, props)
        let json_resp = await response.json()
        if (response.ok)
        {
            resolve(json_resp)
        }else{
            reject(json_resp.message)
        }
    })
}

export const createPriceList = async (listData) =>{    
    return new Promise(async(resolve, reject)=> {
        const props = {method: 'POST', headers: {'Content-Type':'application/json'}, body:JSON.stringify(saleData)}
        try {

            const response = await fetch(`${endpoints.createPriceList}`, props);
            const json_resp = await response.json();
            if (response.ok){
                resolve(json_resp);
            }else {
                reject(response)
            }                        
        }
        catch(error) {
            console.error(error.message)
            reject(error.message);
        }
    })   
}

export const callUploadPriceList = async (data) => {
    return new Promise(async (resolve, reject) => {
        const props = { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) }
        try {
            const response = await fetch(endpoints.uploadPriceList, props);
            const json_resp = await response.json();
            if (response.ok) {
                resolve(json_resp)
            } else {
                reject(response)
            }
        } catch (error) {
            reject(error)
        }
    })
}
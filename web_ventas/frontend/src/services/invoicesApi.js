const endpoints = {
    "getInvoicesHeaders" : "/api/invoices/",
    "getInvoiceDetails": "/api/invoices/",
    "createInvoice" : "/api/invoices/",
    "invoiceAutomaticGenerator": "/api/automatic-generator"
}

export const getInvoiceHeaders = () => {
    return new Promise(async(resolve, reject) => {
            const props = { method : 'GET', headers: {'Content-Type':'Application/JSON'}}
            try{
                    const response = await fetch(endpoints.getInvoicesHeaders, props)
                    const json_response = await response.json()
                    if (response.ok) {
                        resolve(json_response)
                    }else {
                        reject(json_response)
                    }
            }
            catch(e){
                reject(e)
            }
    })   
}

export const createInvoice = (data) => {
    const props ={method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify(data)}
    return new Promise(async(resolve, reject)=> {
        try{
            const response = await fetch(endpoints.createInvoice, props)

            if (response.ok){
                const json_response = await response.json()
                resolve(json_response)
            }else
            {
                reject(response.error)
            }
        }catch(error)
        {
            reject(error)
        }
    })
}

export const invoiceAutomaticGenerator = (data)=> {
    console.log(data)
    const props = {method: 'POST', headers: {'content-type':'application/Json'}, body: JSON.stringify(data)}
    return new Promise(async (resolve, reject)=>{
        try{
            const resp = await fetch (endpoints.invoiceAutomaticGenerator, props)
            const json_resp = await resp.json()
            if (resp.ok)
            {
                resolve(json_resp)
            }else{
                reject(json_resp)
            }
        }catch(e){
            reject(e)
        }        
    })
}

export const getInvoiceDetails=(invoiceId)=>{
    const props = {method:'GET', headers:{'content-type':'application/JSON'}}
    return new Promise(async(resolve,reject)=> {
        
        try
        {
                const resp = await fetch(`${endpoints.getInvoiceDetails}${invoiceId}`, props)
                const json_resp = await resp.json()
                if (resp.ok)
                {
                    resolve(json_resp)
                }else {
                    reject(json_resp)
                }
        }catch(error){
            reject(error)
        }
    })
}
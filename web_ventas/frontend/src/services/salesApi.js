const endpoints = {
    'getSalesHeaders': '/sales/salesheaders',
    'getSales': '/sales/sales/',
    'createSale': '/sales/sales',
    'makePayment': '/sales/makepayment',
    'uploadPriceList': 'pricelists/upload',
    'changeSalesOrderStatus': '/sales/changestatus'
}



export const getSalesHeaders = () => {
    return new Promise(async (resolve, reject) => {
        const props = { method: 'GET', Headers: { 'Content-Type': 'application/json' } }
        const response = await fetch(endpoints.getSalesHeaders)
        let json_resp = await response.json()
        if (response.ok) {
            resolve(json_resp)
        } else {
            reject(json_resp)
        }
    })
}

export const getSalesDetails = (orderId) => {
    return new Promise(async (resolve, reject) => {
        const props = { method: 'GET', headers: { 'Content-Type': 'application/json' } }
        const response = await fetch(`${endpoints.getSales}${orderId}`, props)
        let json_resp = await response.json()
        if (response.ok) {
            resolve(json_resp)
        } else {
            reject(json_resp.message)
        }
    })
}

export const createSale = async (saleData) => {
    return new Promise(async (resolve, reject) => {
        const props = { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(saleData) }
        try {

            const response = await fetch(`${endpoints.createSale}`, props);
            const json_resp = await response.json();
            if (response.ok) {
                resolve(json_resp);
            } else {
                reject(response)
            }
        }
        catch (error) {
            console.error(error.message)
            reject(error.message);
        }
    })
}

export const MakePayment = async (data) => {
    return new Promise(async (resolve, reject) => {
        console.log(data)
        const props = { method: 'POST', headers: { 'Content-Type': 'application/JSON' }, body: JSON.stringify(data) }
        try {
            const response = await fetch(endpoints.makePayment, props);
            const json_resp = await response.json();
            if (response.ok) {
                resolve(json_resp)
            } else {
                reject(response)
            }
        } catch (error) {
            console.error(error);
            reject(error);
        }
    })
}

export const changeSalesOrderStatus = async(data) => {
    return new Promise(async(resolve, reject)=> {
        const props = {method: 'POST', headers: {'Content-Type': 'application/JSON'}, body: JSON.stringify(data)}
        try {
            const response = await fetch(endpoints.changeSalesOrderStatus, props)
            const json_resp = await response.json();
            if (response.ok)
            {
                resolve(json_resp)
            }else 
            {
                reject(response)
            }
        }catch(error){            
            console.log("ded")
            reject(error)
        }
    })
}

const apiConfig = {
  customers: {
    get: { endpoint: '/api/customers', props: { method: 'GET', headers: { 'Content-Type': 'application/json' } } },
    update: { endpoint: `/api/customers/`, props: { method: 'PATCH', headers: { 'Content-Type': 'application/json' } } },
    delete: { endpoint: `/api/customers/`, props: { method: 'DELETE', headers: { 'Content-Type': 'application/json' } } },
    create: { endpoint: `/api/create-customer/`, props: { method: 'POST', headers: { 'Content-Type': 'application/json' } } }
  },
  products: {
    get: { endpoint: 'api/get-products', props: { method: 'GET', headers: { 'Content-Type': 'application/json' } } },
    update: { endpoint: `/api/update-product/`, props: { method: 'PUT', headers: { 'Content-Type': 'application/json' } } },
    delete: { endpoint: `/api/delete-product/`, props: { method: 'DELETE', headers: { 'Content-Type': 'application/json' } } },
    create: { endpoint: `/api/create-product`, props: { method: 'POST', headers: { 'Content-Type': 'application/json' } } }
  },
  sales: {
    get: '/api/salesheaders/',
    getDetail: '/api/sales/',
    create: '/api/sales/'
  }
}


export const callEntityDeleteApi = (entity, id) => {
  return new Promise(async (resolve, reject) => {
    console.log(`${apiConfig[entity]}`)
    try {
      const response = await fetch(`${apiConfig[entity].delete.endpoint}${id}`, apiConfig[entity].delete.props)
      if (response.ok) {
        const resp = await response.json();
        resolve(resp.message);
      } else {
        console.log(response);
        reject("Error calling delete API");
      }
    } catch (error) {
      console.log(error.message);
      reject(error);
    }
  })
}
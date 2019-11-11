import { BACKEND_API_ENDPOINT } from '../config'

export const NO_API_ENDPOINT_ERROR = new Error('Please set server api endpoint in url, e.g. apiEndpoint=https://yourApiHost.org. Details in https://github.com/cmngan/map-demo/blob/master/README.md') 

export default (api, method = 'GET', body) => {
  if(!BACKEND_API_ENDPOINT) throw NO_API_ENDPOINT_ERROR
  const fetchApi = () => fetch(`${BACKEND_API_ENDPOINT}${api}`, {
    method,
    headers: {
      'Content-Type': 'application/json' 
    },
    body: JSON.stringify(body)
  })
  .then(async r => {
    if(r.status >= 400) 
      throw Error(`${r.status}: ${await r.text()}`)
    return r.json()
  })
  .then(r => {
    if(r.status === 'in progress') return fetchApi()
    if(r.status === 'failure') throw Error(r.error || 'Unexpected error')
    return r
  })
  
  return fetchApi()
}
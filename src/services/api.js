import { BACKEND_API_ENDPOINT } from '../config'

const request = (api, method = 'GET', body) => {
  if(BACKEND_API_ENDPOINT) throw Error('Please set server api endpoint in url, e.g. apiEndpoint=https://yourApiHost.org. Details in https://github.com/cmngan/map-demo/blob/master/README.md')
  const fetchApi = () => fetch(`${BACKEND_API_ENDPOINT}${api}`, {
    method,
    headers: {
      'Content-Type': 'application/json' 
    },
    body: JSON.stringify(body)
  })
  .then(async r => {
    if(r.status > 400) 
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


const getRoute = async (origin, destination) => {
  const { token } = await getToken(origin, destination) 
  const response = await getRouteByToken(token)
  // const response = await getMockRouteByToken()
  return response
}

const getToken = (origin, destination) => request('/route', 'POST', { origin, destination })
const getRouteByToken = token => request(`/route/${token}`).then(({ path: paths, total_distance: totalDistance, total_time: totalTime }) => ({ paths: paths.map(point => point.map(p => +p)), totalDistance, totalTime })) // change to js convention
const getMockRouteByToken = () => request(`/mock/route/success`)

export { getRoute }
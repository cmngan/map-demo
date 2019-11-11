import fetch from '../utils/fetch'

const getRoute = async (origin, destination) => {
  const { token } = await getToken(origin, destination) 
  const response = await getRouteByToken(token)
  return response
}

const getToken = (origin, destination) => fetch('/route', 'POST', { origin, destination })
const getRouteByToken = token => fetch(`/route/${token}`).then(({ path: paths, total_distance: totalDistance, total_time: totalTime }) => ({ paths: paths.map(point => point.map(p => +p)), totalDistance, totalTime })) // change to js convention

export { getRoute }
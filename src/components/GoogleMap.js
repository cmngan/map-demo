import React, { useEffect } from 'react'
import { Helmet } from "react-helmet"
import { Col } from './Layout'
import { useRetry } from '../utils/hooks'
const data = [
  [-33.847927, 150.6517938],
  [-37.9722342, 144.7729561],
  [-31.9546904, 115.8350292]
]

// points: [[lat, lng], [lat, lng]]
export default ({ points=data, zoom = 8, apiKey }) => {
  const mapLoaded = useRetry(() => window.google)
  let map = null
  if(mapLoaded) {
    map = new window.google.maps.Map(document.getElementById('map'), {
      center: {lat: -34.397, lng: 150.644},
      zoom
    })
  }
  useEffect(() => {
    if(map) {
      const googleMaps = window.google.maps
      const directionsService = new googleMaps.DirectionsService()
      const directionsDisplay = new googleMaps.DirectionsRenderer()
      directionsDisplay.setMap(map)

      const waypoints = points.map(([lat, lng]) => ({
        location: {lat, lng},
        stopover: true
      }))
      const origin = waypoints.shift().location
      const destination = waypoints.pop().location
  
      directionsService.route({ origin, destination, waypoints, travelMode: 'DRIVING' }, (response, status) => {
        if (status === 'OK') directionsDisplay.setDirections(response)
        else window.alert('Directions request failed due to ' + status)
      })
    }
  }, [points, map])
  return (
    <>
      <Col id="map" width='100%' height='100%' />
      <Helmet>
        <script async defer src={`https://maps.googleapis.com/maps/api/js?key=${apiKey}`} />
      </Helmet>
    </>
  )
}
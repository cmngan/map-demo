import React, { useState } from 'react'
import { MAP_API_KEY } from '../../config'
import { getRoute } from '../../services/api'
import { useFetch } from '../../utils/hooks'

import { Col, Row } from '../../components/Layout'
import Text from '../../components/Text'
import TextInput from '../../components/Input'
import Button from '../../components/Button'
import GoogleMap from '../../components/GoogleMap'

export default () => {
  const [origin, setOrigin] = useState('')
  const [dest, setDest] = useState('')
  const [{ paths, totalDistance, totalTime }, setResponse] = useState({})
  const [_getRoute, {fetching, error, setError}] = useFetch(getRoute, origin, dest)
  const onSubmit = async (e) => {
    e.preventDefault()
    const r = await _getRoute()
    if(r) setResponse(r)
  }
  const onReset = () => { 
    setOrigin('')
    setDest('')
    setError(false)
  }
  const commonProps = {
    disabled: fetching
  }
  return (
    <Row padding='20px' height='100vh' flexWrap>
      <Col width='300px'>
        <form onSubmit={onSubmit} onReset={onReset}>
          <Text>Starting location</Text>
          <TextInput value={origin} onChange={e => setOrigin(e.target.value)} required {...commonProps} />
          <Col height='10px' />
          <Text>Drop-off point</Text>
          <TextInput value={dest} onChange={e => setDest(e.target.value)} required {...commonProps} />
          <Col height='140px' bottom>
            { totalDistance && <Text>{`total distance: ${totalDistance}`}</Text> }
            { totalTime && <Text>{`total time: ${totalTime}`}</Text> }
            <Text error>{error}</Text>
          </Col>
          <Row>
            <Button type='submit' primary {...commonProps}>{fetching ? 'Submitting' : 'Submit'}</Button>
            <Col width='20px' />
            <Button type='reset' {...commonProps}>Reset</Button>
          </Row>
        </form>
      </Col>
      <Col width='20px' />
      <Col flex={1} height='100%'>
        <GoogleMap apiKey={MAP_API_KEY} points={paths} />
      </Col>
    </Row>
  )
}
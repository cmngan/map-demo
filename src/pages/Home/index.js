import React, { useState } from 'react'
import { MAP_API_KEY } from '../../config'
import { getRoute } from '../../services/api'
import { useFetch } from '../../utils/hooks'

import { Col, Row } from '../../components/Layout'
import Text from '../../components/Text'
import TextInput, { Form } from '../../components/Input'
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
    setResponse({})
    setError(false)
  }
  const commonProps = {
    disabled: fetching
  }
  return (
    <Form onSubmit={onSubmit} onReset={onReset}>
      <Row padding='20px' height='100vh' flexWrap direction={['column', 'row']}>
        <Col width={['100%', '300px']}>
          <Text>Starting location</Text>
          <TextInput value={origin} onChange={e => setOrigin(e.target.value)} required {...commonProps} />
          <Col height='10px' />
          <Text>Drop-off point</Text>
          <TextInput value={dest} onChange={e => setDest(e.target.value)} required {...commonProps} />
          <Col height={['auto', '140px']} bottom padding='20px'>
            { totalDistance && <Text>{`total distance: ${totalDistance}`}</Text> }
            { totalTime && <Text>{`total time: ${totalTime}`}</Text> }
            <Text error>{error}</Text>
          </Col>
          <Row padding='0 0 20px 0'>
            <Button type='submit' primary {...commonProps}>{fetching ? 'Submitting' : 'Submit'}</Button>
            <Col width='20px' />
            <Button type='reset' {...commonProps}>Reset</Button>
          </Row>
        </Col>
        <Col width={[0, '20px']} />
        <Col flex={1} height='100%' width={['100%', 'auto']}>
          <GoogleMap apiKey={MAP_API_KEY} points={paths} />
        </Col>
      </Row>
    </Form>
  )
}
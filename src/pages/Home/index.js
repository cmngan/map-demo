import React from 'react'
import { MAP_API_KEY } from '../../config'

import { Col, Row } from '../../components/Layout'
import Text from '../../components/Text'
import TextInput from '../../components/Input'
import Button from '../../components/Button'
import GoogleMap from '../../components/GoogleMap'

export default () => {
  return (
    <Row padding='20px'>
      <Col width='300px'>
        <Text>Starting location</Text>
        <TextInput />
        <Col height='10px' />
        <Text>Drop-off point</Text>
        <TextInput />
        <Col height='60px' />
        <Row>
          <Button primary>Submit</Button>
          <Col width='20px' />
          <Button>Reset</Button>
        </Row>
      </Col>
      <Col width='20px' />
      <Col flex={1}>
        <GoogleMap apiKey={MAP_API_KEY} />
      </Col>
    </Row>
  )
}
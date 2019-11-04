import React from 'react'
import { Col, Row } from '../../components/Layout'
import Text from '../../components/Text'
import TextInput from '../../components/Input'
import Button from '../../components/Button'

export default () => {
  return (
    <Row padding='20px'>
      <Col width='300px'>
        <Text>Starting location</Text>
        <TextInput />
        <Text>Drop-off point</Text>
        <TextInput />
        <Col height='20px' />
        <Row>
          <Button primary>Submit</Button>
          <Col width='20px' />
          <Button primary>Reset</Button>
        </Row>
      </Col>
      <Col width='20px' />
      <Col flex={1}>
        <Text>Map</Text>
      </Col>
    </Row>
  )
}
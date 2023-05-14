import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import Calendar from './Calendar/Calendar'
import Description from './Description/Description'
import Room from './Room/Room'

export default function BookNow() {
  return (
    <>
      <Container>
        <Row className="justify-content-md-center">
          <Col style={{ marginTop: 20 }}>
            <Calendar />
          </Col>
        </Row>
          <Description/>
          <Room/>
      </Container>
    </>
  )
}

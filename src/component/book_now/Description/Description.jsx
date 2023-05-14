import React from 'react'
import { Row, Col, Container } from 'react-bootstrap'
import './Description.css'

export default function Description() {
    return (
        <Container>
            <Row style={{ marginTop: '5%', marginBottom: '5%', backgroundColor: '#00000015', padding: 8 }}>
                <Col>
                    <Row className='desc' style={{ textAlign: 'center', justifyContent: 'center', alignItems: 'center', fontSize:14, fontFamily:'Montserrat' }}>
                        <div style={{ backgroundColor: 'rgb(108,117,125)', width: 25, height: 25, margin: 5, }}></div> SELECTED
                    </Row>
                </Col>
                <Col>
                    <Row className='desc' style={{ textAlign: 'center', justifyContent: 'center', alignItems: 'center', fontSize:14, fontFamily:'Montserrat' }}>
                        <div style={{ backgroundColor: '#fff', width: 25, height: 25, margin: 5, }}></div> AVAILABLE
                    </Row>
                </Col>
                <Col>
                    <Row className='desc' style={{ textAlign: 'center', justifyContent: 'center', alignItems: 'center', fontSize:14, fontFamily:'Montserrat' }}>
                        <div style={{ backgroundColor: '#154577', width: 25, height: 25, margin: 5, }}></div> PLEASE CONTACT THE RESORT
                    </Row>
                </Col>
                <Col>
                    <Row className='desc' style={{ textAlign: 'center', justifyContent: 'center', alignItems: 'center', fontSize:14, fontFamily:'Montserrat' }}>
                        <div style={{ backgroundColor: '#e7c6bc', width: 25, height: 25, margin: 5, }}></div>  RESTRICTIONS APPLY
                    </Row>
                </Col>
            </Row>
        </Container>
    )
}

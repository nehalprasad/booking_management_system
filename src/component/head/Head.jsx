import React, { useEffect, useState } from 'react'
import { Container, Row } from 'react-bootstrap'
import "react-step-progress-bar/styles.css";
import { ProgressBar, Step } from "react-step-progress-bar";
import { useSelector } from 'react-redux';
import './Head.css'
import one from '../../assets/one.jpg'
import two from '../../assets/two.jpg'
import three from '../../assets/three.jpg'
import logo from '../../assets/logo.jpg'

export default function Head() {
    const bookingData = useSelector((state) => state.date)
    const customerData = useSelector((state) => state.customer)
    const hotelData = useSelector((state) => state.hotel)
    const userData = useSelector((state) => state.user)
    const [myVariable, setMyVariable] = useState(0)

    useEffect(() => {
        let totalProgress = 0
        if (bookingData.length > 0) {
            totalProgress += 25
        }
        if (customerData.length > 0) {
            totalProgress += 25
        }
        if (hotelData.length > 0) {
            totalProgress += 25
        }
        if (Object.keys(userData).length > 0) {
            totalProgress += 25
        }
        // console.log(totalProgress)
        setMyVariable(totalProgress)

    }, [bookingData, customerData, hotelData, userData])


    return (
        <div style={{ marginBottom: 60 }}>
            <Container >
                <Row style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
                    <img
                        src={logo}
                        style={{
                            width: '135px',
                            height: '60px'
                        }}
                        alt="logo"
                    />
                </Row>
            </Container>
            <hr style={{ marginTop: 10 }} />

            <Container style={{justifyContent:'center', alignItems:'center', display:'flex'}}>
                <div style={{ marginTop: '2%', width: '100%', justifyContent: 'center', }}   className='counting'>

                    <ProgressBar
                        height={2}
                        percent={myVariable}
                        filledBackground="linear-gradient(to right, #f1b80c, #f1b80c50)"
                    >
                        <Step transition="scale" 
                                  >
                            {({ accomplished }) => (
                                <img
                                    style={{ filter: `grayscale(${accomplished ? 0 : 80}%)`, backgroundColor: 'white' }}
                                    width="30"
                                    src={one}
                                    alt={one}
                                />
                            )}
                        </Step>
                        <Step transition="scale">
                            {({ accomplished }) => (
                                <img
                                    style={{ filter: `grayscale(${accomplished ? 0 : 80}%)`, backgroundColor: 'white' }}
                                    width="30"
                                    src={two}
                                    alt={two}
                                />
                            )}
                        </Step>
                        <Step transition="scale">
                            {({ accomplished }) => (
                                <img
                                    style={{ filter: `grayscale(${accomplished ? 0 : 80}%)`, backgroundColor: 'white' }}
                                    width="30"
                                    src={three}
                                    alt={three}
                                />
                            )}
                        </Step>
                    </ProgressBar>
                </div>
            </Container>
        </div>

    )
}

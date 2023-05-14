import React, { useState } from 'react'
import { Row, Col, Container } from 'react-bootstrap'
import useCollapse from 'react-collapsed'
import 'react-responsive-modal/styles.css';

function Amenities({ AMENITIES, description }) {
    const [isExpanded, setExpanded] = useState(false)
    const { getCollapseProps, getToggleProps } = useCollapse({ isExpanded })

    return (
        <Container>
            <div  {...getToggleProps({
                onClick: () => setExpanded((prevExpanded) => !prevExpanded),
            })}
            > {isExpanded ?
                <p style={{ fontSize: 14, fontFamily: 'Tinos' }}><i className="bi bi-dash" style={{ fontWeight: 600, fontSize: 20 }}></i>  SEE MORE DETAILS</p>
                :
                <p style={{ fontSize: 14, fontFamily: 'Tinos' }}><i className="bi bi-plus" style={{ fontWeight: 600, fontSize: 20 }}></i>  SEE MORE DETAILS</p>
                }
            </div>

            <Container  {...getCollapseProps()}>
                <div style={{backgroundColor:'#80808020', padding:'1rem'}}>
                <div style={{padding: '0rem 0rem 1rem 0rem',}}>AMENITIES</div>
                <Row className="row-cols-1 row-cols-md-4 g-4">
                    {AMENITIES.map(({ id, type, image }) => {
                        return (
                            <Col style={{}} key={id} >
                                <div className="card" style={{ justifyContent: 'center', alignItems: 'center', display: 'grid' }}>
                                    <div className="card-body" >
                                        <img
                                            src={image}
                                            height={35}
                                            width={35}
                                            alt={type}
                                        />
                                        <div style={{ fontSize: 12, textAlign:'center' }}>{type}</div>
                                    </div>
                                </div>

                            </Col>
                        )
                    })}
                </Row>
                <Row style={{ padding: '10px 0px' }}>
                    <div style={{ fontSize: 16, fontWeight: 400, fontFamily: 'Arimo' }}>DESCRIPTION</div>
                    <br />
                    <div style={{ fontSize: 14, fontWeight: 300, fontFamily: 'Montserrat' }}>
                        {description}
                    </div>
                </Row>
                </div>
            </Container>
        </Container>
    )
}

export default Amenities
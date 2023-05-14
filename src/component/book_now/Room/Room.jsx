import React, { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { setCustomersInfo } from '../../../redux/reducers/customerReducer';
import { useNavigate } from 'react-router-dom';
import './Room.css'

const Room = () => {
  // To navigate to another screen
  const navigate = useNavigate();
  // Check value of booking date is present in store or not
  const bookingDates = useSelector((state) => state.date)
  const customerInfo = useSelector((state) => state.customer)
  
  //Redux dispatch to send data to the store
  const dispatch = useDispatch();

  const [rooms, setRooms] = useState([{ adults: 0, children: 0 }]);

  const handleAddRoom = () => {
    setRooms([...rooms, { adults: 1, children: 0 }]);
  };

  const handleRemoveRoom = (index) => {
    const newRooms = [...rooms];
    newRooms.splice(index, 1);
    setRooms(newRooms);
  };

  const handleAdultsChange = (index, value) => {
    const newRooms = [...rooms];
    newRooms[index].adults = value;
    setRooms(newRooms);
  };

  const handleChildrenChange = (index, value) => {
    const newRooms = [...rooms];
    newRooms[index].children = value;
    setRooms(newRooms);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const customerDetails = rooms.map((room, index) => ({
      roomNumber: index + 1,
      adults: room.adults,
      children: room.children,
    }));

    dispatch(setCustomersInfo(customerDetails))
  };

  const handleFind = () => {
    console.log(customerInfo, bookingDates)
    if(Object.keys(bookingDates).length > 0 && Object.keys(customerInfo).length){
      navigate('/search_results');
    }
  }

  return (
    <div className="p-4">
      <Form onChange={handleSubmit}>
        <div className="d-grid gap-2 mt-4 mb-4">
          <Row style={{ justifyContent: 'center', alignItems: 'center', display: 'flex', cursor: 'pointer' }} onClick={handleAddRoom}>
            <Col>
              <h6 style={{fontFamily:'Tinos'}}>ADD ROOM'S </h6>
            </Col>
            <Col>
              <h6>
                <i className="bi bi-plus" style={{ fontSize: 20 }}></i>
              </h6>
            </Col>
          </Row>

        </div>
        {rooms.map((room, index) => (
    <div key={index} className="room">

      <Row>
        <Col>
          <b style={{ fontSize: 16, fontFamily:'Arimo' }}>ROOM {index + 1}</b>
        </Col>

        <Col>
          <Form.Group controlId={`adults-${index}`}>
            <Row>
              <Col>
                <Form.Label className="form-label" >
                  <Row>
                    <div style={{ fontSize: 17 ,fontFamily:'Arimo'}}>ADULTS: &nbsp;</div>
                    <br />
                    <div style={{ fontSize: 12,fontFamily:'Arimo' }} className='form-adult'>(12 Years & Above)</div>
                  </Row>
                </Form.Label>
              </Col>
              <Col>
                <Form.Control  className="form-select num" as="select" value={room.adults} onChange={(e) => handleAdultsChange(index, e.target.value)}>
                  {[...Array(3).keys()].map((num) => (
                    <option key={num} value={num}>{num}</option>
                  ))}
                </Form.Control>
              </Col>
            </Row>
          </Form.Group>
        </Col>

        <Col>
          <Form.Group controlId={`children-${index}`}>
            <Row>
              <Col>
                <Form.Label className="form-label" >
                  <Row>
                    <Col>
                      <Row>
                        <div style={{ fontSize: 17,fontFamily:'Arimo' }}>CHILDREN: &nbsp;</div>
                        <br />
                        <div style={{ fontSize: 12 ,fontFamily:'Arimo'}}>(0 - 11 Years)</div>
                      </Row>

                    </Col>
                  </Row>
                </Form.Label>
              </Col>
              <Col>
                <Form.Control className="form-select num" as="select" value={room.children} onChange={(e) => handleChildrenChange(index, e.target.value)}>
                  {[...Array(3).keys()].map((num) => (
                    <option key={num} value={num}>{num}</option>
                  ))}
                </Form.Control>
              </Col>
            </Row>
          </Form.Group>
        </Col>
        <Col className="">
          {index > 0 && (
            <Button variant="outline-danger" className="remove-button float-end" onClick={() => handleRemoveRoom(index)} style={{fontSize:12, fontFamily:'Tinos'}}>
              REMOVE
            </Button>
          )}
        </Col>
      </Row>
    </div>
  ))}

        <hr />
        <Row style={{ justifyContent: 'center', marginTop: 25, marginBottom: 25 }}>
          {Object.keys(bookingDates).length > 0 && Object.keys(customerInfo).length > 0 && <Button variant="secondary" style={{ width: 500, textAlign: 'center', fontFamily:'Tonis' }} onClick={() => handleFind()}> FIND A ROOM </Button>}
        </Row>
      </Form>
    </div>
  );
};

export default Room;

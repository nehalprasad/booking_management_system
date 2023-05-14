import React, { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUserDetails } from "../../../redux/reducers/userReducer";
import {
  CountryDropdown,
  RegionDropdown,
  CountryRegionData,
} from "react-country-region-selector";

function ReservationInfo() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [validated, setValidated] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    country: "",
    state: "",
    email: "",
    coupon: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const selectCountry = (val) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      country: val,
    }));
  };

  const selectRegion = (val) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      state: val,
    }));
  };

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (
      form.checkValidity() === false 
    ) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);

    if (form.checkValidity() === true) {
      console.log(formData);
      dispatch(setUserDetails(formData));
      navigate('/details');
    }
    event.preventDefault();
  };

  return (
    <div>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Row style={{ marginTop: 10, fontFamily: "Tinos" }}>
          <Col>
            <Form.Group controlId="formBasicSelect">
              <div
                style={{
                  lineHeight: 1.6,
                  color: "black",
                  marginTop: "0.625rem",
                }}
              >
                <Form.Label
                  style={{
                    textTransform: "uppercase",
                    letterSpacing: "0.09735rem",
                    fontSize: "0.6875rem",
                  }}
                >
                  {" "}
                  TITLE*
                </Form.Label>
                <Form.Control
                  as="select"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Choose...</option>
                  <option>Mr.</option>
                  <option>Ms.</option>
                </Form.Control>
                <Form.Control.Feedback type="invalid">
                  Please choose a title.
                </Form.Control.Feedback>
              </div>
            </Form.Group>

            <Form.Group controlId="formBasicFirstName">
              <div
                style={{
                  lineHeight: 1.6,
                  color: "black",
                  marginTop: "0.625rem",
                }}
              >
                <Form.Label
                  style={{
                    textTransform: "uppercase",
                    letterSpacing: "0.09735rem",
                    fontSize: "0.6875rem",
                  }}
                >
                  FIRST NAME*
                </Form.Label>
                <Form.Control
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  placeholder="Enter first name"
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a first name.
                </Form.Control.Feedback>
              </div>
            </Form.Group>

            <Form.Group controlId="formBasicLastName">
              <div
                style={{
                  lineHeight: 1.6,
                  color: "black",
                  marginTop: "0.625rem",
                }}
              >
                <Form.Label
                  style={{
                    textTransform: "uppercase",
                    letterSpacing: "0.09735rem",
                    fontSize: "0.6875rem",
                  }}
                >
                  LAST NAME*
                </Form.Label>
                <Form.Control
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  placeholder="Enter last name"
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a last name.
                </Form.Control.Feedback>
              </div>
            </Form.Group>

            <Form.Group controlId="formBasicPhoneNumber">
              <div
                style={{
                  lineHeight: 1.6,
                  color: "black",
                  marginTop: "0.625rem",
                }}
              >
                <Form.Label
                  style={{
                    textTransform: "uppercase",
                    letterSpacing: "0.09735rem",
                    fontSize: "0.6875rem",
                  }}
                >
                  TELEPHONE NUMBER*
                </Form.Label>
                <Form.Control
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  placeholder="Enter telephone number"
                  required
                  pattern="[0-9]{10}"
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a valid 10-digit phone number.
                </Form.Control.Feedback>
              </div>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="formBasicCountry">
              <div
                style={{
                  lineHeight: 1.6,
                  color: "black",
                  marginTop: "0.625rem",
                }}
              >
                <Form.Label
                  style={{
                    textTransform: "uppercase",
                    letterSpacing: "0.09735rem",
                    fontSize: "0.6875rem",
                  }}
                >
                  COUNTRY*
                </Form.Label>
                <br />
                <CountryDropdown
                  style={{
                    width: "100%",
                    border: "1px solid grey",
                    padding: "8px 6px",
                    borderRadius: "8px",
                  }}
                  value={formData.country}
                  onChange={selectCountry}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Please choose a country.
                </Form.Control.Feedback>
              </div>
            </Form.Group>

            <Form.Group controlId="formBasicState">
              <div
                style={{
                  lineHeight: 1.6,
                  color: "black",
                  marginTop: "0.625rem",
                }}
              >
                <Form.Label
                  style={{
                    textTransform: "uppercase",
                    letterSpacing: "0.09735rem",
                    fontSize: "0.6875rem",
                  }}
                >
                  STATE*
                </Form.Label>
                <br />
                <RegionDropdown
                  style={{
                    width: "100%",
                    border: "1px solid grey",
                    padding: "8px 6px",
                    borderRadius: "8px",
                  }}
                  country={formData.country}
                  value={formData.state}
                  onChange={selectRegion}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Please choose a state.
                </Form.Control.Feedback>
              </div>
            </Form.Group>

            <Form.Group controlId="formBasicEmail">
              <div
                style={{
                  lineHeight: 1.6,
                  color: "black",
                  marginTop: "0.625rem",
                }}
              >
                <Form.Label
                  style={{
                    textTransform: "uppercase",
                    letterSpacing: "0.09735rem",
                    fontSize: "0.6875rem",
                  }}
                >
                  EMAIL*{" "}
                </Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter email"
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a valid email address.
                </Form.Control.Feedback>
              </div>
            </Form.Group>

            <Form.Group controlId="formBasicConfirmEmail">
              <div
                style={{
                  lineHeight: 1.6,
                  color: "black",
                  marginTop: "0.625rem",
                }}
              >
                <Form.Label
                  style={{
                    textTransform: "uppercase",
                    letterSpacing: "0.09735rem",
                    fontSize: "0.6875rem",
                  }}
                >
                  COUPON
                </Form.Label>
                <Form.Control
                  type="text"
                  name="coupon"
                  value={formData.coupon}
                  onChange={handleInputChange}
                  placeholder="Enter Coupon"
                  // required
                  // pattern={formData.co}
                />
                <Form.Control.Feedback type="invalid">
                  Please confirm your email address
                </Form.Control.Feedback>
              </div>
            </Form.Group>
          </Col>
        </Row>

        <Row
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginTop: 40,
          }}
        >
          <Button
            variant="dark"
            style={{ width: '25%', textAlign: "center" }}
            type="submit"
          >
            PROCEED
          </Button>
        </Row>
      </Form>
    </div>
  );
}

export default ReservationInfo;

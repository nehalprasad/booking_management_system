import moment from "moment";
import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  const bookingDates = useSelector((state) => state.date);
  const customerInfo = useSelector((state) => state.customer);
  const [childrens, setChildrens] = useState("");
  const [adults, setAdults] = useState("");

  useEffect(() => {
    let totalAdults = 0;
    let totalChildren = 0;

    for (let i = 0; i < customerInfo.length; i++) {
      totalAdults += parseInt(customerInfo[i].adults);
      totalChildren += parseInt(customerInfo[i].children);
    }
    setChildrens(totalChildren);
    setAdults(totalAdults);
  }, [customerInfo]);

  return (
    <Container style={{ backgroundColor: "#dbd5cd", padding: "1.5rem 5rem" }}>
      <Row
        style={{
          backgroundColor: "white",
          padding: "1rem 2rem",
          justifyContent: "center",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Col xl={5} lg={5}>
          <div
            style={{
              fontFamily: "Tinos",
              fontSize: 16,
              textTransform: "uppercase",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <i className="bi bi-calendar" /> &nbsp;
            {bookingDates.length > 0
              ? moment(bookingDates[0].start).format("dddd D MMM YYYY")
              : ""}{" "}
            -{" "}
            {bookingDates.length > 0
              ? moment(bookingDates[0].end).format("dddd D MMM YYYY")
              : ""}{" "}
          </div>
        </Col>
        <Col>
          <div
            style={{
              fontFamily: "Tinos",
              fontSize: 16,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <span
              className="material-symbols-outlined"
              style={{ fontSize: 20 }}
            >
              group
            </span>
            &nbsp; {adults ? adults : ""} ADULTS &nbsp;
            {childrens ? (
              <div
                style={{
                  fontFamily: "Tinos",
                  fontSize: 16,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <span
                  className="material-symbols-outlined"
                  style={{ fontSize: 20 }}
                >
                  group
                </span>
                &nbsp; {childrens} CHILDRENS{" "}
              </div>
            ) : (
              ""
            )}
          </div>
        </Col>
        <Col xl={3} lg={3}>
          <div
            onClick={() => navigate("/")}
            style={{
              fontFamily: "Tinos",
              fontSize: 16,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              cursor: "pointer",
            }}
          >
            MOODIFY BOOKING{" "}
            <i
              className="bi bi-plus"
              style={{
                padding: "0px 0px 0px 24px",
                fontSize: 20,
                position: "relative",
                top: "-2px",
              }}
            ></i>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

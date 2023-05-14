import moment from "moment/moment";
import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import useCollapse from "react-collapsed";
import { useSelector } from "react-redux";
// import { setHotelDetails } from '../../../redux/reducers/hotelReducer'

export default function BookingSummary() {
  const bookingDates = useSelector((state) => state.date);
  const customerInfo = useSelector((state) => state.customer);
  const hotelInfo = useSelector((state) => state.hotel);
  // const [night, setnight] = useState("");
  const [childrens, setChildrens] = useState("");
  const [adults, setAdults] = useState("");
  const [rooms, setRooms] = useState("");
  // console.log(bookingDates)
  console.log(customerInfo);
  console.log(hotelInfo);

  useEffect(() => {
    if (customerInfo.length > 0) {
      let totalAdults = 0;
      let totalChildren = 0;

      for (let i = 0; i < customerInfo.length; i++) {
        totalAdults += parseInt(customerInfo[i].adults);
        totalChildren += parseInt(customerInfo[i].children);
      }
      setRooms(customerInfo.length);
      setChildrens(totalChildren);
      setAdults(totalAdults);
    }
  }, [bookingDates, customerInfo]);

  const [isExpanded, setExpanded] = useState(false);
  const { getCollapseProps, getToggleProps } = useCollapse({ isExpanded });

  return (
    <Container style={{ padding: "1.875rem 0 .625rem" }}>
      <Row
        style={{
          backgroundColor: "#dbd5cd",
          justifyContent: "center",
          alignItems: "center",
          display: "block",
        }}
      >
        <div
          style={{ textAlign: "center", fontFamily: "Arimo", fontSize: 22 }}
          {...getToggleProps({
            onClick: () => setExpanded((prevExpanded) => !prevExpanded),
          })}
        >
          {" "}
          {isExpanded ? (
            <Row style={{ padding: ".8rem" }}>
              <Col style={{ textAlign: "center" }}>BOOKING SUMMARY  &nbsp; &nbsp;    &nbsp;&nbsp; &nbsp;    &nbsp;&nbsp; &nbsp;    &nbsp;&nbsp; &nbsp;     -</Col>

            </Row>
          ) : (
            <Row style={{ padding: ".8rem" }}>
              <Col style={{ textAlign: "center" }}>BOOKING SUMMARY  &nbsp; &nbsp;    &nbsp;&nbsp; &nbsp;    &nbsp;&nbsp; &nbsp;    &nbsp;&nbsp; &nbsp;      +</Col>
            </Row>
          )}
        </div>
        <div {...getCollapseProps()}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row",
              marginLeft: "12%",
              paddingBottom: "1%",
            }}
          >
            <div
              style={{
                marginRight: "56px",
                fontSize: 16,
                fontFamily: "Tinos",
                textTransform: "capitalize",
              }}
            >
              DATE
              <br />
              NUMBER OF NIGHTS
              <br />
              GUESTS
              <br />
              ROOMS
              <br />
              PACKAGE
              <br />
              PRICE PER NIGHT
              <br />
              TOTAL PRICE WITHOUT TAX
            </div>
            <div
              style={{
                marginRight: "56px",
                fontSize: 18,
                fontFamily: "Tinos",
                textTransform: "capitalize",
              }}
            >
              {bookingDates?.[0]?.start} - {bookingDates?.[0]?.end}
              <br />
              {bookingDates?.[0]?.numberOfNights}
              <br />
              {adults ? `${adults} Adults` : ""}{" "}
              {childrens ? `& ${childrens} Childrens` : ""}
              <br />
              {hotelInfo?.[0]?.Room_Name}
              <br />
              {customerInfo?.length}
              <br />
              {"₹ " + hotelInfo?.[0]?.totalprice_room_only}
              <br />
              {"₹ " + hotelInfo?.[0]?.avg_per_night_without_tax}
              <br />
            </div>
          </div>
        </div>
      </Row>
    </Container>
  );
}

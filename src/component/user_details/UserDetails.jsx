import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import BookingSummary from "./BookingSummary/BookingSummary";
import ReservationInfo from "./ReservationInfo.js/ReservationInfo";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function UserDetails() {
  const bookingDates = useSelector((state) => state.date);
  const customerInfo = useSelector((state) => state.customer);
  const [redirection, setredirection] = useState(false);

  useEffect(() => {
    if (
      Object.keys(bookingDates).length === 0 &&
      Object.keys(customerInfo).length === 0
    ) {
      setredirection(true);
    }
  }, [bookingDates, customerInfo]);

  if (redirection) {
    return <Navigate to="/" />;
  } else {
    return (
      <Container>
        <BookingSummary />
        <ReservationInfo />
        {/* <BookingSummary /> */}
      </Container>
    );
  }
}

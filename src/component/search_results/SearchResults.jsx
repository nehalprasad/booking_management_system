import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import Packages from "./packages/Packages";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Header from "./header/Header";

export default function SearchResults() {
  // const navigate = useNavigate()
  const bookingDates = useSelector((state) => state.date);
  const customerInfo = useSelector((state) => state.customer);
  const [redirection, setredirection] = useState(false);

  useEffect(() => {
    console.log(bookingDates);
    console.log(customerInfo);

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
        <Header />
        <Packages />
      </Container>
    );
  }
}

import React, { useState, useEffect } from "react";
import { Row, Col, Button, Container } from "react-bootstrap";
import moment from "moment";
import "./Calendar.css";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setBookingDate } from "../../../redux/reducers/dateReducer";
import { setisLoading } from "../../../redux/reducers/loaderReducer";
// import { parseString } from 'xml2js';
import xml2js from "xml2js";
import Loading from "../../loader/Loading";

const Calendar = () => {
  //Redux dispatch to send data to the store
  const dispatch = useDispatch();

  // Date To fetch rate of 1 year
  const priceShownStartData = moment()
    .subtract(1, "months")
    .format("YYYY-MM-DD");
  const priceShownEndData = moment(priceShownStartData)
    .add(1, "year")
    .subtract(1, "day")
    .format("YYYY-MM-DD");
  // Date To fetch rate of 1 year

  const [RoomRateInfo, setRoomRateInfo] = useState([]);

  const [priceMap, setpriceMap] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(moment());
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [totalPrice, setTotalPrice] = useState(null);
  const [isLoading, setisLoading] = useState(true)
  const [LowestPrice, setLowestPrice] = useState(0)


  const handleDateClick = (day, priceDisplay) => {
    // console.log(day, priceDisplay)
    if (day.isBefore(moment(), "day")) {
      // Don't update state for past dates
      return;
    }

    if (!startDate) {
      // console.log(day, priceDisplay)
      setStartDate(day);
      setEndDate(null);
      setTotalPrice(null);
    } else if (day.isSameOrAfter(startDate)) {
      // console.log(day, priceDisplay)
      setEndDate(day);
      const numericPrice = parseInt(priceDisplay.replace(/\D/g, ""), 10);
      // console.log(numericPrice);
      // let totalPrice = 0;
      // let currDate = startDate.clone();
      // while (currDate.isSameOrBefore(day)) {
      //     const price = priceMap[currDate.format('YYYY-MM-DD')];
      //     console.log(price)
      //     totalPrice += price;
      //     currDate.add(1, 'day');
      // }
      setTotalPrice(numericPrice);
    } else {
      // console.log(day, priceDisplay)
      setStartDate(day);
      setEndDate(null);
      setTotalPrice(null);
    }
  };

  useEffect(() => {
    let data = `<RES_Request>   \r\n<Request_Type>Rate</Request_Type>\r\n   <Authentication>\r\n       <HotelCode>${process.env.REACT_APP_HotelCode}</HotelCode>\r\n       <AuthCode>${process.env.REACT_APP_AuthCode}</AuthCode>\r\n   </Authentication>\r\n   <FromDate>${priceShownStartData}</FromDate>\r\n   <ToDate>${priceShownEndData}</ToDate>\r\n</RES_Request>`;

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${process.env.REACT_APP_HotelUrl}/pmsinterface/getdataAPI.php`,
      headers: {
        "Content-Type": "application/xml",
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        const xmlString = response.data;
        xml2js.parseString(xmlString, (err, result) => {
          if (err) {
            console.error(err);
            return;
          }
          if (result) {
            console.log(result?.RES_Response?.RoomInfo?.[0]?.Source?.[0]?.RoomTypes?.[0]
              ?.RateType)

          const rate = result?.RES_Response?.RoomInfo?.[0]?.Source?.[0]?.RoomTypes?.[0]
          ?.RateType  

         const rats = rate.map(({ RoomRate }) => RoomRate?.[0]?.Base?.[0]);
            console.log(rats)

         const lowestPrice = Math.min(...rats.filter(price => price));

         const sortedPrices = rats.filter(price => price).sort((a, b) => a - b);
          const secondLowestPrice = sortedPrices[4];

          console.log(secondLowestPrice);
         setLowestPrice(secondLowestPrice)
        // console.log(lowestPrice, "nehal")

            // console.log(
            //   result?.RES_Response?.RoomInfo?.[0]?.Source?.[0]?.RoomTypes?.[0]
            //     ?.RateType?.[0]
            // );
            setRoomRateInfo(
              result?.RES_Response?.RoomInfo?.[0]?.Source?.[0]?.RoomTypes?.[0]
                ?.RateType?.[0]
            );
            // dispatch(setisLoading(false))
            setisLoading(false)
          }
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, [priceShownEndData, priceShownStartData]);

  useEffect(() => {
    if (endDate) {
      const arrivalDate = moment(startDate).format("YYYY-MM-DD");
      const departureDate = moment(endDate).format("YYYY-MM-DD");

      const numberOfNights = moment(endDate).diff(moment(startDate), "days");
      const bookingDates = [
        {
          start: arrivalDate,
          end: departureDate,
          price: totalPrice * numberOfNights,
          numberOfNights: numberOfNights,
        },
      ];

      if (bookingDates) {
        dispatch(setBookingDate(bookingDates));
      }
    }
  }, [endDate]);

  const handleMonthChange = (increment) => {
    setSelectedMonth(selectedMonth.clone().add(increment, "month"));
  };

  const handleStart = () => {
    setStartDate(null);
  };

  const handleEnd = () => {
    setEndDate(null);
  };

  const renderMonth = (date) => {
    const startOfMonth = moment(date).startOf("month");
    const endOfMonth = moment(date).endOf("month");
    // const daysInMonth = endOfMonth.diff(startOfMonth, 'days') + 1;
    const startOfWeek = startOfMonth.clone().startOf("week");
    const endOfWeek = endOfMonth.clone().endOf("week");
    const daysInCalendar = endOfWeek.diff(startOfWeek, "days") + 1;

    const days = [];
    for (let i = 0; i < daysInCalendar; i++) {
      const day = startOfWeek.clone().add(i, "day");

      days.push(day);
    }

    const rows = [];
    let cells = [];
    const DEFAULT_PRICE = 100;
    const priceMap = {};

    if (
      RoomRateInfo &&
      RoomRateInfo?.FromDate &&
      RoomRateInfo?.FromDate.length > 0 &&
      RoomRateInfo?.RoomRate &&
      RoomRateInfo?.RoomRate.length > 0 &&
      RoomRateInfo?.RoomRate?.[0]?.Base &&
      RoomRateInfo?.RoomRate?.[0]?.Base.length > 0
    ) {
      const start = moment(RoomRateInfo.FromDate[0]);
      const end = moment(RoomRateInfo.ToDate[0]);

      // Set the price for the specified date range
      for (let date = start; date.isSameOrBefore(end); date.add(1, "day")) {
        const dateString = date.format("YYYY-MM-DD");
        // priceMap[dateString] = Math.trunc(RoomRateInfo.RoomRate[0].Base[0]);
        priceMap[dateString] = Math.floor(LowestPrice)
      }

      // Set the default price for any remaining dates
      for (let date = moment(); date.isSameOrBefore(end); date.add(1, "day")) {
        const dateString = date.format("YYYY-MM-DD");
        if (!priceMap[dateString]) {
          priceMap[dateString] = DEFAULT_PRICE;
        }
      }
    }

    days.forEach((day, index) => {
      if (index % 7 === 0) {
        rows.push(cells);
        cells = [];
      }
      const isPast = day.isBefore(moment(), "day");
      const price = priceMap[day.format("YYYY-MM-DD")];
      const priceDisplay = price ? `Rs: ${price}` : "";

      let className = `text-center ${
        day.isSame(date, "month") ? "" : "text-light "
      } 
  ${isPast ? "past-date disabled" : ""}`;
      if (day.isSame(startDate, "day")) {
        className += "selected-start-date bg-secondary text-light shadow-lg";
      } else if (day.isSame(endDate, "day")) {
        className += " selected-end-date bg-secondary text-light shadow-lg";
      } else if (
        startDate &&
        endDate &&
        day.isBetween(startDate, endDate, "day", "[]")
      ) {
        className += " selected-date-range bg-secondary text-light shadow-lg";
      }

      cells.push(
        <td
          key={day.format("YYYY-MM-DD")}
          className={className}
          style={{
            boxShadow: "0 0 3px rgba(0, 0, 0, 0.2)",
            cursor: "pointer",
            padding: 10,
          }}
          onClick={() => handleDateClick(day, priceDisplay)}
        >
          <div style={{ fontSize: 12, fontWeight: 400, fontFamily: "Tinos" }}>
            {day.format("D")}
          </div>
          <div style={{ fontSize: 12, fontWeight: 400, fontFamily: "Tinos" }}>
            {priceDisplay}
          </div>
        </td>
      );
    });

    rows.push(cells);

    const table = (
      <table className="table table-borderless table-sm">
        <thead>
          <tr>
            <th className="text-center" colSpan={7}>
              {date.format("MMMM YYYY")}
            </th>
          </tr>
          <tr>
            {moment.weekdaysShort().map((weekday) => (
              <th
                key={weekday}
                className="text-center"
                style={{ fontSize: 12 }}
              >
                {weekday}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>{row}</tr>
          ))}
        </tbody>
      </table>
    );

    return table;
  };

if(isLoading){
  return(
    <Loading/>
  )
}
 else{
  return (
    <Container>
      <Row style={{ margin: "1rem 0rem 2rem 0rem" }}>
        <Header
          startDate={startDate}
          handleStart={handleStart}
          handleEnd={handleEnd}
          endDate={endDate}
        />
      </Row>

      <Row style={{ display: "flex", justifyContent: "center", margin: 5 }}>
        <Col className="text-center">
          <Button
            variant="secondary"
            onClick={() => handleMonthChange(-1)}
            style={{ fontFamily: "Tonis", letterSpacing: 1, fontSize: 14 }}
          >
            PREV
          </Button>
        </Col>
        <Col className="text-center">
          <Button
            variant="secondary"
            onClick={() => handleMonthChange(1)}
            style={{ fontFamily: "Tonis", letterSpacing: 1, fontSize: 14 }}
          >
            NEXT
          </Button>
        </Col>
      </Row>

      <Row style={{ display: "flex", justifyContent: "center", margin: 5 }}>
        <Col>
          {/* <Card> */}
          {renderMonth(selectedMonth)}
          {/* </Card> */}
        </Col>
        <Col>{renderMonth(selectedMonth.clone().add(1, "month"))}</Col>
      </Row>
    </Container>
  );
 }

};

export default Calendar;

const Header = ({ startDate, endDate, handleStart, handleEnd }) => {
  const [start, setstart] = useState();
  const [end, setend] = useState();

  useEffect(() => {
    let arrivalDate;
    if (startDate !== null) {
      const arrival = new Date(startDate._d);
      arrivalDate = moment(arrival).format("dddd MMMM DD YYYY");
      // arrivalDate = arrival.toLocaleDateString("en-US", {
      //     weekday: "short",
      //     month: "short",
      //     day: "numeric",
      // });
    }

    let departureDate;
    if (endDate !== null) {
      const departure = new Date(endDate._d);
      departureDate = moment(departure).format("dddd MMMM DD YYYY");
      // departureDate = departure.toLocaleDateString("en-US", {
      //     weekday: "short",
      //     month: "short",
      //     day: "numeric",
      // });
    }
    setstart(arrivalDate);
    setend(departureDate);
  }, [handleStart, handleEnd]);

  return (
    <Container style={{ backgroundColor: "#dbd5cd", padding: "1.5rem 5rem" }}>
      <Row
        style={{
          justifyContent: "center",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Col
          style={{
            backgroundColor: "white",
            padding: "1rem 2rem",
            cursor: "pointer",
            marginRight: 10,
          }}
          onClick={handleStart}
          className="check"
        >
          <div
            style={{
              fontFamily: "Tinos",
              fontSize: 16,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              cursor: "pointer",
            }}
          >
            {start ? (
              <div>
                <i
                  className="bi bi-calendar"
                  style={{
                    padding: "0rem 3rem",
                    fontSize: 18,
                    fontStyle: "normal",
                    fontFamily: "Tinos",
                  }}
                >
                  {" "}
                  {start}
                </i>{" "}
              </div>
            ) : (
              <div>CHECKIN-DATE</div>
            )}
          </div>
        </Col>
        {/* <Col> */}
        <Col
          style={{
            backgroundColor: "white",
            padding: "1rem 2rem",
            marginLeft: 10,
            cursor: "pointer",
          }}
          onClick={handleEnd}
          className="check"
        >
          <div
            style={{
              fontFamily: "Tinos",
              fontSize: 16,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              cursor: "pointer",
            }}
          >
            {end ? (
              <div>
                <i
                  className="bi bi-calendar"
                  style={{
                    padding: "0rem 3rem",
                    fontSize: 18,
                    fontStyle: "normal",
                    fontFamily: "Tinos",
                  }}
                >
                  {" "}
                  {end}
                </i>{" "}
              </div>
            ) : (
              <div>CHECKOUT-DATE</div>
            )}
          </div>
        </Col>
        {/* </Col> */}
      </Row>
    </Container>
  );
};

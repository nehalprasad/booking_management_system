import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Carousel, Col, Container, Image, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setHotelDetails } from "../../../redux/reducers/hotelReducer";
import { useNavigate } from "react-router-dom";
import Loading from "../../loader/Loading";

function Packages() {

    const navigate = useNavigate();
    const dispatch = useDispatch();

  const bookingDates = useSelector((state) => state.date);
  // console.log(bookingDates?.numberOfNights)
  const customerInfo = useSelector((state) => state.customer);

  // const [PackagesData, setPackagesData] = useState([])
  const [RoomType, setRoomType] = useState([]);
  const [PackagesData, setPackagesData] = useState([]);
  const [Packages, setPackages] = useState([]);
  const [CheckPricePerNight, setCheckPricePerNight] = useState(false);
  const [CheckPriceWithTax, setCheckPriceWithTax] = useState(false)
  const [isLoading, setisLoading] = useState(true)

  const handleBookNowHandler = ( 
        hotelcode,
        roomrateunkid,
        roomtypeunkid,
        totalprice_room_only,
        Room_Name,
        ratetypeunkid,
        avg_per_night_without_tax

    ) => {
    if (avg_per_night_without_tax && hotelcode && roomrateunkid && roomtypeunkid && totalprice_room_only && Room_Name && ratetypeunkid) {
      const hotelDetails = [];
      const details = {
        avg_per_night_without_tax : avg_per_night_without_tax,
        hotelcode : hotelcode,
        roomrateunkid : roomrateunkid,
        roomtypeunkid :roomtypeunkid,
        totalprice_room_only : totalprice_room_only,
        Room_Name : Room_Name,
        ratetypeunkid : ratetypeunkid
      };
      hotelDetails.push(details);
      console.log(hotelDetails)
      if (Object.keys(hotelDetails).length === 1) {
        dispatch(setHotelDetails(hotelDetails));
        navigate("/user_details");
      }
    }
  };





  useEffect(() => {
    let totalAdults = 0;
    let totalChildrens = 0;

    if (customerInfo.length > 0) {
      customerInfo.forEach((element) => {
        totalAdults += parseInt(element.adults, 10);
        totalChildrens += parseInt(element.children, 10);
        let config = {
          method: "get",
          maxBodyLength: Infinity,
          url: `${process.env.REACT_APP_HotelUrl}/booking/reservation_api/listing.php?request_type=RoomList&HotelCode=${process.env.REACT_APP_HotelCode}&APIKey=${process.env.REACT_APP_AuthCode}&check_in_date=${bookingDates?.[0]?.start}&check_out_date=&num_nights=${bookingDates?.[0]?.numberOfNights}&number_adults=${totalAdults}&number_children=${totalChildrens}&num_rooms=${customerInfo.length}&promotion_code=&property_configuration_info=0&showtax=0&show_only_available_rooms=0&language=en&roomtypeunkid=&packagefor=DESKTOP&promotionfor=DESKTOP`,
        };

        axios
          .request(config)
          .then((response) => {
            setPackages(response?.data);

            const Package = response?.data;
            console.log(Package);

            // const uniqueRoomTypes = [...new Set(Package.map(obj => obj.Roomtype_Name))];
            // // console.log(uniqueRoomTypes)
            // // setRoomType(uniqueRoomTypes)

            const uniqueRoomTypes = [
              ...new Set(Package.map((obj) => obj.Roomtype_Name)),
            ];
            // const roomTypeArray = [];

            // uniqueRoomTypes.forEach(roomType => {
            // const images = Package
            //     .filter(obj => obj.Roomtype_Name === roomType)
            //     .flatMap(obj => obj.RoomImages);

            // roomTypeArray.push({ Roomtype_Name: roomType, Images: images });
            // });

            // console.log(roomTypeArray);
            // setRoomType(roomTypeArray)

            const roomTypeArray = [];

            Package.forEach((obj) => {
              const roomType = obj.Roomtype_Name || obj.room_main_image; // Use 'Roomtype_Name' or 'room_main_image' as the room type
              const image = obj.image || obj.room_main_image; // Use 'image' or 'room_main_image' as the image

              const existingRoomTypeObj = roomTypeArray.find(
                (item) => item.Roomtype_Name === roomType
              );

              if (existingRoomTypeObj) {
                existingRoomTypeObj.Images.push(image);
              } else {
                roomTypeArray.push({
                  Roomtype_Name: roomType,
                  Images: [image],
                });
              }
            });

            // console.log(roomTypeArray);
            setRoomType(roomTypeArray);

            const filterByRoomType = (roomTypeName) => {
              return Package.filter(
                (obj) => obj.Roomtype_Name === roomTypeName
              );
            };

            // Get arrays with the same Roomtype_Name
            const roomTypeArrays = uniqueRoomTypes.map((roomTypeName) =>
              filterByRoomType(roomTypeName)
            );

            //   console.log(roomTypeArrays);
            setPackagesData(roomTypeArrays);
            // Function to filter arrays with the same Roomtype_Name and value
            //   const filterByRoomTypeAndValue = (roomTypeName, value) => {
            //     return Package.filter(obj => obj.Roomtype_Name === roomTypeName && obj.Value === value);
            //   };
            //   // Get arrays with the same Roomtype_Name and value
            //   const roomTypeArrays = uniqueRoomTypes.map(roomTypeName => {
            //     const uniqueValues = [...new Set(Package.filter(obj => obj.Roomtype_Name === roomTypeName).map(obj => obj.Value))];
            //     return uniqueValues.map(value => filterByRoomTypeAndValue(roomTypeName, value));
            //   });

            //   console.log(roomTypeArrays);
            setisLoading(false)
          })
          .catch((error) => {
            console.log(error);
          });
      });
    }
  }, [bookingDates, customerInfo]);
  if(isLoading){
    return<Loading/>
  }
  else {
  return (
    <>
    <Row>
      <Col>
        <div
          style={{
            fontFamily: "Tinos",
            margin: "2rem 3.6rem",
            fontWeight: 400,
            fontSize: 18,
          }}
        >
          SHOW PRICE :{" "}
          <span
            style={{
              cursor: "pointer",
              textDecoration: CheckPricePerNight && "underline",
              color: CheckPricePerNight && "grey",
            }}
            onClick={() => {
              setCheckPricePerNight(true);
              console.log("Price Room Per Night");
            }}
          >
            Price Room Per Night{" "}
          </span>{" "}
          <span
            style={{
              cursor: "pointer",
              padding: "2px 12px",
              textDecoration: !CheckPricePerNight && "underline",
              color: !CheckPricePerNight && "grey",
            }}
            onClick={() => {
              setCheckPricePerNight(false);
              console.log("Price For Whole Stay");
            }}
          >
            {" "}
            Price For Whole Stay
          </span>
        </div>
      </Col>
      </Row>
      {RoomType &&
        RoomType?.map(({ Images, Roomtype_Name }, index) => {
          //   console.log(Images, Roomtype_Name);
          return (
            <Container
              key={index}
              style={{ 
                margin: "1rem 2rem", 
                boxShadow: "0 0 5px rgba(0,0,0, 0.2)",
                padding:'0px 30px'
             }}
            >
              <Row>
                <Col xl={6} lg={6} md={6} sm={6}>
                  <h3
                    style={{
                      fontFamily: "Tinos",
                      margin: "2rem 3.6rem",
                      fontWeight: 400,
                      fontSize: 32,
                    }}
                  >
                    {Roomtype_Name}
                  </h3>
                </Col>
              </Row>

              <Row>
                <Col
                  style={{ justifyContent: "center", display: "flex" }}
                  xl={4}
                  lg={4}
                  md={4}
                  sm={4}
                >
                  <Row
                    style={{
                    //   boxShadow: "0 0 5px rgba(0,0,0, 0.2)",
                      width: "500px",
                    }}
                  >
                    <Carousel
                      style={{ height: "100%", width: "100%" }}
                      interval={null}
                    >
                      {Images.map((key, id) => (
                        <Carousel.Item
                          key={id}
                        >
                          <Image
                            style={{ height: "100%", width: "100%" }}
                            src={key}
                          />
                        </Carousel.Item>
                      ))}
                    </Carousel>
                    {/* <Amenities AMENITIES={AMENITIES} description={description} /> */}
                  </Row>
                </Col>
                <Col xl={8} lg={8} md={8} sm={8}>
                  <h6
                    style={{
                      fontFamily: "Arimo",
                      padding: "0.2rem 1.6rem",
                      fontWeight: 600,
                    }}
                  >
                    CHOOSE A PACKAGE FROM BELOW
                  </h6>

                  {Packages.filter(
                    (pack) => pack.Roomtype_Name === Roomtype_Name
                  ).map(
                    (
                      {
                        hotelcode,
                        roomrateunkid,
                        roomtypeunkid,
                        RoomImages,
                        max_child_occupancy,
                        max_adult_occupancy,
                        Room_Name,
                        Room_Description,
                        Roomtype_Name,
                        Room_Max_adult,
                        Room_Max_child,
                        inclusion,
                        available_rooms,
                        room_rates_info,
                        totalprice_room_only,
                        extra_adult_rates_info,
                        extra_child_rates_info,
                        ShowPriceFormat,
                        currency_code,
                        currency_sign,
                        room_main_image,
                        min_ava_rooms,
                        ratetypeunkid
                      },
                      ind
                    ) => {
                      // console.log(Room_Name,Room_Description,Roomtype_Name,Room_Max_adult, Room_Max_child, inclusion,available_rooms, room_rates_info,totalprice_room_only, extra_adult_rates_info, extra_child_rates_info, ShowPriceFormat, currency_code,currency_sign, room_main_image, RoomImages)
                      // console.log(RoomImages)
                      return (
                        <Row
                          key={ind}
                          style={{
                            boxShadow: "0 0 5px rgba(0,0,0, 0.2)",
                            padding: "20px",
                            margin: "1rem 0rem",
                            backgroundColor:min_ava_rooms <= 0 && "grey",
                            cursor:min_ava_rooms <= 0 && `not-allowed` 
                          }}
                        >
                            <Row>
                            <div
                              style={{
                                letterSpacing: 2,
                                fontFamily: "Arimo",
                                fontSize: 16,
                                fontWeight: 600,
                              }}
                            >
                              {Room_Name}
                              <span style={{ fontWeight: 300, fontSize: 13 }}>
                                {"  "}{Room_Description}
                              </span>
                            </div>

                            </Row>
                          <Col xl={8} lg={8} md={8} className="mt-2">
                          <div
                              style={{
                                fontFamily: "Arimo",
                                letterSdivacing: 2,
                                fontSize: 15,
                              }}
                            >
                            ROOM RATES WITHOUT TAXES
                            </div>
                            
                            <div
                              style={{
                                fontFamily: "Tinos",
                                letterSdivacing: 2,
                                fontSize: 14,
                              }}
                            >
                              Room Capaxity
                              <br/>
                              <span style={{ padding: "0px 30px" }}>
                                <i
                                  class="fa fa-male"
                                  aria-hidden="true"
                                  style={{ fontSize: 28 }}
                                ></i>
                                <i
                                  style={{ fontSize: 28 }}
                                  class="fa fa-female"
                                  aria-hidden="true"
                                ></i>
                                {Room_Max_adult}
                              </span>
                              <i
                                class="fa fa-child"
                                aria-hidden="true"
                                style={{ fontSize: 20 }}
                              ></i>
                              {Room_Max_child}
                            </div>
                           
                            <Row style={{ alignItems: "center" }}>
                              <Col style={{ width: "30%" }}>
                                <div
                                  style={{
                                    fontFamily: "Tinos",
                                    fontWeight: 400,
                                    fontSize: 14,
                                  }}
                                >
                                </div>
                              </Col>
                              <Col>
                                <div
                                  style={{
                                    fontFamily: "Tinos",
                                    fontWeight: 600,
                                    fontSize: 18,
                                  }}
                                >
                                </div>
                              </Col>
                            </Row>
                          </Col>
                         
                          <Col
                            style={{
                              display: "grid",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            <Row>
                                <div
                                  style={{
                                    fontSize: 16,
                                    fontFamily: "Tinos",
                                    fontWeight: 500,
                                  }}
                                >
                                  {" "}
                                  {CheckPricePerNight &&
                                    "₹ " +
                                      room_rates_info?.avg_per_night_without_tax}
                                  {!CheckPricePerNight &&
                                    "₹ " +
                                      room_rates_info?.totalprice_inclusive_all}
                                  <br />
                                  {CheckPricePerNight && "Per Room Per Night"}
                                  {!CheckPricePerNight &&
                                    `Price for ${bookingDates?.[0]?.numberOfNights} Nights`}
                                </div>
                                <div style={{justifyContent:'space-between', display:'flex', alignItems:'center'}}>
                                  <span style={{fontSize:12}}>
                                  Hurry! {min_ava_rooms} Rooms Left  
                                    </span>  
                                 
                                <Button
                                  variant="dark"
                                  style={{
                                    padding: "0.5rem 1.1rem",
                                    border: "1px solid black",
                                    cursor: min_ava_rooms <= 0 && `not-allowed`
                                  }}
                                  disabled={min_ava_rooms <= 0}
                                  onClick={() => {
                                    if(min_ava_rooms > 0 ){
                                      handleBookNowHandler(
                                        hotelcode,
                                        roomrateunkid,
                                        roomtypeunkid,
                                        room_rates_info?.totalprice_room_only,
                                        Room_Name,
                                        ratetypeunkid,
                                        room_rates_info?.avg_per_night_without_tax

                                    )
                                    }
                                  
                                  }}
                                >
                                  BOOK
                                </Button>
                                </div>
                            </Row>
                          </Col>
                        </Row>
                      );
                    }
                  )}
                </Col>
              </Row>
            </Container>
          );
        })}
    </>
  );
      }
}

export default Packages;

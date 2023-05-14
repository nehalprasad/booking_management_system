import axios from 'axios';
import xml2js from 'xml2js';
import moment from 'moment';

const priceShownStartData = moment()
    .subtract(1, "months")
    .format("YYYY-MM-DD");
  const priceShownEndData = moment(priceShownStartData)
    .add(1, "year")
    .subtract(1, "day")
    .format("YYYY-MM-DD");

export const fetchRoomRateInfo = async (priceShownStartData, priceShownEndData) => {
  const data = `<RES_Request>   \r\n<Request_Type>Rate</Request_Type>\r\n   <Authentication>\r\n       <HotelCode>${process.env.REACT_APP_HotelCode}</HotelCode>\r\n       <AuthCode>${process.env.REACT_APP_AuthCode}</AuthCode>\r\n   </Authentication>\r\n   <FromDate>${priceShownStartData}</FromDate>\r\n   <ToDate>${priceShownEndData}</ToDate>\r\n</RES_Request>`;

  const config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: `${process.env.REACT_APP_HotelUrl}/pmsinterface/getdataAPI.php`,
    headers: {
      'Content-Type': 'application/xml',
    },
    data: data,
  };

  try {
    const response = await axios.request(config);
    const xmlString = response.data;
    return new Promise((resolve, reject) => {
      xml2js.parseString(xmlString, (err, result) => {
        if (err) {
          console.error(err);
          reject(err);
          return;
        }
        if (result) {
          const roomRateInfo =
            result?.RES_Response?.RoomInfo[0]?.Source[0]?.RoomTypes[0]?.RateType[0];
          resolve(roomRateInfo);
        }
      });
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};

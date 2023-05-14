import { combineReducers } from "@reduxjs/toolkit";
// import cardReducer from "./cardReducer";
import customerReducer from "./customerReducer";
import dateReducer from "./dateReducer";
import hotelReducer from "./hotelReducer";
import userReducer from "./userReducer";
import loaderReducer from "./loaderReducer";

const rootReducer = combineReducers({
  // card: cardReducer,
  date: dateReducer,
  customer: customerReducer,
  hotel : hotelReducer,
  user: userReducer,
  // loader : loaderReducer,
});

export default rootReducer;
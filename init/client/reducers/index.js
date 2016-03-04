import { combineReducers } from "redux";
import { routeReducer } from "react-router-redux";
import baseReducer from "./base";

const rootReducer = combineReducers({
  routing: routeReducer,
  base: baseReducer
});

export default rootReducer;

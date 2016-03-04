/**
 * Actions: Base
 *
 * Uses base api to fetch data for the test page.
 */
import { fetchBase as fetchBaseApi } from "../utils/api";

export const FETCH_BASE = "FETCH_BASE";
export const UPDATE_BASE = "UPDATE_BASE";
export const BASE_ERROR = "BASE_ERROR";

export const updateBase = (data) => {
  return {
    type: UPDATE_BASE,
    data
  };
};

export const baseError = (err) => {
  return {
    type: BASE_ERROR,
    err
  };
};

export const fetchBase = () => {
  return (dispatch) => {
    dispatch(() => ({type: FETCH_BASE}));

    return fetchBaseApi()
      .then((data) => {
        dispatch(updateBase(data));
      })
      .catch((err) => {
        dispatch(baseError(err));
      });
  };
};

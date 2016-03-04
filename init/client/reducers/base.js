import {
  FETCH_BASE,
  UPDATE_BASE,
  BASE_ERROR
} from "../actions/base";

export default (state = {
  base: null
}, action) => {
  switch (action.type) {
  case FETCH_BASE:
    return Object.assign({}, state, {
      base: null,
      baseError: null
    });
  case UPDATE_BASE:
    return Object.assign({}, state, {
      base: action.data.base,
      baseError: null
    });
  case BASE_ERROR:
    return Object.assign({}, state, {
      baseError: action.err.message || action.err.toString()
    });
  default:
    return state;
  }
};

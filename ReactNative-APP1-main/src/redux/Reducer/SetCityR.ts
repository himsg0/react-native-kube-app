/* eslint-disable prettier/prettier */
import {
    GET_CITY,
    FAIL_CITY,
    REQ_CITY,
    CLEAR_ERROR,
  } from '../Action/SetCityA';
  
  const initialState = {
    data:{}
  };
  
  
  export const SetCityR = (state = {initialState}, action) => {
    switch (action.type) {
      case REQ_CITY:
        return {
          loading: true,
          data: [],
        };
      case GET_CITY:
        return {
          loading: false,
          data: action.payload,
        };
      case FAIL_CITY:
        return {
          loading: false,
          error: {},
        };
      case CLEAR_ERROR:
        return {
          ...state,
          error: null,
        };
      default:
        return state;
    }
  };
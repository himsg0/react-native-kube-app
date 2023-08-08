/* eslint-disable prettier/prettier */
import axios from 'axios';

export const REQ_CITY = 'REQ_CITY';
export const GET_CITY = 'GET_CITY';
export const FAIL_CITY = 'FAIL_CITY';
export const CLEAR_ERROR = 'CLEAR_ERROR';

export const SetCityA = data => async dispatch => {
  try {
    console.log('seeeee', data);
    dispatch({
      type: GET_CITY,
      payload: data,
    });

    // console.log(data);
  } catch (error) {
    dispatch({
      type: FAIL_CITY,
      payload: error,
    });
  }
};

export const clearErrors = () => async dispatch => {
  dispatch({
    type: CLEAR_ERROR,
  });
};

/* eslint-disable prettier/prettier */
// import axios from "axios";
export const REQ_AUTHUSER = 'REQ_AUTHUSER';
export const GET_AUTHUSER = 'GET_AUTHUSER';
export const FAIL_AUTHUSER = 'FAIL_AUTHUSER';
export const CLEAR_ERROR = "CLEAR_ERROR";

export const AuthUserA = (data) => async dispatch => {
    console.log("Auth",data)
    try {
        dispatch({
            type: GET_AUTHUSER,
            payload: data,
        })    

    } catch (error) {
        dispatch({
            type: FAIL_AUTHUSER,
            payload: {error:'error while user login'},
        });
    }
};

export const clearErrors = () => async dispatch => {
    dispatch({
        type: CLEAR_ERROR,
    });
};
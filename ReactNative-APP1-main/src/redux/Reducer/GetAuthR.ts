/* eslint-disable prettier/prettier */
import {
    GET_AUTHUSER,
    FAIL_AUTHUSER,
    REQ_AUTHUSER,
    CLEAR_ERROR,
} from '../Action/GetAuthA';


const initialState = {
    user: [],
}

export const AuthUserR =
    (state = { initialState }, action) => {
        switch (action.type) {
            case REQ_AUTHUSER:
                return {
                    loading: true,
                    user: [],
                };
            case GET_AUTHUSER:
                return {
                    loading: false,
                    user: action.payload,
                };
            case FAIL_AUTHUSER:
                return {
                    loading: false,
                    error: action.payload,
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
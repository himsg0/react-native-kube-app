export const REQ_GETCAT = 'REQ_GETCAT';
export const GET_GETCAT = 'GET_GETCAT';
export const FAIL_GETCAT = 'FAIL_GETCAT';
export const CLEAR_ERROR = "CLEAR_ERROR";

export const GetCategoriesA = (data) => async dispatch => {
    console.log(data.length,"JJJ")
    try {
        dispatch({
            type: GET_GETCAT,
            payload: data,
        })    

    } catch (error) {
        dispatch({
            type: FAIL_GETCAT,
            payload: {error:'Error getting all Categories'},
        });
    }
};

export const clearErrors = () => async dispatch => {
    dispatch({
        type: CLEAR_ERROR,
    });
};
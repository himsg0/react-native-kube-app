

export const GET_CATEGORIES_FAIL = "GET_CATEGORIES_FAIL"
export const GET_CATEGORIES_SUCCESS = "GET_CATEGORIES_SUCCESS"
export const GET_CATEGORIES_REQUEST = "GET_CATEGORIES_REQUEST"
export const CLEAR_ERROR = "CLEAR_ERROR";

export const GetCategoriesA = (data) => async dispatch => {
    console.log(data.length,"JJJ")
    try {
        dispatch({
            type: GET_CATEGORIES_SUCCESS,
            payload: data,
        })    

    } catch (error) {
        dispatch({
            type: GET_CATEGORIES_FAIL,
            payload: {error:'Error getting all Categories'},
        });
    }
};

export const clearErrors = () => async dispatch => {
    dispatch({
        type: CLEAR_ERROR,
    });
};
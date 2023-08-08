


export const SEARCHSTORES_FAIL = "SEARCHSTORES_FAIL"
export const SEARCHSTORES_SUCCESS = "SEARCHSTORES_SUCCESS"
export const SEARCHSTORES_REQUEST = "SEARCHSTORES_REQUEST"
export const CLEAR_ERROR = "CLEAR_ERROR";

export const SetSearchStoresA = (data) => async dispatch => {
    console.log(data.length,"JJJ")
    try {
        dispatch({
            type: SEARCHSTORES_SUCCESS,
            payload: data,
        })    

    } catch (error) {
        dispatch({
            type: SEARCHSTORES_FAIL,
            payload: {error:'Error getting Search Stores'},
        });
    }
};

export const clearErrors = () => async dispatch => {
    dispatch({
        type: CLEAR_ERROR,
    });
};
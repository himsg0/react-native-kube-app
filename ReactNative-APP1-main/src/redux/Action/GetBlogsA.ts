


export const REQ_GETBLOG = 'REQ_GETBLOG';
export const GET_GETBLOG = 'GET_GETBLOG';
export const FAIL_GETBLOG = 'FAIL_GETBLOG';
export const CLEAR_ERROR = "CLEAR_ERROR";

export const GetBlogsA = (data) => async dispatch => {
    console.log(data.length,"JJJ")
    try {
        dispatch({
            type: GET_GETBLOG,
            payload: data,
        })    

    } catch (error) {
        dispatch({
            type: FAIL_GETBLOG,
            payload: {error:'Error getting all Blogs'},
        });
    }
};

export const clearErrors = () => async dispatch => {
    dispatch({
        type: CLEAR_ERROR,
    });
};
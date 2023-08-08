

export const GET_BLOGS_FAIL = "GET_BLOGS_FAIL"
export const GET_BLOGS_SUCCESS = "GET_BLOGS_SUCCESS"
export const GET_BLOGS_REQUEST = "GET_BLOGS_REQUEST"
export const CLEAR_ERROR = "CLEAR_ERROR";

export const GetBlogsA = (data) => async dispatch => {
    console.log(data.length,"JJJ")
    try {
        dispatch({
            type: GET_BLOGS_SUCCESS,
            payload: data,
        })    

    } catch (error) {
        dispatch({
            type: GET_BLOGS_FAIL,
            payload: {error:'Error getting all Blogs'},
        });
    }
};

export const clearErrors = () => async dispatch => {
    dispatch({
        type: CLEAR_ERROR,
    });
};
import { GET_BLOGS_FAIL ,GET_BLOGS_REQUEST, GET_BLOGS_SUCCESS, CLEAR_ERROR } from "../Action/GetBlogsA";

interface BlogState {
    loading?: boolean;
    blogs: any[];
    error?: string | null;
}

const initialState : BlogState = {
    blogs: [],
}

export const GetBlogsR =
    (state = { initialState }, action : any) => {
        switch (action.type) {
            case GET_BLOGS_REQUEST:
                return {
                    loading: true,
                    blogs: [],
                };
            case GET_BLOGS_SUCCESS:
                return {
                    loading: false,
                    blogs: action.payload,
                };
            case GET_BLOGS_FAIL:
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
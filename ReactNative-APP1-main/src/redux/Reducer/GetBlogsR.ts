

import {
    GET_GETBLOG,
    REQ_GETBLOG,
    FAIL_GETBLOG,
    CLEAR_ERROR,
} from '../Action/GetBlogsA';

interface BlogState {
    loading?: boolean;
    blog: any[];
    error?: string | null;
}

const initialState : BlogState = {
    blog: [],
}

export const GetBlogR =
    (state = { initialState }, action : any) => {
        switch (action.type) {
            case REQ_GETBLOG:
                return {
                    loading: true,
                    blog: [],
                };
            case GET_GETBLOG:
                return {
                    loading: false,
                    blog: action.payload,
                };
            case FAIL_GETBLOG:
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
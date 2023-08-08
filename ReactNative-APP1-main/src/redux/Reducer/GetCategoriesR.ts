import {
    GET_GETCAT,
    REQ_GETCAT,
    FAIL_GETCAT,
    CLEAR_ERROR,
} from '../Action/GetCategoriesA';

interface CategoryState {
    loading?: boolean;
    category: any[];
    error?: string | null;
}

const initialState : CategoryState = {
    category: [],
}

export const GetCategoryR =
    (state = { initialState }, action : any) => {
        switch (action.type) {
            case REQ_GETCAT:
                return {
                    loading: true,
                    category: [],
                };
            case GET_GETCAT:
                return {
                    loading: false,
                    category: action.payload,
                };
            case FAIL_GETCAT:
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
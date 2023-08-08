import { GET_CATEGORIES_SUCCESS, GET_CATEGORIES_REQUEST, GET_CATEGORIES_FAIL, CLEAR_ERROR } from "../Action/GetCategoriesA";

interface CategoryState {
    loading?: boolean;
    category: any[];
    error?: string | null;
}

const initialState : CategoryState = {
    category: [],
}

export const GetCategoriesR =
    (state = { initialState }, action : any) => {
        switch (action.type) {
            case GET_CATEGORIES_REQUEST:
                return {
                    loading: true,
                    category: [],
                };
            case GET_CATEGORIES_SUCCESS:
                return {
                    loading: false,
                    category: action.payload,
                };
            case GET_CATEGORIES_FAIL:
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
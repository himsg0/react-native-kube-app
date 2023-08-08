import { SEARCHSTORES_FAIL, SEARCHSTORES_REQUEST, SEARCHSTORES_SUCCESS, CLEAR_ERROR } from "../Action/SetSearchStoresA";

interface SearchStoreState {
    loading?: boolean;
    searchStores: any[];
    error?: string | null;
}

const initialState : SearchStoreState = {
    searchStores: [],
}

export const SetSearchStoresR =
    (state = { initialState }, action : any) => {
        switch (action.type) {
            case SEARCHSTORES_REQUEST:
                return {
                    loading: true,
                    searchStores: [],
                };
            case SEARCHSTORES_SUCCESS:
                return {
                    loading: false,
                    searchStores: action.payload,
                };
            case SEARCHSTORES_FAIL:
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
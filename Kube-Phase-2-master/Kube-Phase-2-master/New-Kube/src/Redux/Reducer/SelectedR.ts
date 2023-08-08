import {
    SELECTED_CITY,
    SELECTED_LOCALITY,
    HEADER_SEARCH,
    LISTCITY_REQUEST,
    LISTCITY_SUCCESS,
    LISTCITY_FAIL,
    LISTLOCALITY_REQUEST,
    LISTLOCALITY_SUCCESS,
    LISTLOCALITY_FAIL,
    CLEAR_ERRORS,
    OPEN_CLOSE_MENU,
    SCREEN_TOGGLE
} from "../Action/SelectedA";

export function cityNameR(state = { localityData: '', searchData: '' }, action) {

    switch (action.type) {
        case SELECTED_LOCALITY:
            return {
                ...state,
                localityData: action.payload
            }
            break;
        case HEADER_SEARCH:
            return {
                ...state,
                searchData: action.payload
            }

        default:
            return state
            break;
    }
}
export function selectedCityNameR(state = { selectedCityData: '' }, action) {

    switch (action.type) {
        case SELECTED_CITY:
            return {
                ...state,
                selectedCityData: action.payload
            }
        default:
            return state
    }
}
export function toggleModelR(state = { modelOpenCloseToggle: '' }, action) {

    switch (action.type) {
        case OPEN_CLOSE_MENU:
            return {
                ...state,
                modelOpenCloseToggle: action.payload
            }
        default:
            return state
    }
}
export function toggleScreensR(state = { screenToggle: '' }, action) {

    switch (action.type) {
        case SCREEN_TOGGLE:
            return {
                ...state,
                screenToggle: action.payload
            }
        default:
            return state
    }
}
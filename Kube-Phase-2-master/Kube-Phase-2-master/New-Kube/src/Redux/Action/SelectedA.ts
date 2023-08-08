export const SELECTED_CITY = "SELECETD_CITY"
export const SELECTED_LOCALITY = "SELECTED_LOCALITY"
export const HEADER_SEARCH ="HEADER_SEARCH"

export const LISTCITY_REQUEST ="LISTCITY_REQUEST"
export const LISTCITY_SUCCESS ="LISTCITY_SUCCESS"
export const LISTCITY_FAIL ="LISTCITY_FAIL"

export const LISTLOCALITY_REQUEST ="LISTLOCALITY_REQUEST"
export const LISTLOCALITY_SUCCESS ="LISTLOCALITY_SUCCESS"
export const LISTLOCALITY_FAIL ="LISTLOCALITY_FAIL"

export const CLEAR_ERRORS = "CLEAR_ERRORS";
export const OPEN_CLOSE_MENU = "OPEN_CLOSE_MENU";
export const SCREEN_TOGGLE = "SCREEN_TOGGLE";  

export const selectedCityA = (city) => {
    return {
        type: SELECTED_CITY,
        payload: city
    }
}

export const menuToggleA = (toggle) => {
    return {
        type: OPEN_CLOSE_MENU,
        payload: toggle
    }
}

export const screenToggleA = (data) => {
    console.log(">>>>",data);
    return {
        type: SCREEN_TOGGLE,
        payload: data
    }
}

export const selectedLocalityA = (locality) => {
    return {
        type: SELECTED_LOCALITY,
        payload: locality
    }
}
export const headerSearchA = (search) => {
    return {
        type: HEADER_SEARCH,
        payload: search
    }
}



import {
    combineReducers,
  } from 'redux';
  import thunk from 'redux-thunk';
  import {GetCategoriesR} from '../Reducer/GetCategorieR';
  import {selectedCityNameR, cityNameR, toggleModelR, toggleScreensR} from "../Reducer/SelectedR"
  import {SetSearchStoresR} from "../Reducer/SetSearchStoresR"
  import {GetBlogsR} from "../Reducer/GetBlogsR"
  
  export  default combineReducers({
    GetCategoriesR,
    selectedCityNameR,cityNameR,toggleModelR,toggleScreensR,
    SetSearchStoresR,
    GetBlogsR,
  });
  
  
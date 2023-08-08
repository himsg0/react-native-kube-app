import {
  legacy_createStore as createStore,
  combineReducers,
  applyMiddleware,
} from 'redux';
import {
  blogReducer,
  blogCategoryReducer,
  SingleBlogReducer,
  RelatedBlogReducer,
} from '../reducers/BlogReducer';
import thunk from 'redux-thunk';
import {GetCategoryR} from '../Reducer/GetCategoriesR';
import { GetBlogR } from '../Reducer/GetBlogsR';
import { AuthUserR } from '../Reducer/GetAuthR';
import {SetCityR} from '../Reducer/SetCityR'

const middleware = [thunk];

const rootReducer = combineReducers({
  AuthUserR,
  SetCityR,
  GetCategoryR,
  GetBlogR
});

export const Store = createStore(rootReducer, applyMiddleware(...middleware));

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import thunk from "redux-thunk"
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { Provider } from "react-redux";
import rootReducer from "./Redux/Store/Store";

let initialState = {}

const middleware = [thunk];

const store=createStore(rootReducer,initialState,composeWithDevTools(applyMiddleware(...middleware)))

ReactDOM.render(
   <Provider store={store}>
     <App />
  </Provider>,
    
  
  document.getElementById('root')
);


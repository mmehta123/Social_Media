import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from "react-redux";
import { applyMiddleware, createStore, compose } from "redux"
import thunk from "redux-thunk";
import reducers from "./reducers"
import './index.css'
import reportWebVitals from "./reportWebVitals"


const store = createStore(reducers, compose(applyMiddleware(thunk)));

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>
    , document.getElementById('root')
);  
reportWebVitals();
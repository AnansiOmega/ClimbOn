import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router } from "react-router-dom";
import { App } from './App'
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import rootReducer from './Reducers/index'
import thunk from 'redux-thunk'
import { API_WS_ROOT } from './constants/index'
import { ActionCableProvider } from 'react-actioncable-provider'
import './assets/css/app.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import "assets/scss/material-kit-react.scss?v=1.9.0";

const hist = createBrowserHistory();


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))

ReactDOM.render(
  <Provider store={store}>
    <Router history={hist}>
      <ActionCableProvider url={API_WS_ROOT}>
        <App />
      </ActionCableProvider>
    </Router>
  </Provider>,
  document.getElementById("root")
);

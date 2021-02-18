import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router } from "react-router-dom";
import { App } from './App'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import rootReducer from './Reducers/index'

import './assets/css/app.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import "assets/scss/material-kit-react.scss?v=1.9.0";

const hist = createBrowserHistory();
const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

ReactDOM.render(
  <Provider store={store}>
    <Router history={hist}>
      <App />
    </Router>
  </Provider>,
  document.getElementById("root")
);

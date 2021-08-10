// import 'react-app-polyfill/stable';
import React from 'react';
import ReactDOM from 'react-dom';
import './Styles/index.scss';
import App from './Routers/AppRouter';
import store from "./store/store";
import { Provider } from "react-redux";




ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);


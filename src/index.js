import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';


import { createStore } from 'redux';
import reducer from './reducers/merch-list-reducer'

import { Provider } from 'react-redux';

export const store = createStore(reducer);
store.subscribe(()=> console.log(store.getState()))
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);



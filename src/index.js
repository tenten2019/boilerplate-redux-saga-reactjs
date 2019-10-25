import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { delay } from 'redux-saga/effects'
import { composeWithDevTools } from 'redux-devtools-extension';
import { Provider } from 'react-redux';
// import rootStore from './redux/store'
import App from './App';
import * as serviceWorker from './serviceWorker';

const rootReducer = (state = [], action) => {
  switch (action.type) {
    case 'In':
      return [...state, action.payload];
  
    default:
      return state;
  }
}

function* rootSaga() {
  yield delay(1000)
  
}

const sagaMiddleware = createSagaMiddleware();

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(sagaMiddleware)));

sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

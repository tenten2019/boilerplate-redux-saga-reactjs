import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { put, takeEvery, delay} from 'redux-saga/effects';
import { composeWithDevTools } from 'redux-devtools-extension';
import App from './App';
import * as serviceWorker from './serviceWorker';

const initState = {
  count: 0
}

const rootReducer = (state = initState, actions) => {
  switch(actions.type) {
    case 'In':
      return {...state, count: state.count + actions.payload}
    default:
      return state
  }
}

function* inasync() {
  yield delay(500)
  yield put({type: 'In',payload: 6})
}

function* rootSaga() {
  yield takeEvery('In_Async', inasync)
}

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(sagaMiddleware)),
);

sagaMiddleware.run(rootSaga)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
  ,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

import {createStore,applyMiddleware,compose} from 'redux';
// import chunk,{middleware as apiMiddlerware} from 'redux-chunk';
import createSagaMiddleware from 'redux-saga';
import reducer from '../reducer';

import {composeWithDevTools } from 'redux-devtools-extension';

import mySaga from '../sagas';
const sagaMiddleware = createSagaMiddleware();

let middleware = compose(applyMiddleware(sagaMiddleware),composeWithDevTools());

// const store  = createStore(reducer,composeWithDevTools());
const store  = createStore(reducer,middleware);

sagaMiddleware.run(mySaga);

export default store;
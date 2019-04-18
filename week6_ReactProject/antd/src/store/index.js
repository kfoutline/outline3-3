import {createStore,applyMiddleware,compose} from 'redux';
// import chunk,{middleware as apiMiddlerware} from 'redux-chunk';
import reducer from '../reducer';

import {composeWithDevTools } from 'redux-devtools-extension';

import rootSaga,{increment} from '../sagas';

import createSagaMiddleware from 'redux-saga';

// 创建saga中间件
const sagaMiddleware = createSagaMiddleware();

// 合并中间件
let middleware = compose(applyMiddleware(sagaMiddleware),composeWithDevTools());

// const store  = createStore(reducer,composeWithDevTools());

// 将 sagaMiddleware 连接至 Store
const store  = createStore(reducer,applyMiddleware(sagaMiddleware));

// 运行 Saga
sagaMiddleware.run(rootSaga);

export default store;
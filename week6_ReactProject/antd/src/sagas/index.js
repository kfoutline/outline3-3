import { put, takeEvery,takeLatest,all,call} from 'redux-saga/effects';

import {CHANGE_QTY} from '../actions/cartAction';

import {getGoods} from '../api';

const delay = (ms) => new Promise(res => setTimeout(res, ms));

export function* increment(){
    console.log('Hello Sagas!');
    // yield delay(1000);
    let goodsInfo = yield call(getGoods,'226857');
    console.log('goodsInfo',goodsInfo);
    yield put({ 'type': 'increment' });
}

function *changeQtyAsync(action){console.log('changeQtyAsync',action)
    yield delay(2000);
    yield put({ type: CHANGE_QTY,payload:action.payload});
}

function* watchIncrement(){console.log('watchIncrement')
    yield takeEvery('INCREMENT',increment);
}

function* watchchangeQty(){console.log('watchchangeQty')
    yield takeLatest('CHANGE_QTY_ASYNC',changeQtyAsync);
}

export default function* rootSaga(){
    yield all([watchIncrement(),watchchangeQty()])
};
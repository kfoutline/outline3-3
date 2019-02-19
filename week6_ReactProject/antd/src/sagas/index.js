import { put, takeEvery,takeLatest,all } from 'redux-saga/effects';

import {CHANGE_QTY} from '../actions/cartAction';

const delay = (ms) => new Promise(res => setTimeout(res, ms));

function* increment(){
    console.log('Hello Sagas!');
    yield delay(1000);
    yield put({ type: 'increment' });
}

function *  changeQty(action){
    yield delay(2000);
    yield put({ type: CHANGE_QTY,payload:action.payload});
}

function* watchIncrementAsync(){
    yield takeEvery('INCREMENT',increment);
}

function* watchchangeQty(){
    yield takeLatest('change_qty',changeQty);
}

export default function* mySaga(){console.log('saga')
    yield all([watchIncrementAsync(),watchchangeQty()])
};
import {combineReducers} from 'redux';

import cartReducer from './cartReducer';
import commonReducer from './commonReducer';

const rootReducer = {
    cart:cartReducer,
    common:commonReducer
}

export default combineReducers(rootReducer);
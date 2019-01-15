import {combineReducers} from 'redux';

import cartReducer from './cartReducer';
import productsReducer from './productsReducer';

let rootReducer = combineReducers({
    cartReducer,
    productsReducer
});

export default rootReducer;
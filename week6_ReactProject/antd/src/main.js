import React from 'react';
import {render} from 'react-dom';

// 引入组件类型
import {HashRouter,BrowserRouter} from 'react-router-dom';

import {Provider} from 'react-redux';
import store from './store';
// import context from './store/context';


import App from './App';

render(
    <Provider store={store}>
        <HashRouter>
            <App/>
        </HashRouter>
    </Provider>
    ,
    document.querySelector('#app')
)
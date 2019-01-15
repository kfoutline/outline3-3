import React,{Component} from 'react';
import {render} from 'react-dom';

import {BrowserRouter,HashRouter,Route} from 'react-router-dom';

import App from './component/App';
import UserRouter from './component/UserRouter';

import store from './store';
import {addToCart} from './actions/cart-actions'

// let ele = React.createElement('div',{className:'box'},'test box');
// console.log('ele:',ele);

// 自定义路由

console.log('initial:',store.getState());
let unsubscribe = store.subscribe(()=>{
	console.log('update:',store.getState())
});

store.dispatch(addToCart('iphoneX',1,1998));
store.dispatch(addToCart('node',10,998));

unsubscribe();

render(
	<HashRouter>
		<App/>
	</HashRouter>,
	// React.createElement('div',{className:'box'},'test box'),
	// <UserRouter/>,
	document.getElementById('app')
);
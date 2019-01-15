import React,{Component} from 'react';
import {render} from 'react-dom';

import Test from './component/Test';
import MyForm from './component/MyForm';
import InnerHTML from './component/InnerHTML';
import MyRouter from './component/MyRouter';

import hoc from './component/higherOrderComponent';
import ajaxhoc from './component/ajaxComponent';


class TestRouter extends Component{
	render(){
		return <div><h4>这是我的路由（{JSON.stringify(this.props.data)}）</h4></div>
	}
}

// let Res = hoc(TestRouter,'username');
// let Res2 = hoc(TestRouter,'commentList');
TestRouter = ajaxhoc(TestRouter,'class');
TestRouter = hoc(TestRouter,'current');

render(
	<div className="myapp">
		<Test/>
		<MyForm/>
		<InnerHTML/>
		<MyRouter path="/test" component={TestRouter}/>
		<TestRouter/>
	</div>,
	document.getElementById('app')
)
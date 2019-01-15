import React,{Component} from 'react';
import {render} from 'react-dom';

import {Router,BrowserRouter,HashRouter,Switch,Route,Redirect,Link,NavLink} from 'react-router-dom';

// 引入样式
import './sass/common.scss';

let Home = (props)=>{
	return <div className="home">首页</div>
}

let List = (props)=>{
	let Phone = ()=>{
		return <div>热门手机</div>
	}
	let Computer = ()=>{
		return <div>热门电脑</div>
	}
	let Pad = ()=>{
		return <div>热门平板</div>
	}
	let Acc = ()=>{
		return <div>热门配件</div>
	}
	return <div className="list">

		<h4>商品列表</h4>
		<div className="subnav">
			<NavLink to={props.match.url + "/computer"} activeClassName="active">电脑</NavLink>
			<NavLink to={props.match.url + "/pad"} activeClassName="active">平板</NavLink>
			<NavLink to={props.match.url + "/acc"} activeClassName="active">配件</NavLink>
		</div>

		<Switch>
			<Route path={props.match.path + "/phone"} component={Phone}/>
			<Route path={props.match.path + "/computer"} component={Computer}/>
			<Redirect from={props.match.path} to={props.match.path + "/computer"} exact />
			<Route path={props.match.path + "/pad"} component={Pad}/>
			<Route path={props.match.path + "/acc"} component={Acc}/>
		</Switch>
	</div>
}

let Goods = (props)=>{console.log(props)
	//获取商品id
	let id = props.match.params.id;console.log(id);
	return <div className="goods">
	<h4>商品详情</h4>
		
	</div>
}

let Cart = ()=>{
	return <div className="cart">购物车</div>
}

let routes = [{
	path:'/',
	component:Home
},
{
	path:'/list',
	component:List
},{
	path:'/goods',
	component:Goods
},{
	path:'/cart',
	component:Cart
}]

class App extends Component{
	handlerEnter(){
		console.log(666);
	}
	render(){
		return <div className="app">
			<nav className="nav">
				<NavLink to="/home" activeClassName="active">首页</NavLink>
				<NavLink to="/list" activeClassName="active">列表</NavLink>
				<NavLink to="/goods" activeClassName="active">详情</NavLink>
				<NavLink to="/cart" activeClassName="active">购物车</NavLink>
			</nav>
			<Switch onEnter={this.handlerEnter}>
		
				<Route path="/home" component={Home}/>
				{/*<Route path="\/" render={()=><Redirect to="/home"/>}/>*/}
				<Redirect from="\/" to="/home" exact />
				<Route path="/list" component={List}/>
				<Route path="/goods" component={Goods} exact/>
				<Route path="/goods/:id" component={Goods}/>
				<Route path="/cart" component={Cart}/>
				<Redirect to='\/' />
			</Switch>
		</div>
	}
}

render(
	<HashRouter>
		<App/>
	</HashRouter>,
	document.getElementById('app')
);
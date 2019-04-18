import React,{Component} from 'react';

// 路由
import {withRouter,Switch,Route,Redirect} from 'react-router-dom';
import * as rr from 'react-router-dom';console.log(rr)

import {TabBar} from 'antd-mobile';

import PropTypes from 'prop-types';

// 引入样式
import '../sass/common.scss';


import Home from './Home';
import GoodsList from './GoodsList';
import Goods from './Goods';
import NotFound from './NotFound';
import Me from './Me';
import Icon from './Icon';


class App extends Component{
	static contextTypes = {
		router:PropTypes.object
	}
	constructor(){
		super();

		this.state = {
			currentTab:'home',
			count:0
		}
	}

	tabs = [
		{
			name:'home',
			title:'首页',
			icon:'home',
			path:'/'
		},
		{
			name:'list',
			title:'商品列表',
			icon:'grabber',
			path:'/list'
		},
		{
			name:'goods',
			title:'商品详情',
			icon:'jersey',
			path:'/goods'
		},
		{
			title:'我的',
			icon:'person',
			path:'/me'
		}
	]


	handlerChange(tab){
		this.setState({
			currentTab:tab.name
		});

		// 编程式导航
		// this.context.router.history.push(tab.path);
		this.props.history.push(tab.path);
	}

	handlerTest = ()=>{
		console.log(2323)
	}

	componentDidMount(){
		console.log(this);

		// this.setState({count:this.state.count+1});
		// this.setState({count:this.state.count+1});
		// this.setState({count:this.state.count+1});
		this.setState(prev=>({count:prev.count+1}));
		this.setState(prev=>({count:prev.count+1}));
		this.setState(prev=>({count:prev.count+1}));
		console.log(this.state.count);
		setTimeout(()=>{
			console.log('end:',this.state.count);
			
		},0)
	}

	render(){console.log('render...')
		return <div className="myapp">
			<div className="content">
			<Switch>
				{/*<Route path="/" component={Home} exact></Route>*/}
				<Route path="/home" component={Home}></Route>
				<Route path="/list" component={GoodsList}></Route>
				<Route path="/goods" exact component={Goods}></Route>
				<Route path="/goods/:id" component={Goods}></Route>
				<Route path="/me" component={Me}></Route>

				{/*重定向*/}
				<Redirect from="/" to="/home" exact></Redirect>

				{/*404*/}
				<Route component={NotFound}></Route>
			</Switch>
			</div>
			<TabBar tintColor='#f60' noRenderContent={true}>
				{
					this.tabs.map(tab=>{
						let selected = this.state.currentTab===tab.name;
						return <TabBar.Item 
						title={tab.title} 
						icon={<Icon type={tab.icon}/>} 
						selectedIcon={<Icon type={tab.icon} color="#f60"/>} 
						key={tab.icon} 
						selected={selected} 
						onPress={this.handlerChange.bind(this,tab)}
						>
							
						</TabBar.Item>
					})
				}
			</TabBar>
			
			
			
			
		</div>
	}
}

export default withRouter(App);
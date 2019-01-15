import React,{Component} from 'react';
import {NavLink,Switch,Route} from 'react-router-dom';


export default class GoodsList extends Component{
	constructor(){
		super();
		this.state = {
			menu:[
				{
					text:'鞋子',
					path:'/shoes'
				},
				{
					text:'衣服',
					path:'/close'
				},
				{
					text:'帽子',
					path:'/maozi'
				}
			]
		}
	}
	render(){
		let {match} = this.props;
		return <div className="list">
			<ul>
			{
				this.state.menu.map((item,idx)=>{
					return <NavLink to={match.path + item.path} key={idx}>{item.text}</NavLink>
				})
			}
			</ul>
			<Switch>
				{/*<Route path="/" component={Home} exact></Route>*/}
				<Route path={match.url+'/close'} render={()=>{return <div>我的衣服</div>}}></Route>
				<Route path={match.url+'/maozi'} render={()=>{return <div>我的帽子</div>}}></Route>
				<Route path={match.url+'/shoes'} render={()=>{return <div>我的鞋子</div>}}></Route>
			</Switch>
		</div>
	}
}
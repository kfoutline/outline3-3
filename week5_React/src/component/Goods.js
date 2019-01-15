import React,{Component} from 'react';


export default class Goods extends Component{
	render(){
		console.log('goods:',this.props);
		return <div className="goods">
			<h2>商品详情</h2>
		</div>
	}
}
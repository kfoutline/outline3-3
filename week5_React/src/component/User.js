import React,{Component} from 'react';

// 新版本React已废除createClass方法，而采用ES6语法
let User = React.createClass({
	getDefaultProps(){
		return {
			name:'laoxie'
		}
	},
	getInitialState(){
		return {
			name:'laoxie'
		}
	},
	render(){
		console.log(this);
		return <div className="box">
			React.createClass
		</div>
	}
});

export default User;
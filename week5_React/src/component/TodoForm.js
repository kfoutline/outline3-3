import React,{Component} from 'react';

import PropTypes from 'prop-types';

import Button from './Button';

export default class TodoForm extends Component{
	// 声明并验证context
	static contextTypes = {
		handlerAdd:PropTypes.func
	}

	constructor(){
		super();

		this.state = {
			keyword:''
		}


		this.handlerChangeKeyword = this.handlerChangeKeyword.bind(this);
		this.handlerAdd = this.handlerAdd.bind(this);
		this.handlerKeyup = this.handlerKeyup.bind(this);
	}

	handlerChangeKeyword(e){
		this.setState({
			keyword:e.target.value
		});
	}

	handlerAdd(){
		this.context.handlerAdd(this.state.keyword);
		this.state.keyword = '';
		this.refs.keyword.focus();
	}

	// 回车发送消息
	handlerKeyup(e){
		if(e.keyCode === 13){
			this.handlerAdd();
		}
	}
	
	render(){console.log(this)
		return <div className="form">
			<div className="input-group">
				<input type="text" className="form-control" ref="keyword" value={this.state.keyword} onChange={this.handlerChangeKeyword} onKeyUp={this.handlerKeyup}/>
				<div className="input-group-append">
					<Button className="btn btn-success" onClick={this.handlerAdd}>添加</Button>
				</div>
			</div>
		</div>	
	}
}
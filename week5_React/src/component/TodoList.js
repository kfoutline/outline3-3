import React,{Component} from 'react';

import PropTypes from 'prop-types';

import TodoForm from './TodoForm';
import TodoContent from './TodoContent';

import '../html/css/bootstrap.css';

/*
	添加：
		* 回车发送消息
		* 优化代码
 */

export default class TodoList extends Component{

	constructor(){
		super();

		this.state = {
			data:[
				{
					content:'今天放假',
					done:false
				},
				{
					content:'明天睡懒觉',
					done:false
				}
			]
		}

		// 改变this指向
		this.handlerAdd = this.handlerAdd.bind(this);
		this.handlerComplete = this.handlerComplete.bind(this);
		this.handlerRemove = this.handlerRemove.bind(this);
	}


	// 设置context
	static childContextTypes = {
		handlerAdd:PropTypes.func,
		handlerComplete:PropTypes.func,
		handlerRemove:PropTypes.func,
		testNum:PropTypes.number
	}
	getChildContext(){
		return {
			handlerAdd:this.handlerAdd,
			handlerComplete:this.handlerComplete,
			handlerRemove:this.handlerRemove,
			testNum:100
		}
	}

	// 添加事项函数
	handlerAdd(text){
		let arr = [...this.state.data];

		arr.push({
			content:text,
			done:false
		})

		this.setState({
			data:arr
		})
	}

	// 完成操作
	handlerComplete(idx){console.log('list:',this)
		let arr = [...this.state.data];
		arr[idx].done = true;

		this.setState({
			data:arr
		});
	}

	// 删除操作
	handlerRemove(idx){
		let arr = [...this.state.data];
		arr.splice(idx,1);

		this.setState({
			data:arr
		});
	}

	render(){
		return <div className="todolist container">
			<h4>待办事项</h4>
			<TodoForm/>
			<TodoContent data={this.state.data} />
		</div>	
	}
}
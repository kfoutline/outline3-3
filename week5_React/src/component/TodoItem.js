import React,{Component} from 'react';

import PropTypes from 'prop-types';

import Button from './Button';

export default class TodoItem extends Component{

	// 声明并验证context
	static contextTypes = {
		handlerComplete:PropTypes.func,
		handlerRemove:PropTypes.func,
	}
	
	render(){console.log(this)
		let {data,idx} = this.props;
		let {handlerComplete,handlerRemove} = this.context;
		return <tr className={data.done ? 'table-success' : ''}>
			<td>{idx+1}</td>
			<td>{data.content}</td>
			<td>{data.done}</td>
			<td>
				<div className="btn-group">
					<Button className="btn btn-outline-success" onClick={handlerComplete.bind(this,idx)}>完成</Button>
					<Button className="btn btn-outline-danger" onClick={handlerRemove.bind(this,idx)}>删除</Button>
				</div>
			</td>
		</tr>	
	}
}
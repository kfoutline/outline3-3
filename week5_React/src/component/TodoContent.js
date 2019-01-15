import React,{Component} from 'react';

import TodoItem from './TodoItem';

export default class TodoContent extends Component{
	
	render(){
		
		return <table className="table">
			<thead>
				<tr>
					<th>#</th>
					<th>待办事项</th>
					<th>是否完成</th>
					<th>操作</th>
				</tr>
			</thead>
			<tbody>
				{
					this.props.data.map((item,idx)=>{
						return <TodoItem 
						data={item} 
						idx={idx} 
						key={idx}
						/>
					})
				}
			</tbody>
		</table>	
	}
}
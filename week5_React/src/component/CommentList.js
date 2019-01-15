import React,{Component} from 'react';

import CommentItem from './CommentItem';

import PropTypes from 'prop-types';

export default class CommentList extends Component{
	static propTypes = {
		comments:PropTypes.array
	}

	render(){
		let {comments} = this.props;

		return <div className="list">
			<h4>评论列表</h4>
			<ul className="list-group list-group-flush">
			{
				comments.map((comment,idx)=><CommentItem key={idx} comment={comment} idx={idx} handlerRemove={this.props.handlerRemove}/>)
				
			}
			</ul>
		</div>
	}
}
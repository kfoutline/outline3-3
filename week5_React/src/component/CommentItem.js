import React,{Component} from 'react';

import PropTypes from 'prop-types';

export default class CommentItem extends Component{
	//ES7支持写法
	static defaultProps = {
		comment:{}
	}

	static propTypes = {
		comment:PropTypes.object
	}

	constructor(){
		super();
		this.state = {
			timeString:''
		}

		this._formatTimeString = this._formatTimeString.bind(this);
	}


	// 格式化已发布时间
	_formatTimeString(){
		let comment = this.props.comment;

		// 计算时间差
		let offset = 0;
		if(typeof comment.date != 'object'){
			offset = new Date() - new Date(comment.date);
		}else{
			offset = new Date() - comment.date;
		}

		offset /= 1000;

		let timeString = '';

		// 显示不同时间
		if(offset >= 60*60*24){
			timeString = `${Math.round(offset / (60*60*24))} 天前`;
		}else if(offset >= 60*60){
			timeString = `${Math.round(offset / (60*60))} 小时前`;
		}else if(offset >= 60){
			timeString = `${Math.round(offset / 60)} 分钟前`;
		}else{

			timeString = `${Math.round(Math.max(offset, 1))} 秒前`;
		}
		this.setState({
			timeString
		});
		
	}


	// 处理html代码
	_getSafeContent (content) {
	    return content
	      .replace(/&/g, "&amp;")
	      .replace(/</g, "&lt;")
	      .replace(/>/g, "&gt;")
	      .replace(/"/g, "&quot;")
	      .replace(/'/g, "&#039;")
	      .replace(/`([\S\s]+?)`/g, '<code>$1</code>');
	  }

	componentWillMount(){console.log(111)
		this._formatTimeString();

		this._timer = setInterval(this._formatTimeString,5000);
	}

	componentWillUnmount(){console.log(222)
		clearInterval(this._timer);
	}



	render(){
		let {comment} = this.props;
		return <li className="list-group-item">
			<strong>{comment.username}：</strong>
			{
			//<div className="content">{comment.content}</div>
			}
			<div className="content" dangerouslySetInnerHTML={{__html:this._getSafeContent(comment.content)}}></div>
			<span className="badge badge-primary badge-pill">{this.state.timeString}</span>
			<button className="close" style={{position:'absolute',right:0,top:10,fontSize:16}} onClick={()=>{this.props.handlerRemove(this.props.idx)}}>
			  <span>&times;</span>
			</button>
		</li>
	}
}

// ES6支持写法
// CommentItem.defaultProps = {
// 	comment:''
// }
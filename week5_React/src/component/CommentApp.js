import React,{Component} from 'react';

import '../html/css/bootstrap.css';

import CommentForm from './CommentForm.js';
import CommentList from './CommentList.js';

export default class CommentApp extends Component{
	constructor(){
		super();
		this.state = {
			comments:[{
				username:'laoxie',
				content:'如果你不能拼爹，那只能拼命',
				date:'2018-10-1'
			}]
		}

		this.add = this.add.bind(this);
		this.remove = this.remove.bind(this);
	}

	add(comment){
		let arr = [...this.state.comments];
		comment.date = new Date();
		arr.push(comment);
		this.setState({
			comments:arr
		},()=>{
			localStorage.setItem('commentList',JSON.stringify(this.state.comments))
		});

	}
	remove(idx){
		let arr = [...this.state.comments];
		arr.splice(idx,1);
		this.setState({
			comments:arr
		},()=>{
			localStorage.setItem('commentList',JSON.stringify(this.state.comments))
		});
	}

	componentWillMount(){
		let comments = localStorage.getItem('commentList');
		try{
			comments = JSON.parse(comments);
		}catch(err){
			comments = [...this.state.comments];
		}
		this.setState({
			comments
		});
	}

	render(){
		return <div className="container">
			<CommentForm handlerAdd={this.add}/>
			<CommentList comments={this.state.comments} handlerRemove={this.remove}/>
		</div>
	}
}
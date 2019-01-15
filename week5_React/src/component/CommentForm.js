import React,{Component} from 'react';


import PropTypes from 'prop-types';

export default class CommentForm extends Component{
	static propTypes = {
		handlerAdd:PropTypes.func
	}

	constructor(){
		super();
		this.state = {
			username:'',
			content:'',

			usernameClassName:'form-control',
			contentClassName:'form-control',
		}

		this.handlerSubmit = this.handlerSubmit.bind(this);
		this.handlerChangeUsername = this.handlerChangeUsername.bind(this);
		this.handlerChangeContent = this.handlerChangeContent.bind(this);
		this.handlerKeyup = this.handlerKeyup.bind(this);
		this.handlerUsernameBlur = this.handlerUsernameBlur.bind(this);
	}

	handlerSubmit(){
		let {username,content} = this.state;

		// 表单验证
	    if (!username.trim()){
	    	return this._getFormClassName('username',false);
	    }
	    if (!content.trim()){
			return this._getFormClassName('content',false);
	    }

		this.props.handlerAdd({username,content});


		// 清空并自动获得焦点
		this.setState({
			content:''
		});
		this.textarea.focus();
	}

	handlerChangeUsername(e){
		this._getFormClassName('username',e.target.value);
		this.setState({
			username:e.target.value
		});
	}

	handlerUsernameBlur(e){
		this._saveUsername(e.target.value);
	}

	handlerChangeContent(e){
		this._getFormClassName('content',e.target.value);
		this.setState({
			content:e.target.value
		});
	}

	handlerKeyup(e){
		if(e.keyCode === 13){
			this.handlerSubmit();
			e.preventDefault();
		}

	}

	// 生命周期
	// 自动显示本地存储用户名
	componentWillMount(){
		// 自动写入用户名
		let username = localStorage.getItem('username');
		if(username){
			this.setState({
				username
			});
		}
	}

	// 自动获得焦点
	componentDidMount(){
		this.textarea.focus();
	}

	_formatClassName(classset={},base=''){
		let className = base;
		for(let key in classset){
			if(classset[key]){
				className += ' ' + key
			}
		}

		return className;
	}

	_getFormClassName(field,valid){
		this.setState({
			[field+'ClassName']:this._formatClassName({'is-invalid':!valid},'form-control')
		});
	}

	// 保存用户名到localStorage
	_saveUsername(username){
		localStorage.setItem('username',username);
	}

	render(){
		return <div className="form py-3">
			<h2>评论</h2>
			<div className="form-group">
				<label htmlFor="username">用户名：</label>
				<input type="text" id="username" className={this.state.usernameClassName} value={this.state.username} onChange={this.handlerChangeUsername} onBlur={this.handlerUsernameBlur} ref={ele=>this.username=ele} />
				<div className="invalid-feedback">请输入用户名</div>
			</div>
			<div className="form-group">
				<label htmlFor="content">内容：</label>
				<textarea id="content" className={this.state.contentClassName} value={this.state.content} onChange={this.handlerChangeContent} onKeyUp={this.handlerKeyup} ref={ele=>this.textarea=ele} />
				<div className="invalid-feedback">必须填写评论内容</div>
			</div>
			<div className="form-group text-right">
				<button className="btn btn-success" onClick={this.handlerSubmit}>发布</button>
			</div>
		</div>
	}
}
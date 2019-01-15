import React,{Component} from 'react';



export default class App extends Component{
	constructor(){
		super();

		this.state = {
			username:'1234',
			content:''
		}

		this.reverseUsername = this.reverseUsername.bind(this);
		this.contentHandler = this.contentHandler.bind(this);
	}

	reverseUsername(e){
		let username = e.target.value;
		this.setState({
			username
		})
	}

	contentHandler(e){
		let content = e.target.value;
		if(content.length>=10){
			content = content.slice(0,10);
		}

		this.setState({
			content
		});
	}

	render(){
		return <div className="form">
			<div className="form-group">
				<label htmlFor="username">用户名</label>
				<input type="text" id="username" className="form-control" value={this.state.username} onChange={this.reverseUsername} />
			</div>
			<div className="form-group">
				<label htmlFor="content">内容</label>
				<textarea id="content" className="form-control" value={this.state.content} onChange={this.contentHandler}></textarea>
			</div>
			<div className="form-group">
				<button className="btn btn-success">发布</button>
			</div>
		</div>
	}
}
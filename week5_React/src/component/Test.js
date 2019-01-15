import React,{Component} from 'react';



export default class App extends Component{
	constructor(){
		super();

		this.state = {
			count:0
		}
	}

	changeState(){
		// 两次输出都为0
		// console.log(this.state.count);
		// this.setState({
		// 	count:1
		// });
		// console.log(this.state.count);


		// 以下count始终为1
		// this.setState({count:1});
		// this.setState({count:this.state.count+1});
		// this.setState({count:this.state.count+1});

		// setState队列
		// 后续操作依赖前一个 setState 的结果
		this.setState(state=>({count:1}),function(){console.log(this.state.count)});
		this.setState(state=>({count:state.count+1}),function(){console.log('成功2')});
		this.setState(state=>{
			console.log('end:',state.count);
			return {count:state.count+1}
		},function(){console.log('成功3')});

		console.log(this.state.count);

		setTimeout(()=>{
			console.log(this.state.count);
		},1000)
	}

	render(){
		return <button className="test" onClick={this.changeState.bind(this)}>点我有惊喜</button>
	}
}
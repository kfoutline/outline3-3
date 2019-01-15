import React,{Component} from 'react';
import {render} from 'react-dom';

import PropTypes from 'prop-types';

// import connect,{Provider} from './react-redux';


import {createStore} from 'redux';
import {Provider,connect} from 'react-redux';


//添加观察者模式的createStore
/*function createStore(reducer){
	let state = reducer();
	let listeners = [];
	const subscribe = listener=>{listeners.push(listener)}
	const getState = ()=>state;
	const dispatch = action=>{
		state = reducer(state,action);

		listeners.forEach(listener=>{
			listener();
		})
	}
	return {getState,dispatch,subscribe}
}
*/

class Index extends Component{
	componentDidMount(){
		function renderApp (newState,oldState={}) {
			if(newState === oldState) return;
			console.log('render app...');
			renderTitle(newState.title,oldState.title);
			renderContent(newState.content,oldState.content);
		}

		function renderTitle (newTitle,oldTitle={}) {
			if(newTitle === oldTitle) return;
			console.log('render title...');
			const titleDOM = document.getElementById('title');
			titleDOM.innerHTML = newTitle.text;
			titleDOM.style.color = newTitle.color;
		}

		function renderContent (newContent,oldContent) {
			if(newContent === oldContent) return;
			console.log('render content...');
			const contentDOM = document.getElementById('content');
			contentDOM.innerHTML = newContent.text;
			contentDOM.style.color = newContent.color;
		}

		function stateChanger (state,action) {
			if(!state){
				return {
				  title: {
				    text: 'laoxie',
				    color: 'red',
				  },
				  content: {
				    text: 'lemon',
				    color: 'blue'
				  }
				}
			}
			switch (action.type) {
				case 'UPDATE_TITLE_TEXT':
					return {
						...state,
						title:{
							...state.title,
							title:action.text
						}
					}
				case 'UPDATE_TITLE_COLOR':
					return{
						...state,
						title:{
							...state.title,
							color:action.color
						}
					}

				default:
					return state;
			}
		}
		let store = createStore(stateChanger);

		let oldState = store.getState();

		//添加监听
		//数据有修改，执行这里的代码
		store.subscribe(()=>{
			let newState = store.getState();
			renderApp(newState,oldState);
			oldState = newState;
		});

		renderApp(oldState);

		// 修改数据
		store.dispatch({
			type:'UPDATE_TITLE_TEXT',text:'tiantian'
		});
		store.dispatch({
			type:'UPDATE_TITLE_COLOR',text:'red'
		});
	}
	render(){
		return <div className="myredux">
			<div id="title"></div>
			<div id="content"></div>
		</div>
	}
}

// 定义reducer
const themeReducer = (state,action)=>{
	if(!state){
		return{
			color:'red'
		}
	}

	switch(action.type){
		case 'UPDATE_COLOR':
			return{
				...state,
				color:action.color
			}
		default:
			return state;
	}
}

const store = createStore(themeReducer);


const mapStateToProps = (state) => {
  return {
    color: state.color
  }
}
const mapDispatchToProps = (dispatch)=>{
	return {
	    onSwitchColor: (color) => {
	      dispatch({ type: 'UPDATE_COLOR', color });
	    }
	}
}


class Header extends Component{
	render(){
		return <div className="header" style={{color:this.props.color}}>
			laoxie
		</div>
	}
}
Header = connect(mapStateToProps)(Header);

class Content extends Component{
	render(){
		return <div className="content" style={{color:this.props.color}}>
			<p>内容</p>
			<ThemeSwitch />
		</div>
	}
}
Content = connect(mapStateToProps)(Content);


class ThemeSwitch extends Component{

	handlerChangeColor(color){
		if(this.props.onSwitchColor){
			this.props.onSwitchColor(color);
		}
	}
	render(){
		return <div>
			<button onClick={this.handlerChangeColor.bind(this,'red')} style={{color:this.props.color}}>red</button>
			<button onClick={this.handlerChangeColor.bind(this,'blue')} style={{color:this.props.color}}>blue</button>
		</div>
	}
}
ThemeSwitch = connect(mapStateToProps,mapDispatchToProps)(ThemeSwitch);


class App extends Component{
	
	render(){
		return <div className="app">
			<Header/>
			<Content/>
		</div>
	}
}

render(
	<Provider store={store}>
		<App/>
	</Provider>,
	document.getElementById('app')
);
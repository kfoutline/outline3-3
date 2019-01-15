import React,{Component} from 'react';
import PropTypes from 'prop-types';

/*
	自定义路由
 */

class MyRouter extends Component{
	static propTypes = {
		path:PropTypes.string,
		component:PropTypes.func
	}

	constructor(){
		super();
		this.state = {
			match:false
		}
	}

	componentWillMount(){
		this.setState({
			match:window.location.hash.substr(1) === this.props.path
		});
	}

	componentDidMount(){
		window.addEventListener('hashchange',()=>{
			let hash=window.location.hash.substr(1);
			this.setState({
				match:hash === this.props.path
			});
		})
	}

	render(){
		return this.state.match ? React.createElement(this.props.component) : null;
	}
}

export default MyRouter;
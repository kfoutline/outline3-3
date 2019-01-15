import React,{Component} from 'react';
import PropTypes from 'prop-types';

// 高阶组件connect
const connect = (mapStateToProps,mapDispathToProps)=>WrappedComponent=>{
	class Connect extends Component{
		static contextTypes = {
			store:PropTypes.object
		}

		constructor(){
			super();
			this.state = {
				allProps:{}
			}
		}

		componentWillMount(){
			let {store} = this.context;
			this._updateProps();
			store.subscribe(()=>{this._updateProps()})
		}

		_updateProps(){
			let {store} = this.context;
			let state = store.getState();
			let stateProps = mapStateToProps ? mapStateToProps(state) : {};
			let dispatchProps = mapDispathToProps ? mapDispathToProps(store.dispatch) : {};

			this.setState({
				allProps:{
					...stateProps,
					...dispatchProps,
					...this.props
				}
				
			});
		}

		render(){
			return <WrappedComponent {...this.state.allProps}/>
		}
	}

	return Connect;
}

class Provider extends Component{
	// 验证组件数据类型
	static propTypes = {
	    store: PropTypes.object,
	    children: PropTypes.any
	 }

	//把数据写入context
	static childContextTypes = {
		store:PropTypes.object
	}
	getChildContext(){
		return {
			store:this.props.store
		}
	}

	render(){
		return  <div>{this.props.children}</div>
	}
}

export default connect;
export {Provider};
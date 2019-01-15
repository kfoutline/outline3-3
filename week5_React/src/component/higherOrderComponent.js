import React,{Component} from 'react';


export default (OldComponent,name)=>{console.log(name)
	class NewComponent extends Component{
		constructor(){
			super();
			this.state = {
				data:null
			}
		}

		componentWillMount(){
			let data = localStorage.getItem(name);
			this.setState({data})
		}

		render(){
			return <OldComponent data={this.state.data}/>;
		}
	}

	return NewComponent;
}
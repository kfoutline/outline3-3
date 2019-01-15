import React,{Component} from 'react';

import axios from 'axios';


export default (OldComponent,name)=>{console.log(name)
	class NewComponent extends Component{
		constructor(){
			super();
			this.state = {
				data:null
			}
		}

		componentWillMount(){
			let current = this.props.data;console.log(current)
			axios.get('/api/'+name,{
				params:{
					current
				}
			}).then(res=>{
				let data = res.data;
				this.setState({data})
				
			});
		}

		render(){
			return <OldComponent data={this.state.data}/>;
		}
	}

	return NewComponent;
}
import React,{Component} from 'react';

//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// <FontAwesomeIcon icon="stroopwafel" />

// 小图标
import icons from 'octicons';

import PropTypes from 'prop-types';


class Icon extends Component{

	render(){
		let icon = icons[this.props.type];
		icon.options.className = icon.options.class;

		// 去除内置class属性
		delete icon.options.class;

		// 获取path所有属性
		// 达到同样效果：dangerouslySetInnerHTML={{__html:icon.path}}
		let attrs = icon.path.match(/(?!=\s)[a-z\-]+\=".+?"/g);
		let props = {};
		attrs.forEach(attr=>{
			let arr = attr.split('=');
			arr[0] = arr[0].split('-').map((item,idx)=>{
				if(idx>0){
					item = item[0].toUpperCase()+item.slice(1);
				}
				return item;
			}).join('');

			props[arr[0]] = arr[1].replace(/^"|"$/g,'');
		});

		return <svg {...icon.options} style={{fill:this.props.color}}>
			<path  {...props}/>
		</svg>
	}
}

Icon.defaultProps = {
	color:'inherit'
}

Icon.propTypes = {
	type:PropTypes.string.isRequired,
	color:PropTypes.string
}



export default Icon;
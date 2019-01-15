
/*
	dangerouslySetInnerHTML: 给元素设置html内容
 */

import React,{Component} from 'react';
export default ()=>{
	let html = '<h4>html内容测试</h4>'
	return <div className="container" dangerouslySetInnerHTML={{__html:html}}>
		
	</div>
}
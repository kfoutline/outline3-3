import React,{Component} from 'react';
import {render} from 'react-dom';

import TodoList from './component/TodoList';

render(
	<div className="myapp">
		<TodoList/>
	</div>,
	document.getElementById('app')
)
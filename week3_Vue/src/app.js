import Vue from 'vue';
import App from './app.vue';

import './css/bootstrap.css';
import './sass/page.scss';

new Vue({
	el:'#app',
	render(create){
		return create(App);
	}
});


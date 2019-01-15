import Vue from 'vue';
import App from './App.vue';

// 引入路由配置
import router from './router';


new Vue({
	el:'#app',
	router,
	render(create){
		return create(App);
	}
})

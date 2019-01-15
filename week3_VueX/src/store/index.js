import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

// 引入其他store模块
import home from './home.js';
import top250 from './top250.js';

export default new Vuex.Store({
	modules:{
		home,
		top250
	}
});
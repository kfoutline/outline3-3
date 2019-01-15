<template>
	<div class="container">
		<keep-alive include="Search">
			<router-view></router-view>
		</keep-alive>
		<mt-tabbar v-model="currentTab" fixed>
		  <mt-tab-item :id="tab.id" v-for="(tab,idx) in tabs" @click.native="goto(tab.id)" :key="idx">
			<!-- <img :src="tab.icon" slot="icon"> -->
			<!-- <div v-html="tab.icon.toSVG()"></div> -->
			<myicons :type="tab.icon"/>
		    {{tab.title}}
		  </mt-tab-item>
		</mt-tabbar>
	</div>
</template>
<script>
	import Vue from 'vue';

	// 图标
	import Icons from './plugins/icons';
	Vue.use(Icons);

	// 引入axios
	import axios from 'axios';
	// 注入原型，避免多次导入
	Vue.prototype.$http = axios;


	import { Tabbar, TabItem,Indicator } from 'mint-ui';
	Vue.component(Tabbar.name,Tabbar)
	Vue.component(TabItem.name,TabItem)
	// Vue.component(Indicator.name,Indicator)
	// Vue.prototype.$loading = Indicator;

	// 一次性加载MintUI
	import MintUI from 'mint-ui';
	Vue.use(MintUI);
	import 'mint-ui/lib/style.css';
	import './sass/base.scss';

	// loading效果
	// 利用axios拦截器全局设置
	axios.interceptors.request.use(config => {
		Indicator.open();
		return config
	}, error => {
	  Indicator.close();
	  
	  return Promise.reject(error)
	})
	// http响应拦截器
	axios.interceptors.response.use(data => {
		// 响应成功关闭loading
		Indicator.close();
		return data
	}, error => {
	  Indicator.close();
	  return Promise.reject(error)
	})




	export default {
		data(){
			return {
				tabs:[
					{
						title:'首页',
						id:'Home',
						icon:'home'
					},
					// {
					// 	title:'正在热映',
					// 	id:'in_theaters',
					// 	icon:'device-camera-video'
					// },
					// {
					// 	title:'即将上映',
					// 	id:'coming_soon',
					// 	icon:'history'
					// },
					// {
					// 	title:'新片榜',
					// 	id:'new_movies',
					// 	icon:'versions'
					// },
					// {
					// 	title:'TOP250',
					// 	id:'top250',
					// 	icon:'list-ordered'
					// },
					{
						title:'电影列表',
						id:'List',
						icon:'list-ordered'
					},
					{
						title:'我的',
						id:'Mine',
						icon:'history'
					}
					

				],
				currentTab:this.$route.name
			}
		},
		computed:{
			icons(){
				return this.tabs.map(item=>{
					return icons[item.icon]
				})
			}
		},
		methods:{
			goto(name){
				// this.currentTab = name;
				this.$router.push({name});
			}
		},
		mounted(){
			// 设置图标路径
			// this.tabs.forEach(tab=>{
			// 	tab.icon = 'assets/open-iconic-master/svg/' + tab.icon + '.svg';
			// });

			// 写入所需svg文件
			// this.icons = this.tabs.map(item=>{
			// 	return icons[item.icon].path
			// })
		}
	}
</script>
<style>
	svg path{fill: inherit;}
	.mint-tabbar img{filter: drop-shadow(rgb(0, 204, 153) 0 0px);}
	.mint-tabbar svg{width:20px;height:20px;margin-bottom:5px;}
	.is-selected svg{color:#f60;fill:#f60;}
	.mint-tabbar > .mint-tab-item.is-selected{color:#f60;}
</style>
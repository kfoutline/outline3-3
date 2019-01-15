import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '@com/home.vue';
import List from '@com/List.vue';
import Mine from '@com/Mine.vue';

import search from '@com/search.vue';
import in_theaters from '@com/in_theaters.vue';
import coming_soon from '@com/coming_soon.vue';
import new_movies from '@com/new_movies.vue';
import weekly from '@com/weekly.vue';
import top250 from '@com/top250.vue';
import detail from '@com/detail.vue';
import citylist from '@com/citylist.vue';


// 手动安装路由插件
Vue.use(VueRouter);


export default new VueRouter({
	routes: [
		{
			path: '/home',
			name: 'Home',
			component: Home,
			props:true
		},
		{
			path: '/',
			redirect:from=>{
				return '/home'
			}
		},
		// {
		// 	path: '/list',
		// 	name: 'List',
		// 	redirect:{path:'/list/in_theaters'}
		// },
		// {
		// 	path: '/list/:type',
		// 	component: List
		// },
		
		{
			path: '/list',
			// name: 'List',
			component: List,
			children:[
				// 注意：如果有默认子路由，则需删除父路由的name，并写到默认子路由中
				{
					path:'/',
					name:'List',
					redirect:{name:'in_theaters'}
				},
				{
					path: 'in_theaters',
					name: 'in_theaters',
					component: in_theaters
				},
				{
					path: 'coming_soon',
					name: 'coming_soon',
					component: coming_soon
				},
				{
					path: 'new_movies',
					name: 'new_movies',
					component: new_movies
				},
				// {
				// 	path: 'weekly',
				// 	name: 'weekly',
				// 	component: weekly
				// },
				{
					path: 'top250',
					name: 'top250',
					component: top250
				}
			]
		},
		
		{
			path: '/detail/:id',
			name: 'Detail',
			component: detail,
			props:true
		},
		{
			path:'/citylist',
			name:'CityList',
			component:citylist
		},
		{
			path: '/search',
			name: 'Search',
			component: search,

			// 布尔模式：route.params 将会被设置为组件属性
			props:true
			
		},
		{
			path: '/mine',
			name: 'Mine',
			component: Mine,

			// 对象模式：数据自动称为组件属性
			props:{name:'laoxie',age:18}
		}
	]
});
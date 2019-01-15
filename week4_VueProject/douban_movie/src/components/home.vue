<template>
	<div class="home">
		<mt-header title="电影资讯网">
			<router-link to="/citylist" slot="left">
			   <mt-button>[{{currentCity}}]</mt-button>
			 </router-link>
			<mt-button icon="search" slot="right" @click="search"></mt-button>
		</mt-header>
		<mt-swipe :auto="4000">
			<mt-swipe-item v-for="item in items" :key="item.id">
				<img :src="item.images.large"/>
			</mt-swipe-item>
		</mt-swipe>
		<ul class="datalist flexlist">
			<li v-for="item in datalist" :key="item.id" @click="showDetail(item.id)">
				<img :src="item.images.small" />
				<h4>{{item.title}}</h4>
			</li>
		</ul>
	</div>
</template>
<script>
	import Vue from 'vue';
	import { Header,Swipe,SwipeItem,Button } from 'mint-ui';

	Vue.component(Header.name,Header);
	Vue.component(Swipe.name,Swipe);
	Vue.component(SwipeItem.name,SwipeItem);
	Vue.component(Button.name,Button);

	// import axios from 'axios';
	// import $ from 'jquery';

	// import { Indicator } from 'mint-ui';

	export default {
		props:['city'],
		data(){
			return {
				items:[],
				datalist:[],
				keyword:'碟中谍6'
			}
		},
		computed:{
			currentCity(){
				return this.city || '广州'
			}
		},
		watch:{
			// 监听currentCity，改变则重新请求数据
			currentCity(){
				this.getMovie();
			}
		},
		created(){
			// 进入先请求一次数据
			this.getMovie();
		},
		methods:{
			showDetail(id){
				this.$router.push({name:'Detail',params:{id}});
			},
			search(){
				// 手动跳转路由
				this.$router.push({name:'Search',params:{id:123},meta:{a:2},query:{keyword:this.keyword}});
			},
			loadTop(){
				this.$refs.loadmore.onTopLoaded();
			},

			loadMore(){

			},

			// 获取正在热映电影
			getMovie(){
				// this.$loading.open();
				this.$http.post('/api/in_theaters',{
					city:this.currentCity.replace(/市$/,''),
					count:12
				}).then(res=>{
					let data = res.data;
					console.log(data);

					this.datalist = data.subjects;

					this.items = data.subjects.slice(0).sort((a,b)=>{
						return a.collect_count-b.collect_count
					}).slice(0,3);

					// this.$loading.close();

				});
			}
		}
	}
</script>
<style scoped>
	.mint-swipe{height:200px;}
	.mint-swipe img{width:100%;}
</style>
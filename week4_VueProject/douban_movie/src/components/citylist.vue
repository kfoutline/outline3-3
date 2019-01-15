<template>
	<div class="citylist">
		<mt-header title="选择城市">
		  <router-link to="/" slot="left">
		    <mt-button icon="back">返回</mt-button>
		  </router-link>
		</mt-header>
		<mt-index-list>
		  <mt-index-section :index="letter" v-for="(citylist,letter) in indexCity" v-if="citylist.length>0" :key="letter">
		    <mt-cell :title="city.name" v-for="city in citylist" @click.native="setCurrentCity(city.name)" :key="city.id"></mt-cell>
		  </mt-index-section>
		</mt-index-list>
	</div>
</template>
<script>
	import CityList from '@/mock/citylist';
	export default {
		data(){
			return {
				indexCity:[]
			}
		},
		methods:{
			setCurrentCity(city){
				this.$router.push({name:'Home',params:{city}});
			}
		},
		created(){
			CityList.then(res=>{
				this.indexCity = res;
			});
			

			
		},
		mounted(){
			// this.$nextTick(()=>{
			// 	document.querySelector('.box').style.textAlignLast = 'justify';
			// })
		}
	}
</script>
<template>
	<div class="weekly">
		<mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore">
			<ul>
				<li v-for="item in items">{{ item }}</li>
			</ul>
		</mt-loadmore>
	</div>
</template>
<script>

	export default {
		data(){
			return {
				items:[],
				allLoaded:true
			}
		},
		methods:{
			loadTop(){
				console.log('loadTop')
			},
			loadBottom(){
				console.log('loadBottom')
			}
		},
		created(){
			
		}
	}
</script>
<style scoped>
	
</style>
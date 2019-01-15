<template>
	<div class="app">
		<product1></product1>
		<product2></product2>
	</div>
</template>

<script>
	import product1 from './components/product1.vue';
	import product2 from './components/product2.vue';

	export default{
		components:{
			product1,
			product2
		}
	}
</script>
<style>
	.product ul{list-style: none;padding:0;margin:0;}
	.product li{padding:10px;border:1px solid #ddd;margin:10px;}
	.product1 li{display:inline-block;}
	.price{color:#f00;}
	.price::before{
		content:'￥';
	}
</style>
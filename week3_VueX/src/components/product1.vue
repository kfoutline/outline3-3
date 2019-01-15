<template id="pd1">
	<div class="product product1">
		<ul>
			<li v-for="goods in products" :key="goods.id">
				<strong>{{goods.name}}</strong>
				<span class="price">{{goods.price}}</span>
			</li>
		</ul>
	</div>
</template>

<script>
	import {mapState} from 'vuex';

	export default{
		name:'product1',
		data(){
			return {
				products:this.$store.state.home.products
			}
		},
		computed:mapState({
			productlist:state=>state.home.products,
			home:'home',
			a(state){console.log(666)
				return 100
			}
		}),
		mounted(){
			console.log('x:',this.productlist,this.home)
			console.log('y:',this.$store.state.top250,this.a)
		}
	}
</script>
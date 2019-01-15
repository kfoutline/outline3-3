<template id="pd2">
	<div class="product product2">
		<ul>
			<li v-for="goods in products" :key="goods.name">
				<strong>{{goods.name}}</strong>
				<span class="price">{{goods.price}}</span>
			</li>
		</ul>
		<button @click="changePrice" id="btn1">改变价格</button>
		<button @click="changePriceAsync" id="btn2">改变价格</button>
		<button @click="change3(pl)">sss</button>
	</div>
</template>

<script>
	import {mapState,mapGetters,mapMutations,mapActions} from 'vuex';

	export default{
		name:'product2',
		data(){
			return {
				// products:this.$store.getters.saleProducts,
				// ...mapState({a:state=>state.a})
			}
		},
		computed:{
			...mapState({
				products(state){
					return state.home.products
				}
			})
		},
		methods:{
			...mapMutations([
				'change'//映射this.change为$.store.commit('change')
			]),
			...mapMutations({
				change2:(commit,payload)=>{
					commit('change',payload)
				},
				change3:'change'
			}),
			...mapActions({
				changeasync(dispatch,payload){
					dispatch('changeAsync',payload)
				}
			}),
			changePrice(){
				// 这里改变价格，product1中的价格没有发生变化, 是因为getters将价格进行了缓存
				this.$store.commit('change',item=>{
					item.price -= 2;
				});
			},
			changePriceAsync(){
				
				this.$store.dispatch('changeAsync',item=>{
					item.price += 2;
				});
			},
			pl(item){
				// console.log(item)
				item.price += 10
			}
		},
		mounted(){
			console.log('::',this)
		}
	}
</script>
export default {
	// 类似于组件中的data属性
	// 能通过this.$store.state让所有的组件共享
	state:{
		products:[
            {name: '鼠标', price: 20},
            {name: '键盘', price: 40},
            {name: '耳机', price: 60},
            {name: '显示屏', price: 80}
        ],
        city:'广州'
	},

	// 类似于组件中的computed属性
	// 能通过this.$store.getters让所有的组件共享
	getters:{
		saleProducts(state){
			console.log(state);

			return state.products.map(item=>{
				return {
					price:item.price/2,
					name:item.name
				}
			});
		}
	},

	// mutations
	// 类似于组件中的methods,函数参数为(state,payload)
	// 能通过this.$store.commit(type,payload)触发，进而修改state或getters中的数据
	mutations:{
		change(state,payload){
			state.products.forEach(item=>{
				payload(item);
			});
		}
	},

	// actions
	// 类似于mutations，函数参数为(context,payload)，其中context为类似与store的对象（拥有共同的state,getters,commit,dispatch）
	// 通过this.$store.dispatch()触发，间接触发mutations
	actions:{
		changeAsync(context,payload){
			console.log(context,this);

			// 延迟两秒执行
			setTimeout(()=>{
				context.commit('change',payload);

			},2000)
		}
	}
}
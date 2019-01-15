export default {
	// 类似于组件中的data属性
	// 能通过this.$store.state让所有的组件共享
	state:{
		show:true
	},

	// 类似于组件中的computed属性
	// 能通过this.$store.getters让所有的组件共享
	getters:{
		
	},

	// mutations
	// 类似于组件中的methods,函数参数为(state,payload)
	// 能通过this.$store.commit(type,payload)触发，进而修改state或getters中的数据
	mutations:{
		
	},

	// actions
	// 类似于mutations，函数参数为(context,payload)，其中context为类似与store的对象（拥有共同的state,getters,commit,dispatch）
	// 通过this.$store.dispatch()触发，间接触发mutations
	actions:{
		
	}
}
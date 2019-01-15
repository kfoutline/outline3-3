<template>
	<div class="container">
		<my-nav></my-nav>
		<h1>Hello Webpack</h1>
		<div class="btn-group">
			<button class="btn btn-success">点击进入</button>
			<button class="btn btn-info">详情</button>
		</div>

		<TodoList/>
		<Step :step="5"/>
		<Transition/>
	</div>
</template>

<script>
	import MyNav from './components/mynav.vue'
	import TodoList from './components/Todolist.vue'
	import Step from './components/Step.vue'
	import Transition from './components/Transition.vue'

	export default{
		components:{
			MyNav,
			TodoList,
			Step,
			Transition
		}
	}
</script>

<style scoped>
	h1{color:#58bc58;}
</style>
<template>
	<div>
		<nav class="nav">
			<a class="nav-link active" href="#" v-for="item in navs">{{item}}</a>
		</nav>
		<div class="content">
			<h2>导航内容</h2>
		</div>
	</div>
</template>

<script>
	import '../sass/page.scss';
	export default{
		data(){
			return {
				navs:['首页','列表页','详情','购物车']
			}
		}
	}
</script>
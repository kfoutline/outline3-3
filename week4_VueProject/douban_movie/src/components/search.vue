<template>
	<div class="home">
		<mt-search v-model="keyword" @input="search" :show="true">
			<mt-cell v-for="(item,idx) in result" :key="idx" @click.native="gotoDetail(item.id)"
			  :title="item.title"
			  :label="getCasts(item.casts)"
			  value="详情">
			</mt-cell>
		</mt-search>
	</div>
</template>
<script>

	export default {
		props:['id'],
		name:'Search',
		data(){
			return {
				result:[],
				keyword:'',
				lastTimeStamp:0
			}
		},
		methods:{
			search(e){
				this.lastTimeStamp = e.timeStamp;
				setTimeout(()=>{
					if(this.lastTimeStamp == e.timeStamp){
						this.$http.get('/api/search',{
							params:{
								q:this.keyword
							}
						}).then(res=>{
							let data = res.data;
							console.log(data);

							this.result = data.subjects
						})
					}
				},600);
			},

			// 获取影片演员阵容
			getCasts(casts){
				return casts.map(item=>{
					return item.name
				}).join()
			},

			// 跳转到详情页
			gotoDetail(id){console.log(666)
				this.$router.push({name:'Detail',params:{id}})
			}
		},
		created(){
			console.log(this.$route,this.id);
		}
	}
</script>
<style scoped>
	
</style>
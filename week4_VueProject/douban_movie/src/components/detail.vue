<template>
	<div class="details">
		<mt-header :title="movieObj.title">
			<mt-button icon="back" @click="back" slot="left">返回</mt-button>
		</mt-header>
		<video :src="movieObj.blooper_urls[0]" :poster="movieObj.images.large" controls></video>
		<div class="description">
			{{movieObj.summary}}
		</div>
	</div>
</template>
<script>
	
	export default {
		props:['id'],
		data(){
			return {
				datalist:[],
				movieObj:{
					images:{},
					blooper_urls:{}
				}
			}
		},
		computed:{
			
		},
		methods:{

			// 获取正在热映电影
			getMovie(){
				// this.$loading.open();

				// let res = await this.$http.post('/api/subject/'+this.id,{
				// 	// city:this.currentCity.replace(/市$/,''),
				// 	apikey:'0b2bdeda43b5688921839c8ecb20399b'
				// })


				// let data = res.data;
				// console.log(data);

				// // 确认分页数量
				// this.movieObj = data;

				this.$http.post('/api/subject/'+this.id,{
					// city:this.currentCity.replace(/市$/,''),
					apikey:'0b2bdeda43b5688921839c8ecb20399b'
				}).then(res=>{
					let data = res.data;

					// 确认分页数量
					this.movieObj = data;
				})
			},
			
			// 返回上一页
			back(){
				this.$router.go(-1);
			}
		},
		created(){
			this.getMovie();
		}
	}
</script>
<style scoped>
	
</style>
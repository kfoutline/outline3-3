<template>
	<div class="new_movies">
		<mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore">
			<ul class="datalist piclist">
				<li v-for="item in datalist" @click="showDetail(item.id)">
					<img :src="item.images.small" />
					<div class="info">
						<h4>{{item.title}}</h4>
						<p>评分：{{item.rating.average}}</p>
						<p>年份：{{item.year}}</p>
						<p>分类：{{item.genres.join()}}</p>
					</div>
				</li>
			</ul>
		</mt-loadmore>
	</div>
</template>
<script>

	export default {
		data(){
			return {
				datalist:[],
				allLoaded:false,
				count:10,
				page:1,
				total:0
			}
		},
		methods:{
			loadBottom(){console.log('bbb')
				this.page++;
				if(this.page > this.total){
					this.allLoaded = true;
					this.$refs.loadmore.onBottomLoaded();
					return;
				}
				this.getMovie();
			},

			showDetail(id){
				this.$router.push({name:'Detail',params:{id}});
			},

			// 获取正在热映电影
			getMovie(){
				// this.$loading.open();

				this.$http.post('/api/new_movies',{
					city:'广州',
					count:this.count,
					start:this.idx,
					apikey:'0b2bdeda43b5688921839c8ecb20399b'
				}).then(res=>{
					let data = res.data;
					console.log(data);

					// 确认分页数量
					this.total = Math.ceil(data.total/data.count);

					this.datalist.push(...data.subjects);

					this.$refs.loadmore.onBottomLoaded();

					// this.$loading.close();
				});
			}
		},
		created(){
			this.getMovie();
		}
	}
</script>
<style scoped>
	
</style>
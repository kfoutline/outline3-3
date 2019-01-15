<template>
	<div class="in_theaters">
		<mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore" :autoFill="false">
			<ul class="datalist piclist">
				<li v-for="item in datalist" :key="item.id" @click="showDetail(item.id)">
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
		props:['currentCity'],
		data(){
			return {
				datalist:[],
				allLoaded:false,
				count:10,
				page:1,
				total:0,
			}
		},
		computed:{
			idx(){
				return (this.page-1)*this.count
			}
		},
		methods:{
			showDetail(id){
				this.$router.push({name:'Detail',params:{id}});
			},
			loadBottom(){console.log('bbb')
				this.page++;
				if(this.page > this.total){
					this.allLoaded = true;
					this.$refs.loadmore.onBottomLoaded();
					return;
				}
				this.getMovie();
			},
			// 获取正在热映电影
			getMovie(){
				// this.$loading.open();
				this.$http.post('/api/in_theaters',{
					// city:this.currentCity.replace(/市$/,''),
					count:this.count,
					start:this.idx
				}).then(res=>{
					let data = res.data;
					console.log(data);

					// 确认分页数量
					this.total = Math.ceil(data.total/data.count);

					this.datalist.push(...data.subjects);

					this.$refs.loadmore.onBottomLoaded();

					// this.$loading.close();
				});
			},
			details(id){console.log('go detail')
				this.$router.push({
					name:'Detail',params:{id}
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
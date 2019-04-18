<template>
  <div class="goodslist">
    <el-container style="border: 1px solid #eee">
      <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
        <el-menu :default-active="activeIndex+''" class="el-menu-demo" @select="handleSelect" router>
          <el-menu-item :index="idx+''" :key="menu.name" v-for="(menu,idx) in menus"
          :route="{name:menu.name}"
          >{{menu.text}}</el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view/>
        <el-card class="box-card" v-for="goods in goodslist" :key="goods.goods_id">
          <div class="item" @click="goto(goods.goods_id)">
            <img :src="goods.goods_image_url">
            <h4>{{goods.goods_name}}</h4>
            <p>分类：{{goods.store_name}}</p>
            <p class="price">价格：
              <span>{{goods.goods_price}}</span>
            </p>
          </div>
        </el-card>
      </el-main>
    </el-container>
  </div>
</template>
<script>
/**
 * axios/fetch
 * 基于promise的ajax请求工具
 */

export default {
  data() {
    return {
      goodslist: [],
      menus:[
        {
          text:'手机',
          name:'Phone'
        },
        {
          text:'电脑',
          name:'Computer'
        },
        {
          text:'平板',
          name:'Pad'
        },
        {
          text:'配件',
          name:'Acc'
        }
      ],
      activeIndex:0
    };
  },
  methods: {
    goto(id) {
      console.log(id);
      this.$router.push({ path: "/goods", query: { id } });
      //   this.$router.push({path:'/goods/'+id})
    },
    handleSelect(idx){
      this.activeIndex = idx
    }
  },
  created() {
    // axios.get('https://www.nanshig.com/mobile/index.php?act=goods&op=goods_list&keyword=&page=10&curpage=1')
    this.$axios
      .get("", {
        params: {
          act: "goods",
          op: "goods_list",
          keyword: "",
          page: 10,
          curpage: 1
        }
      })
      .then(res => {
        console.log(res);
        let data = res.data;
        this.goodslist = data.datas.goods_list;

        console.log(data.datas.goods_list);
      });
  }
};
</script>
<style lang="scss">
.goodslist {
  overflow: hidden;
  .box-card {
    float: left;
    width: 200px;
    margin: 10px;
  }
  img {
    width: 100%;
  }
}
.price {
  span {
    color: #f00;
    &::before {
      content: "￥";
    }
  }
}
</style>

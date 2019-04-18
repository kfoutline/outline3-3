<template>
  <div class="home">
    <el-menu
      :default-active="activeIndex+''"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      router
    >
      <el-menu-item :index="idx+''" v-for="(nav,idx) in navs" :key="nav.name"
      :route="{name:nav.name}"
      >
        <!-- <router-link :to="{name:nav.name}" active-class="active" tag="span">{{nav.text}}</router-link> -->
        {{nav.text}}
      </el-menu-item>
    </el-menu>
    <router-view></router-view>
  </div>
</template>
<script>
/**
 * $router：路由实例，具有跳转等方法
 * $route：当前路由信息，保存当前路由的参数
 */
import Vue from "vue";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

import axios from "axios";

// ElementUI以插件的形式来扩展Vue的功能
Vue.use(ElementUI);

// 自定义axios，并设置baseurl
var instance = axios.create({
  baseURL: "https://www.nanshig.com/mobile/index.php",
  timeout: 1000
});

Vue.prototype.$axios = instance
Vue.prototype.$http = axios

export default {
  data() {
    return {
      navs: [
        {
          text: "首页",
          name: "Home"
        },
        {
          text: "列表",
          name: "List"
        },
        {
          text: "详情",
          name: "Goods"
        },
        {
          text: "购物车",
          name: "Cart"
        }
      ],
      activeIndex: 0
    };
  },
  methods: {
    handleSelect(index, path) {
      console.log(index, path);

      this.activeIndex = index;
    },
    goto(nav) {
      console.log("App:", this);
      this.$router.push({ name: nav.name });
      // this.$router.push({path:nav.path})
    }
  },

  created() {
    // 注意：在数据挂载前修改数据，解决报错问题
    this.navs.forEach(item => {
      // Vue.set(item,'path','/'+item.name.toLowerCase())
      item.path = "/" + item.name.toLowerCase();
    });

    for (let i = 0; i < this.navs.length; i++) {
      if (this.navs[i].name === this.$route.name) {
        this.activeIndex = i;
        break;
      }
    }

    //测试proxy
    this.$http.get('/jxapi/m_v1/promote/qgajax.do',{
       params:{
        t:"1552982195250",
        pagenum:1,
        tabnum:1
      }
    }).then(res=>{
      console.log(111,res);
    });

    this.$http.get('/csdnapi/xmloveth/phoenix/comment/list/56847456',{
      params:{
        page:1,
        size:3
      },
      // headers:{
      //   //'Cookie': 'RandomTest=0.7985804128066047; JX_TID=750e8a02-692a-1a24-8b58-e6ca99a2f8bb; bfd_g=85c702420a012a0400002d1d00001cdd599dad77; NTKF_T2D_CLIENTID=guest17CA2DE3-DEC9-4725-6B41-50C47F3373AC; tma=17458850.30248236.1517478506509.1517478506509.1517539423190.2; OZ_RU_1722=0; tmd=1.17458850.22545275.1539244497002.; _jzqy=1.1539244497.1550730434.1.jzqsr=baidu|jzqct=%E9%85%92%E4%BB%99%E7%BD%91.-; user_province=6; OZ_1U_1722=vid=va72e268981908.0&ctime=1552376026&ltime=1550819895; _jzqa=1.4180012599602789000.1517478506.1550819704.1552376027.5; PHPSESSID=ecf311199d2a45ffa9531b9655db014f; MJX_APP_KEY=ecf311199d2a45ffa9531b9655db014f; JX_SID=8e825b50-30e4-1451-bc25-b7582c4f3251; PTOKEN=0F15D7343974C7DBC1BBE047F6DACA70; OZ_SI_1918=sTime=1552982185&sIndex=2; OZ_1U_1918=vid=vbbf01eaa74c57.0&ctime=1552982195&ltime=1552982185; OZ_1Y_1918=erefer=-&eurl=https%3A//m.jiuxian.com/&etime=1552982185&ctime=1552982195&ltime=1552982185&compid=1918',
      //   //'Referer': 'https://m.jiuxian.com/',
      //   'X-Requested-With':'XMLHttpRequest',
      //   'X-Tingyun-Id': 'qMtN3OBrWxk;r=82195262',
      //   //'Host': 'm.jiuxian.com',
      //   'Upgrade-Insecure-Requests': 1
      // }
    }).then(res=>{
      console.log('result:',res);
    })
  }
};
</script>

<style>
.active {
  color: #f00;
}
</style>

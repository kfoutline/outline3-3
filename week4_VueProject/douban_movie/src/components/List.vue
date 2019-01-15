<template>
  <div>
    <mt-navbar v-model="selected" fixed>
      <mt-tab-item v-for="tab in tabs" :key="tab.id" :id="tab.id" @click.native="goto(tab.id)">
        <!-- <myicons :type="tab.icon"/> -->
        {{tab.title}}
      </mt-tab-item>
    </mt-navbar>
    <router-view/>
  </div>
</template>
<script>
import Vue from "vue";
import myicons from "../plugins/icons";
Vue.use(myicons);

export default {
  data() {
    return {
      tabs: [
        {
          title: "正在热映",
          id: "in_theaters",
          icon: "device-camera-video"
        },
        {
          title: "即将上映",
          id: "coming_soon",
          icon: "history"
        },
        {
          title: "新片榜",
          id: "new_movies",
          icon: "versions"
        },
        {
          title: "TOP250",
          id: "top250",
          icon: "list-ordered"
        }
      ],
      selected: "in_theaters"
    };
  },
  methods: {
    goto(name) {
      this.$router.push({ name });
    }
  },
  watch: {
    // $route(to, from) {
    //   console.log("watch:", to, from);
    // }
  },
  mounted() {
    console.log("$route:", this.$route);
    console.log("params:", this.$route.params);
  },
  // beforeRouteUpdate(to, from, next) {
  //   console.log("to:", to);
  //   console.log("from:", from);
  //   next();
  // }
};
</script>

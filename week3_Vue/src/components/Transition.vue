<template>
	<div>
		<button class="btn btn-success" @click="display">显示</button>
        <transition
         appear
         enter-active-class="animated bounceIn"
         leave-active-class="animated bounceOut"
         v-on:before-enter="beforeEnter"
      v-on:enter="enter"
      v-on:after-enter="afterEnter"
      v-on:enter-cancelled="enterCancelled"
      v-on:before-leave="beforeLeave"
      v-on:leave="leave"
      v-on:after-leave="afterLeave"
      v-on:leave-cancelled="leaveCancelled"
        >
            <img :src="img" v-show="show" class="girl"/>
        </transition>
	</div>
</template>

<script>
    import img from '@/img/mv3.jpg';
    import 'animate.css';
	export default{
		data(){
			return {
                img:'img/mv3.jpg',
                show:true,
				navs:['首页','列表页','详情','购物车']
			}
        },
        methods:{
            display(){
                this.show = !this.show;
            },

            // 设置过渡进入之前的组件状态
            beforeEnter: function (el) {
                console.log(el)
                // ...
            },
            // 设置过渡进入完成时的组件状态
            enter: function (el, done) {console.log(el,done)
                // ...
                // done()
            },
            // 设置过渡进入完成之后的组件状态
            afterEnter: function (el) {
                // ...
            },
            enterCancelled: function (el) {
                // ...
            },
            // 过渡离开
            // 设置过渡离开之前的组件状态
            beforeLeave: function (el) {
                // ...
            },
            // 设置过渡离开完成时地组件状态
            leave: function (el, done) {
                // ...
                // done()
            },
            // 设置过渡离开完成之后的组件状态
            afterLeave: function (el) {
                // ...
            },
            // leaveCancelled 只用于 v-show 中
            leaveCancelled: function (el) {
                // ...
            }
        }
	}
</script>
<style>
    .girl{display:block;}

    /* .v-enter-active,.v-leave-active,.v-appear-active{
		transition:opacity 2s
	} */
    .v-enter{opacity: 0;}
    .v-enter-to{opacity: 1;}

    .v-leave{opacity: 1;}
    .v-leave-to{opacity: 0;}
</style>

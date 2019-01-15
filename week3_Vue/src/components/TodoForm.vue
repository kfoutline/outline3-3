<template>
    <div class="input-group mb-3">
        <input type="search" ref="form" class="form-control" @keyup.13="add" v-model="text">
        <div class="input-group-append">
            <Button class="btn-success" :handleClick="add">添加</Button>
        </div>
    </div>
</template>

<script>
import Button from './Button.vue';
import bus from '@/js/bus';

// 暴露接口，用于其他模块的引入
export default {
    data(){
        return {
            text:''
        }
    },
    methods:{
        add(){
            // console.log(6666)
            // this.handlerAdd({text:'xxx'})

            // 触发自定义事件：this.$emit(type,data)
            //  * type： 自定义事件名
            //  * data： 传输的数据

            bus.$emit('additem',{
                text:this.text
            });

            // 清空并自动获得焦点
            this.text = '';
            this.$refs.form.focus();
        }
    },

    mounted(){
        // 进入页面，自动获得焦点
        this.$refs.form.focus();
    },

    components:{
        Button
    }
}


// 等效于 export let TodoForm = {}
</script>

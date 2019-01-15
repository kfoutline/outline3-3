<template>
    <div class="steps">
        <template v-for="(num,idx) in step">
            <div :key="num" @click="next(idx,handleClick)" :class="{active:idx==currentIdx,done:isDone(idx)}"><span>{{num}}</span>步骤{{num}}</div>
            <span :key="'s'+num" v-if="idx<step-1"></span>
        </template>
    </div>
</template>

<script>
// 暴露接口，用于其他模块的引入
export default {
    props:{
        step:{
            type:Number,
            default:1
        },
        handleClick:{
            type:Function,
            default:idx=>{}
        }
    },
    data(){
        return {
            currentIdx:-1
        }
    },
    computed:{
        
    },
    methods:{
        next(idx,callback){
            this.currentIdx = idx;

            callback(idx);
        },
        isDone(idx){
            return idx<this.currentIdx || this.currentIdx==this.step-1;
        }
    }
}
</script>
<style lang="scss" scoped>
    .steps{
        display:flex;align-items:center;
        >div{
            text-align:center;color:#666;
            span{display: block;margin:0 auto;width:30px;height:30px;line-height:30px;border:2px solid #ddd;border-radius: 50%;}
        }
        >span{flex:1;margin-top:-17px;}
        .done{
            color:#58bc58;
            span{border-color:#58bc58;}
        }
        .done+span{height:2px;background-color:#58bc58;}
        .active{
            color:#f90;
            span{border-color:#f90;}
        }
    }
</style>


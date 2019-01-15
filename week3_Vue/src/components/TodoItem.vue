<template>
    <tr :class="{'table-success':data.done}" @click="select">
        <td><input type="checkbox" :checked="data.selected"></td>
        <td>{{idx+1}}</td>
        <td>{{data.text}}</td>
        <td>{{data.done ? '完成':'待办'}}</td>
        <td>
            <div class="btn-group btn-group-sm">
                <Button class="btn-outline-success" :handleClick="complete">完成</Button>
                <Button class="btn-outline-danger" :handleClick="remove">删除</Button>
                <!-- <button class="btn btn-outline-success" @click.stop="complete(idx)">完成</button>
                <button class="btn btn-outline-danger" @click.stop="remove(idx)">删除</button> -->
            </div>
        </td>
    </tr>
</template>

<script>
import bus from '@/js/bus';
import Button from './Button.vue';


// 暴露接口，用于其他模块的引入
export default {
    props:{
        data:Object,
        idx:[Number,String]
    },
    methods:{
        complete(event){
            bus.$emit('completeitem',this.idx);
        },
        remove(event){
            bus.$emit('removeitem',this.idx);
        },
        select(checked,idx){
            bus.$emit('selectitem',!this.data.selected,this.idx);
        }
    },
    components:{
        Button
    }
}
</script>

<template>
    <button class="btn" @click.stop="handleClick">
        <slot></slot>
    </button>
</template>

<script>
import bus from '@/js/bus';

// 暴露接口，用于其他模块的引入
export default {
    props:['handleClick'],
    data(){
        return {
           
        }
    }
}
</script>

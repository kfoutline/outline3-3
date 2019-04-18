<template>
    <div>
        首页
        <img src="../assets/img/mv3.jpg"/>
        <img :src="imgurl"/>
    </div>
</template>
<script>
// https://www.nanshig.com/mobile/index.php?act=index
export default {
    data(){
        return {
            imgurl:''
        }
    },
    async created(){console.log(123)
        let {data:{datas}} = await this.$axios.get('',{
            params:{
                act:'index'
            }
        });

        console.log(datas);

        let imgurl = "/assets/img/mv4.jpg";

        this.imgurl = imgurl;
    }
}
</script>
npm
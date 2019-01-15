import octicons from 'octicons';
export default {
    install(Vue,options){console.log('options:',options)
        Vue.component('myicons',{
            props:{
                type:{
                    type:String,
                    required:true
                }
            },
            computed:{
                svg(){
                    return octicons[this.type].toSVG()
                }
            },
            template:`<div v-html="svg"></div>`
        })
    }
}
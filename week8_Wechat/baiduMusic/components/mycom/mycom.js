// components/mycom/mycom.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    d:String
  },

  /**
   * 组件的初始数据
   */
  data: {
    name:'laoxie'
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onLoad(){
      
    }
  },
  pageLifetimes:{
    show(){
      console.log(this.data.name,this.data.d);
      this.setData({
        name:'lemon',
        d:100
      },()=>{
        console.log(this.data.name, this.data.d);
      })
    }
  }
})

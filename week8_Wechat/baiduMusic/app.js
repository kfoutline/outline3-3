App({

  //ajax请求封装
  async getData(options){
    let defaults = {
      url: 'https://tingapi.ting.baidu.com/v1/restserver/ting',
      method: 'baidu.ting.billboard.billList',
      data:{}
    }

    let opt = {...defaults,...options};
    new Promise((resolve,reject)=>{
      wx.request({
        url: opt.url,
        data: {
          method: opt.method,
          ...opt.data
        },
        success: res => {
          resolve(res);
        },
        fail(err){
          reject(err)
        }
      });
    })
    
  },

  globalData:{
    types: [{
      type: 1,
      text: '新歌',
      title:'新歌榜'
    }, {
      type: 16,
        text: '流行',
        title: '流行音乐'
    }, {
      type: 21,
        text: '欧美',
        title: '欧美金曲'
    }, {
      type: 25,
        text: '网络',
        title: '网络神曲'
    }, {
      type: 11,
        text: '摇滚',
        title: '摇滚重金属'
    }]
  }
});
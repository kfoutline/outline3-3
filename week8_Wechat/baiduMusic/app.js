App({

  //ajax请求封装
  getData({url=this.globalData.base.url,data}) {
    return new Promise((resolve, reject) => {
      wx.request({
        url,
        data: {
          ...this.globalData.base.data,
          ...data
        },
        success: res => {
          resolve(res.data);
        },
        fail(err) {
          reject(err)
        }
      });
    })

  },
  svg2base64(svgStr){
    return svgStr
    .replace(/<svg/gi, "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg'")
    .replace(/</g,'%3C')
    .replace(/>/g,'%3E')
    .replace(/"/g,"'");
  },

  globalData: {
    base: {
      url: 'https://tingapi.ting.baidu.com/v1/restserver/ting',
      data: {
        method: 'baidu.ting.billboard.billList',
        type: 1,
        size: 10,
        offset: 0
      },
    },
    types: [{
      type: 1,
      text: '新歌',
      title: '新歌榜'
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
  },

  /**
   * 播放器对象
   */
  myPlayer:{
    player:null,
    paused: true,
  }
});
// pages/detail/detail.js
var octicons = require("octicons");console.log(octicons)
var svgToDataURL = require("svg-to-dataurl"); console.log(octicons.play.toSVG(),svgToDataURL(octicons.play.toSVG()))
let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:'602870189',
    data:{},
    icons:{
      play:app.svg2base64(octicons.play.toSVG({width:50})),
      stop: app.svg2base64(octicons.stop.toSVG({ width: 50 })),
    }
  },

  /**
   * 事件--播放
   */
  handlePlay(){
    let {data} = this.data;

    //无播放器，则创建一个
    if (!app.myPlayer.player){
      app.myPlayer.player = wx.createInnerAudioContext();
    }
    

    let { player, paused} = app.myPlayer;

    player.src = data.file_link;
    // 播放/暂停
    if (paused){
      player.play();
    }else{
      player.pause();
    }

    paused = !paused
    this.setData({
      paused
    })
    app.myPlayer.paused = paused;
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function ({id}) {
    //method=&=877578
    console.log('app:', app.myPlayer,this.data.paused)
    this.setData({
      id,
      paused: app.myPlayer.paused
    });

    app.getData({
      data:{
        method: 'baidu.ting.song.play',
        songid:id
      }
    }).then(data => {
      console.log(data)
      this.setData({
        data: {
          ...data.songinfo,
          ...data.bitrate
        }
      });

      //改变窗口文字为歌曲名字
      wx.setNavigationBarTitle({
        title: data.songinfo.title
      })

    })


  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  handleDownload(){console.log(666)
    wx.downloadFile({
      url: this.data.data.lrclink, //仅为示例，并非真实的资源
      success(res) {
        // 只要服务器有响应数据，就会把响应内容写入文件并进入 success 回调，业务需要自行判断是否下载到了想要的内容
        if (res.statusCode === 200) {
          wx.showToast({
            title: '下载完毕',
            icon: 'success',
            duration: 3000
          });
        }
        
      }
    })
  }
})
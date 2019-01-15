// pages/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:'602870189',
    data:{},
    song:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //method=&=877578
    console.log(this);

    this.setData({
      id:options.id
    });

    wx.request({
      url: 'https://tingapi.ting.baidu.com/v1/restserver/ting',
      data: {
        method: 'baidu.ting.song.play',
        songid: this.data.id
      },
      success: res => {
        let data = res.data;
        let songInfo = data.songinfo;
        let song = data.bitrate;
        console.log(data);

        this.setData({
          data:songInfo,
          song
        });

        //改变窗口文字为歌曲名字
        wx.setNavigationBarTitle({
          title: songInfo.title
        })

      }
    });


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
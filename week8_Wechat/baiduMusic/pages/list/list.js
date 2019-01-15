import regeneratorRuntime from '../../runtime.js';

const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    listid:null,
    datalist:[],
    size:10,
    offset:0,
    index:0,
    loadding:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 设置页面标题
    let title = app.globalData.types.filter(item=>item.type==options.type)[0];
    if(title){
      title = title.title;
      wx.setNavigationBarTitle({
        title
      })
    }

    this.setData({
      listid: options.type
    });

    wx.request({
      url: 'https://tingapi.ting.baidu.com/v1/restserver/ting',
      data: {
        method: 'baidu.ting.billboard.billList',
        type: this.data.listid,
        size: this.data.size,
        offset: this.data.offset
      },
      success: res => {
        let data = res.data;
        let datalist = data.song_list;

        this.setData({
          datalist
        });
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
    let index = this.data.index;
    index++;

    let offset = this.data.size*index
    this.setData({
      index,
      offset,
      loadding:true
    });
    wx.request({
      url: 'https://tingapi.ting.baidu.com/v1/restserver/ting',
      data: {
        method: 'baidu.ting.billboard.billList',
        type: this.data.listid,
        size: this.data.size,
        offset: this.data.offset
      },
      success: res => {
        let data = res.data;
        let datalist = data.song_list;

        this.setData({
          datalist: [...this.data.datalist, ...datalist],
          loading:false
        });
      }
    });
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
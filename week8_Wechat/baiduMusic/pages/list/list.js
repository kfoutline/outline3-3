import regeneratorRuntime from '../../runtime.js';

const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    type:null,
    datalist:[],
    pageNo:1,
    loading:false,
    hasMore:true
  },

  getData({ type = this.data.type, size = 10 }={}) {
    let offset = (this.data.pageNo - 1) * size;
    this.setData({
      loading:true
    });
    app.getData({
      data: {
        type,
        size,
        offset
      }
    }).then(data => {
      if (!data.song_list) {
        this.setData({
          hasMore: false,
          loading:false
        })
        return;
      }

      // 设置数据到data
      let datalist = this.data.datalist;
      datalist = datalist.concat(data.song_list);
      this.setData({
        datalist,
        loading:false
      })
    })

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function ({type}) {
    // 设置页面标题
    let title = app.globalData.types.filter(item=>item.type==type)[0];
    if(title){
      title = title.title;
      wx.setNavigationBarTitle({
        title
      })
    }

    this.setData({
      type
    });

    this.getData({type})

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
    let {pageNo,size} = this.data;
    pageNo++;

    let offset = size*(pageNo-1)
    this.setData({
      pageNo
    });

    this.getData()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
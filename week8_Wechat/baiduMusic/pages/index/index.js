const app = getApp();

let fa = require('@fortawesome/fontawesome-free');
console.log('fa:',fa);

Page({
  data: {
    list_hot: [],
    list_new: [],
    recommends: [],
    keyword: '',
    tabs: app.globalData.types,
    activeIndex: 0,
    tabWidth: 100,
    tabData: {}
  },
  onLoad: function(options) {
    //type = 1-新歌榜,2-热歌榜,11-摇滚榜,12-爵士,16-流行,21-欧美金曲榜,22-经典老歌榜,23-情歌对唱榜,24-影视金曲榜,25-网络歌曲榜

    //获取第一个tab数据
    let {
      tabs,
      activeIndex
    } = this.data;
    this.getTabData(tabs[activeIndex].type);

    // 热门歌曲
    app.getData({
      data: {
        type: 2
      }
    }).then(data => {
      console.log(data)
      let list_hot = data.song_list;

      //提取2首热门歌曲到推荐
      let recommends = list_hot.splice(0, 2);

      //获取最热门歌曲名到搜索框
      let hotest = JSON.parse(JSON.stringify(list_hot)).sort((a, b) => b.hot - a.hot)[0];
      console.log(hotest.title);
      this.setData({
        list_hot,
        keyword: hotest.title,
        recommends: [...this.data.recommends, ...recommends]
      });
    })


    // 新歌榜
    app.getData({
      data: {
        type: 1
      }
    }).then(data => {
      let list_new = data.song_list;

      //提取2首新歌曲到推荐
      let recommends = list_new.splice(0, 2);
      console.log('new', list_new)
      this.setData({
        list_new,
        recommends: [...this.data.recommends, ...recommends]
      });
    });


    //tab样式
    wx.getSystemInfo({
      success: res => {
        let tabWidth = res.windowWidth / this.data.tabs.length;
        this.setData({
          tabWidth,
          sliderOffset: res.windowWidth / this.data.tabs.length * this.data.activeIndex
        });
      }
    });
  },
  onReady: function() {
    // Do something when page ready.
  },
  onShow: function() {
    // Do something when page show.
  },
  onHide: function() {
    // Do something when page hide.
  },
  onUnload: function() {
    // Do something when page close.
  },
  onPullDownRefresh: function() {
    setTimeout(() => {
      wx.stopPullDownRefresh();
    }, 5000)

  },
  onReachBottom: function() {
    // Do something when page reach bottom.
  },
  onShareAppMessage: function() {

    // return custom share data when user share.
  },
  onPageScroll: function() {
    // Do something when page scroll
  },
  onTabItemTap(item) {
    console.log(item.index)
    console.log(item.pagePath)
    console.log(item.text)
  },
  handlerTabChange(e) {
    console.log(e)
    this.setData({
      activeIndex: e.currentTarget.id,
      sliderOffset: this.data.tabWidth * e.currentTarget.id
    });

    //获取数据
    let type = e.currentTarget.dataset.type;
    this.data.tabData[type] == undefined && this.getTabData(type);
  },

  //获取tab数据
  getTabData(type) {
    // 新歌榜
    app.getData({
      data: {
        type,
        size: 3
      }
    }).then(data => {
      let list = data.song_list;

      this.setData({
        tabData: {
          ...this.data.tabData,
          [type]: list
        }
      });
    });
  },

  //跳转列表
  gotoList(e) {
    wx.navigateTo({
      url: '/pages/list/list?type=' + e.currentTarget.dataset.type,
    })
  },

  gotoSearch() {
    wx.navigateTo({
      url: '/pages/search/search?keyword=' + this.data.keyword,
    })
  }
})
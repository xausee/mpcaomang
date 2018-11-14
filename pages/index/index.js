//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: '诗歌，不是群体的狂欢\n而是一个人的独自悲伤\n和小欣喜',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    poetList: ["李白", "杜甫", "李清照", "王维", "白居易", "欧阳修", "许立志"]
  },

  /**
   * 导航到随机诗歌页面
   */
  goToRandomArticlePage: function() {
    wx.navigateTo({
      url: '../randomArticle/article'
    })
  },

  /**
   * 导航到搜索页面, 并传入要搜索的关键字
   */
  goToSearchPageWithKey: function(event) {
    wx.navigateTo({
      url: '../search/search?key=' + event.currentTarget.dataset.key
    })
  },

  /**
   * 导航到搜索页面
   */
  goToSearchPage: function() {
    wx.navigateTo({
      url: '../search/search'
    })
  },

  /**
   * 导航到日式查看页面
   */
  viewLogs: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function(ops) {
    if (ops.from === 'button') {
      // 来自页面内转发按钮
      console.log(ops.target);
    }
    return {
      title: '草莽',
      //imageUrl: '../../images/CaoMang.png',
      path: '/pages/index/index',
      success: function(res) {
        console.log("转发成功:" + JSON.stringify(res));
      },
      fail: function(res) {
        console.log("转发失败:" + JSON.stringify(res));
      }
    }
  },

  /**
   * 初始加载处理
   */
  onLoad: function() {
    this.getPoets();
    // this.createPoetListColors(["李白", "杜甫", "李清照", "王维", "白居易", "欧阳修", "许立志"]);

    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },

  /**
   * 获取用户信息
   */
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },

  /**
   * 调用诗人查询接口，获取诗人名列表
   */
  getPoets: function(id) {
    var that = this;
    wx.request({
      url: 'https://bitdata.site/getPoets',
      data: {
        "amount": 20
      },
      method: "POST",
      header: {
        "Content-Type": "application/json"
      },
      complete: function(res) {
        console.log("call getPoets finish");
      },
      success: function(res) {
        that.setData({
          poetList: res.data
        });
        that.createPoetListColors(res.data)
      }
    })
  },

  /**
   * 判断是否是中文
   */
  isChinese: function(temp) {
    var re = new RegExp("[\\u4E00-\\u9FFF]+$", "g");
    if (re.test(temp)) return true;
    return false;
  },

  /**
   * 为诗人列表设置随机颜色
   */
  createPoetListColors: function(data) {
    var poetList = data;
    console.log(this.poetList);
    var temp = new Array(poetList.length)
    for (var i = 0; i < poetList.length; i++) {
      //if (this.isChinese(poetList[i])) {
      temp[i] = {
        "name": poetList[i],
        "color": '#' + Math.floor(Math.random() * 0xffffff).toString(16)
      }
      //}
    }
    this.setData({
      poetListWithColor: temp
    })
  }

})
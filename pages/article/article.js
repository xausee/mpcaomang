Page({
  /**
   * 初始加载处理，获取诗歌内容
   */
  onLoad: function(options) {
    this.getPoem(options["id"]);
  },

  /**
   * 调用单首诗歌查询接口，获取诗歌
   */
  getPoem: function(id) {
    var that = this;
    wx.request({
      url: 'https://bitdata.site/getPoem',
      data: {
        "id": id
      },
      method: "POST",
      header: {
        "Content-Type": "application/json"
      },
      complete: function(res) {
        that.setData({
          poem: res.data
        });
      },
      success: function(res) {
        if (res.data.code == 0) {
          resolve(res);
        }
      }
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
      title: this.data.poem.title + " " + this.data.poem.author,
      //imageUrl: '../../images/CaoMang.png',
      path: '/pages/article/article?id=' + this.data.poem.id,
      success: function(res) {
        // 转发成功
        console.log("转发成功:" + JSON.stringify(res));
      },
      fail: function(res) {
        // 转发失败
        console.log("转发失败:" + JSON.stringify(res));
      }
    }
  },

});
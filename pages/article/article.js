Page({
  onLoad: function(options) {
    var that = this;
    wx.getStorage({
      key: "searchResults",
      success: function(res) {
        for (var i = 0; i < res.data.length; i++) {
          var poem = res.data[i];
          if (poem.id === options["id"]) {
            that.setData({
              poem: poem
            })
          }
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
      console.log(ops.target)
      comsole.log('../article/article?id=' + this.data.poem.id);
    }
    return {
      title: '浅浅草莽',
      //imageUrl: '../../images/CaoMang.png',
      path: '../article/article?id=' + this.data.poem.id,
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
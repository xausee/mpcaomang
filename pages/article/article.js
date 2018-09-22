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
  }
});
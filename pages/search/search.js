Page({
  data: {
    inputShowed: false,
    inputVal: ""
  },
  showInput: function() {
    this.setData({
      inputShowed: true
    });
  },
  hideInput: function() {
    this.setData({
      inputVal: "",
      inputShowed: false
    });
  },
  clearInput: function() {
    this.setData({
      inputVal: ""
    });
  },
  inputTyping: function(e) {
    this.setData({
      inputVal: e.detail.value
    });
    console.log(e.detail.value);
    this.search(e.detail.value);
  },

  /**
   * 调用诗歌搜索接口进行搜索
   */
  search: function(key) {
    var that = this;
    wx.request({
      url: 'http://my-lcg.site/searchPoem',
      data: {
        "key": key
      },
      method: "POST",
      header: {
        "Content-Type": "application/json"
      },
      complete: function(res) {
        that.setData({
          searchResults: res.data
        });
      },
      success: function(res) {
        if (res.data.code == 0) {
          resolve(res);
        }
      }
    });
  },

});
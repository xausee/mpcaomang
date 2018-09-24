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
  saveSearchResults: function(poems) {
    console.log(poems);
    wx.setStorage({
      key: "searchResults",
      data: poems
    })
  },
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
        that.saveSearchResults(res.data);
      },
      success: function(res) {
        if (res.data.code == 0) {
          resolve(res);
        }
      }
    });
  },
});
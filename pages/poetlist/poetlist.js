// pages/poetlist/poetlist.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    poetAlphabetList: [],
  },

  kindToggle: function (e) {
    var id = e.currentTarget.id, list = this.data.poetAlphabetList;
    for (var i = 0, len = list.length; i < len; ++i) {
      if (list[i].id == id) {
        list[i].open = !list[i].open
      } else {
        list[i].open = false
      }
    }
    this.setData({
      poetAlphabetList: list
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getPoets();
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

  /**
   * 调用诗人查询接口，获取诗人名列表
   */
  getPoets: function (id) {
    var that = this;
    wx.request({
      url: 'https://bitdata.site/getPoets',
      data: {
        "amount": 60
      },
      method: "POST",
      header: {
        "Content-Type": "application/json"
      },
      complete: function (res) {
        console.log("call getPoets finish");
      },
      success: function (res) {
        var results = that.convertPoets(res.data);
        that.setData({
          poetAlphabetList: results
        })
      }
    })
  },

  /**
   * 转换诗人数据格式
   */
  convertPoets: function (poets) {
    var alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
    var results = [];
    for (var i = 0; i < alphabet.length; i++) {
      var poetsInOneAlphabet = [];
      var alpha = alphabet[i];
      for (var j = 0; j < poets.length; j++) {
        var poet = poets[j];
        if (poet.alphabetIndex === alpha) {
          poetsInOneAlphabet.push({ id: poets[j].id, name: poets[j].name });
        }
      }
      if (poetsInOneAlphabet.length > 0) {
        results.push({ id: alpha, name: alpha, open: false, poetList: poetsInOneAlphabet })
      }
    }
    return results;
  }
})
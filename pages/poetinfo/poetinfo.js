// pages/articlelist/articlelist.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    poetData: {},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options["poetId"] !== undefined) {
      this.getPoetData(options["poetId"]);
    }
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
   * 调用诗歌搜索接口进行搜索
   */
  getPoetData: function (poetId) {
    var that = this;
    wx.request({
      url: 'https://bitdata.site/getPoetData',
      data: {
        "poetId": poetId
      },
      method: "POST",
      header: {
        "Content-Type": "application/json"
      },
      complete: function (res) {
        console.log("call getPoetData finish.");
      },
      success: function (res) {
        that.setData({
          poetData: res.data
        });
      }
    });
  },

})
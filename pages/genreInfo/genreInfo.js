// pages/genreInfo/genreInfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    genreData: {},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options["genreId"] !== undefined) {
      this.getGenreData(options["genreId"]);
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
   * 调用单个诗歌流派搜索接口进行搜索
   */
  getGenreData: function (genreId) {
    var that = this;
    wx.request({
      url: 'https://bitdata.site/getGenreData',
      data: {
        "genreId": genreId
      },
      method: "POST",
      header: {
        "Content-Type": "application/json"
      },
      complete: function (res) {
        console.log("call getGenreData finish.");
      },
      success: function (res) {
        that.setData({
          genreData: res.data
        });
      }
    });
  },
})
// pages/genresChronologyIndex/genresChronologyIndex.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    genreChronologyList: [],
  },

  kindToggle: function (e) {
    var id = e.currentTarget.id, list = this.data.genreChronologyList;
    for (var i = 0, len = list.length; i < len; ++i) {
      if (list[i].id == id) {
        list[i].open = !list[i].open
      } else {
        list[i].open = false
      }
    }
    this.setData({
      genreChronologyList: list
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getGenres();
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
  getGenres: function (id) {
    var that = this;
    wx.request({
      url: 'https://bitdata.site/getGenres',
      data: {
        "amount": 60
      },
      method: "POST",
      header: {
        "Content-Type": "application/json"
      },
      complete: function (res) {
        console.log("call getGenres finish");
      },
      success: function (res) {
        var results = that.convertGenres(res.data);
        that.setData({
          genreChronologyList: results
        })
      }
    })
  },

  /**
   * 转换诗人数据格式
   */
  convertGenres: function (genres) {
    var chronologies = ["20世纪初至20年代", "20世纪20年代", "20世纪30年代", "20世纪40年代", "20世纪50年代", "20世纪60年代", "20世纪70年代", "20世纪80年代", "20世纪90年代", "21世纪初"];
    var results = [];
    for (var i = 0; i < chronologies.length; i++) {
      var genresInOneChronology = [];
      var chronology = chronologies[i];
      for (var j = 0; j < genres.length; j++) {
        var genre = genres[j];
        if (genre.chronology === chronology) {
          genresInOneChronology.push({ id: genres[j].id, name: genres[j].name });
        }
      }
      if (genresInOneChronology.length > 0) {
        results.push({ id: i, name: chronology, open: false, genreList: genresInOneChronology })
      }
    }
    return results;
  }
})
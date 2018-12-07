// pages/genresAlphabetIndex/genresAlphabetIndex.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    genreAlphabetList: [],
  },

  kindToggle: function (e) {
    var id = e.currentTarget.id, list = this.data.genreAlphabetList;
    for (var i = 0, len = list.length; i < len; ++i) {
      if (list[i].id == id) {
        list[i].open = !list[i].open
      } else {
        list[i].open = false
      }
    }
    this.setData({
      genreAlphabetList: list
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
        //"amount": 60
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
          genreAlphabetList: results
        })
      }
    })
  },

  /**
   * 转换流派数据格式
   */
  convertGenres: function (genres) {
    var alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
    var results = [];
    for (var i = 0; i < alphabet.length; i++) {
      var genresInOneAlphabet = [];
      var alpha = alphabet[i];
      for (var j = 0; j < genres.length; j++) {
        var genre = genres[j];
        if (genre.alphabetIndex === alpha) {
          genresInOneAlphabet.push({ id: genres[j].id, name: genres[j].name });
        }
      }
      if (genresInOneAlphabet.length > 0) {
        results.push({ id: alpha, name: alpha, open: false, genreList: genresInOneAlphabet })
      }
    }
    return results;
  }

})
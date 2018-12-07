Page({

  /**
   * 页面的初始数据
   */
  data: {
    poetChronologyList: [],
  },

  kindToggle: function (e) {
    var id = e.currentTarget.id, list = this.data.poetChronologyList;
    for (var i = 0, len = list.length; i < len; ++i) {
      if (list[i].id == id) {
        list[i].open = !list[i].open
      } else {
        list[i].open = false
      }
    }
    this.setData({
      poetChronologyList: list
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
        //"amount": 60
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
          poetChronologyList: results
        })
      }
    })
  },

  /**
   * 转换诗人数据格式
   */
  convertPoets: function (poets) {
    var chronologies = ["20世纪20年代", "20世纪30年代", "20世纪40年代", "20世纪50年代", "20世纪60年代", "20世纪70年代", "20世纪80年代(上)", "20世纪80年代(下)", "20世纪90年代(上)", "20世纪90年代(下)", "21世纪初(上)"];
    var results = [];
    for (var i = 0; i < chronologies.length; i++) {
      var poetsInOneChronology = [];
      var chronology = chronologies[i];
      for (var j = 0; j < poets.length; j++) {
        var poet = poets[j];
        if (poet.chronology === chronology) {
          poetsInOneChronology.push({ id: poets[j].id, name: poets[j].name });
        }
      }
      if (poetsInOneChronology.length > 0) {
        results.push({ id: i, name: chronology, open: false, poetList: poetsInOneChronology })
      }
    }
    return results;
  }
})
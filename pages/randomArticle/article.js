Page({
  data: {
    lastX: 0,
    lastY: 0,
    text: "没有滑动",
  },

  /**
   * 产生随机整数，包含下限值，包括上限值
   * @param {Number} lower 下限
   * @param {Number} upper 上限
   * @return {Number} 返回在下限到上限之间的一个随机整数
   */
  random :function(lower, upper) {
    return Math.floor(Math.random() * (upper - lower + 1)) + lower;
  },
  onLoad: function() {
    this.getRandomPoems();
  },

  getRandomPoems: function() {
    var that = this
    wx.request({
      url: 'http://my-lcg.site/getRandomPoems',
      data: {},
      method: "POST",
      header: {
        "Content-Type": "application/json"
      },
      complete: function(res) {
        console.log(res.data);
        that.setData({
          poem: res.data[that.random(0,4)]
        });
      },
      success: function(res) {
        if (res.data.code == 0) {
          resolve(res)

        }
      }
    })
  },

  handletouchmove: function(event) {
    console.log(event)
    let currentX = event.touches[0].pageX
    let currentY = event.touches[0].pageY

    console.log(currentX)
    console.log(this.data.lastX)
    let text = ""
    if ((currentX - this.data.lastX) < 0){
      text = "向左滑动";
      this.getRandomPoems();
    }else if (((currentX - this.data.lastX) > 1000)){
      text = "向右滑动";
    }
    //将当前坐标进行保存以进行下一次计算
    this.data.lastX = currentX
    this.data.lastY = currentY
    this.setData({
      text: text,
    });
  },

  handletouchtart: function(event) {
    console.log(event)
    this.data.lastX = event.touches[0].pageX
    this.data.lastY = event.touches[0].pageY
  },
  handletap: function(event) {
    console.log(event)
  },
});
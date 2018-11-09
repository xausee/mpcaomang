Page({
  data: {
    /**
     * 页面展示的诗歌实体数据对象
     */
    poem: {},
    /**
     * 触摸开始时的x坐标
     */
    lastX: 0,
    /**
     * 触摸开始时的y坐标
     */
    lastY: 0,
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function(ops) {
    if (ops.from === 'button') {
      // 来自页面内转发按钮
      console.log(ops.target);
    }
    return {
      title: this.data.poem.title + " " + this.data.poem.author,
      //imageUrl: '../../images/CaoMang.png',
      path: '/pages/article/article?id=' + this.data.poem.id,
      success: function(res) {
        console.log("转发成功:" + JSON.stringify(res));
      },
      fail: function(res) {
        console.log("转发失败:" + JSON.stringify(res));
      }
    }
  },

  /**
   * 产生随机整数，包含下限值，包括上限值
   * @param {Number} lower 下限
   * @param {Number} upper 上限
   * @return {Number} 返回在下限到上限之间的一个随机整数
   */
  random: function(lower, upper) {
    return Math.floor(Math.random() * (upper - lower + 1)) + lower;
  },

  /**
   * 初始加载处理，随机获取一篇诗歌
   */
  onLoad: function() {
    this.getRandomPoem();
  },

  /**
   * 调用随机诗歌接口，获取诗歌数据
   */
  getRandomPoem: function() {
    var that = this;
    wx.request({
      url: 'https://bitdata.site/getRandomPoem',
      data: {},
      method: "POST",
      header: {
        "Content-Type": "application/json"
      },
      complete: function(res) {
        // 什么也不做
      },
      success: function(res) {
        that.setData({
          poem: res.data
        });

        if (res.data.code == 0) {
          resolve(res);
        }
      },
      fail: function(res) {
        console.warn("服务器错误，没有返回数据");
      }
    })
  },

  /**
   * 处理手指触摸后移动事件，当判断是向左滑动时随机更新一篇诗歌
   */
  handletouchmove: function(event) {
    // console.log(event);
    // let currentX = event.touches[0].pageX;
    // let currentY = event.touches[0].pageY;

    // console.log(currentX);
    // console.log(this.data.lastX);
    // let text = "";
    // if ((currentX - this.data.lastX) < -10) {
    //   console.log('向左滑动');
    //   this.getRandomPoem();
    // } else if (((currentX - this.data.lastX) > 10)) {
    //   console.log('向右滑动');
    // }
    // //将当前坐标进行保存以进行下一次计算
    // this.data.lastX = currentX;
    // this.data.lastY = currentY;
  },

  /**
   * 处理手指触摸动作开始事件，将当前坐标数据保存下来
   */
  handletouchstart: function(event) {
    console.log(event);
    this.data.lastX = event.touches[0].pageX;
    this.data.lastY = event.touches[0].pageY;
  },

  /**
   * 处理手指触摸动作结束事件，当判断是向左滑动一定距离时随机更新一篇诗歌
   */
  handletouchend: function(event) {
    console.log(event);
    let currentX = event.changedTouches[0].pageX;
    let currentY = event.changedTouches[0].pageY;

    console.log(currentX);
    console.log(this.data.lastX);
    let text = "";
    if ((currentX - this.data.lastX) < -10) {
      console.log('向左滑动');
      this.getRandomPoem();
    } else if (((currentX - this.data.lastX) > 10)) {
      console.log('向右滑动');
    }
    //将当前坐标进行保存以进行下一次计算
    this.data.lastX = currentX;
    this.data.lastY = currentY;
  },

  /**
   * 处理点击事件，暂无实际内容
   */
  handletap: function(event) {
    //console.log(event);
  },
});
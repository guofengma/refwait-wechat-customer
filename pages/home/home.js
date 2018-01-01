// pages/home/home.js
//获取应用实例
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    "swiperList": ["/image/swiper1.jpg", "/image/swiper2.jpg", "/image/swiper3.jpg"],
    "choice": [true, false, false],
    "load": "正在加载...",
    "isLoad": true,
    "merchants": ''
  },

  /**
   * 显示附近商家信息
   */
  showNearMerchants: function () {
    var that = this;
    // 获取当前位置经纬度
    wx.getLocation({
      success: function(res) {
        console.log(res);
        app.longitude = res.longitude;
        app.latitude = res.latitude;
        // 根据经纬度获取附近商家信息
        wx.request({
          url: app.url + '/refwait/merchant/listNearMerchants',
          method: 'GET',
          data: {
            longitude: app.longitude,
            latitude: app.latitude
          },
          success: function (res) {
            console.log(res);
            that.setData({
              merchants: res.data
            })
          }
        })
      },
    })
  },

  /**
   * 触底加载
   */
  lower: function () {
    console.log('触底');
    var that = this;
    if (that.data.isLoad) {
      console.log('加载中');
      var load = ['正在加载.', '正在加载..', '正在加载...'];
      var index = 0;
      that.setData({
        isLoad: false
      })
      var interval = setInterval(function () {
        that.setData({
          load: load[index]
        })
        index++;
        if (index > 2)
          index = 0;
      }, 500);
      wx.request({
        url: app.url + '/refwait/merchant/listNearMerchants',
        method: 'GET',
        data: {
          longitude: app.longitude,
          latitude: app.latitude
        },
        success: function (res) {
          console.log(res);
          var merchants = that.data.merchants;
          for (var i = 0; i < res.data.length; i++) {
            merchants.push(res.data[i]);
          }
          that.setData({
            merchants: merchants
          })
        }
      })
      clearInterval(interval);
    }
  },

  /**
   * 根据条件进行商家排序
   */
  merchantSort: function (options) {
    var that = this;
    var index = options.currentTarget.id;
    var choice = that.data.choice;
    for (var i = 0; i < choice.length; i++) {
      choice[i] = i == index ? true : false;
    }
    that.setData({
      choice: choice
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 显示加载中图标
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 10000
    });
    this.showNearMerchants();
    console.log(this.data.merchants);
    // 隐藏加载中图标
    wx.hideToast();
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
    this.lower();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})
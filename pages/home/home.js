// pages/home/home.js
//获取应用实例
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    "url": 'http://localhost:8080',
    "swiperList": ["/image/swiper1.jpg", "/image/swiper2.jpg", "/image/swiper3.jpg"],
    "choice": [true, false, false],
    "merchants": [{
      "id": 0,
      "name": "老火靓汤",
      "address": "科干xxxxxx",
      "iconUrl": "/image/icon_merchant.png",
      "status": 1,
      "collect": 1,
      "distance": 1.5,
      "heatValue": "5"
    }, 
    {
      "id": 1,
      "name": "麻辣香锅",
      "address": "科干xxxxxx",
      "iconUrl": "/image/icon_merchant.png",
      "status": 1,
      "collect": 1,
      "distance": 1.4,
      "heatValue": "4"
    },
    {
      "id": 2,
      "name": "威福克",
      "address": "科干xxxxxx",
      "iconUrl": "/image/icon_merchant.png",
      "status": 0,
      "collect": 0,
      "distance": 1.3,
      "heatValue": "3"
    },
    {
      "id": 3,
      "name": "原味坊",
      "address": "科干xxxxxx",
      "iconUrl": "/image/icon_merchant.png",
      "status": 1,
      "collect": 1,
      "distance": 1.2,
      "heatValue": "2"
    },
    {
      "id": 4,
      "name": "原味汤粉王",
      "address": "科干xxxxxx",
      "iconUrl": "/image/icon_merchant.png",
      "status": 0,
      "collect": 0,
      "distance": 1.1,
      "heatValue": "1"
    }]
  },

  /**
   * 触底加载
   */
  lower: function () {
    console.log('触底');
  },

  /**
   * 根据条件进行商家排序
   */
  merchantSort: function (options) {
    var that = this;
    var index = options.currentTarget.id;
    console.log("下标为",index);
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
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 10000
    });
    console.log(this.data.merchants);
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
    console.log('页面触底')
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})
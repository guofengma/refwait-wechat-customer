// pages/myself/info/feedback/feedback.js
// 获取应用实例
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    content: ''
  },

  /**
   * 提交意见反馈
   */
  submitFeedback: function () {
    var content = this.data.content;
    wx.request({
      url: app.url + '/refwait/feedback/addNewFeedback',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        content: content,
        feedbackerType: 0,
        feedbackerId: app.customer.id
      },
      success: function (res) {
        if (res.data == 'success') {
          wx.navigateBack();
          wx.showToast({
            title: '提交成功',
          })
        } else {
          wx.showToast({
            title: '提交失败',
            image: '/image/icon_error.png'
          })
        }
      }
    })
  },

  /**
   * 获取输入的反馈内容
   */
  contentChange: function (e) {
    this.setData({
      content: e.detail.value
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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
  
  }
})
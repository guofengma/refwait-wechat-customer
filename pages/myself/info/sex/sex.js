// pages/myself/set/sex/sex.js
//获取应用实例
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sex: ''
  },

  /**
   * 保存性别
   */
  saveSex: function () {
    var customer = app.customer;
    var sex = this.data.sex;
    if (sex == customer.sex) {
      wx.showToast({
        title: '无需保存',
        image: '/image/icon_error.png'
      })
    } else {
      wx.request({
        url: app.url + '/refwait/customer/setCustomerSex',
        method: 'GET',
        data: {
          id: customer.id,
          sex: sex
        },
        success: function (res) {
          if (res.data == 'success') {
            app.setInfoValue = sex;
            app.isSetInfo[1] = true;
            wx.navigateBack();
            wx.showToast({
              title: '保存成功',
            })
          } else {
            wx.showToast({
              title: '保存失败',
              image: '/image/icon_error.png'
            })
          }
        }
      })
    }
  },

  /**
   * 获取单选框的值
   */
  radioChange: function (e) {
    console.log(e);
    this.setData({
      sex: e.detail.value
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    this.setData({
      sex: options.sex
    })
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
// pages/myself/set/phone/phone.js
// 获取应用实例
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    normal: "验证码会以短信形式发送到您手机，请注意查收",
    error: "手机号码格式不对",
    flag: true,
    phone: '',
    code: '',
    tempPhone: '',
    tempCode: ''
  },

  /**
   * 绑定手机号
   */
  bindPhone: function () {
    var phone = this.data.phone;
    var code = this.data.code;
    var customer = app.customer;
    if (this.data.tempPhone == phone && this.data.tempCode == code) {
      wx.request({
        url: app.url + '/refwait/customer/setCustomerMobilePhone',
        method: 'GET',
        data: {
          phone: phone,
          id: customer.id
        },
        success: function (res) {
          if (res.data == 'success') {
            app.isSetInfo[2] = true;
            app.setInfoValue = phone;
            wx.navigateBack();
            wx.showToast({
              title: '绑定成功',
            })
          } else {
            wx.showToast({
              title: '绑定失败',
              image: '/image/icon_error.png'
            })
          }
        }
      })
    } else {
      wx.showToast({
        title: '验证码输入有误',
        image: '/image/icon_error.png'
      })
    }
  },

  /**
   * 获取验证码输入框值
   */
  codeChange: function (e) {
    this.setData({
      code: e.detail.value
    })
  },

  /**
   * 获取验证码
   */
  getVerificationCode: function () {
    var that = this;
    var flag = this.data.flag;
    var phone = this.data.phone;
    if (flag && phone.length == 11) {
      console.log('获取验证码');
      wx.request({
        url: app.url + '/refwait/customer/getVerificationCode',
        method: 'GET',
        data: {
          phone: phone
        },
        success: function (res) {
          console.log(res);
          if (res.data == 'fail') {
            wx.showToast({
              title: '获取验证码失败',
              image: '/image/icon_error.png'
            });
          } else if (res.data == 'isExist') {
            wx.showToast({
              title: '手机号已被绑定',
              image: '/image/icon_error.png'
            });
          } else {
            wx.showToast({
              title: '成功获取验证码',
            });
            that.setData({
              code: res.data,
              tempCode: res.data,
              tempPhone: phone
            })
          }
        }
      })
    }
  },

  /**
   * 检测手机号是否合法
   */
  checkPhone: function (e) {
    // 用于检测手机号是否合法的正则表达式
    if (e.detail.value.length >= 11) {
      var regPhone = /^1[34578]\d{9}$/;
      this.setData({
        flag: regPhone.test(e.detail.value),
        phone: e.detail.value
      })
    } else {
      if (!this.data.flag) {
        this.setData({
          flag: true
        })
      }
    }
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
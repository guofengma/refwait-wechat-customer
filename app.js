//app.js
App({
  // 后台服务器地址
  url: 'http://localhost:8080',
  // 微信用户信息
  userInfo: '',
  // 顾客信息
  customer: '',
  // 标记是否重新设置信息，分别为姓名，性别，手机号
  isSetInfo: [false, false, false],
  // 设置信息的值
  setInfoValue: '',

  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        var that = this;
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        wx.request({
          url: this.url + "/refwait/customer/login",
          method: 'POST',
          header: {
            'content-type': 'application/x-www-form-urlencoded',
            'charset': 'UTF-8'
          },
          data: {
            code: res.code
          },
          success: function (result) {
            console.log(result);
            that.customer = result.data;
          }
        })
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.userInfo = res.userInfo
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null
  }
})
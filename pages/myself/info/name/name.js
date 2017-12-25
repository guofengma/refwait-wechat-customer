// pages/myself/set/name/name.js
//获取应用实例
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    normal: "姓名只支持汉字，一旦保存则无法修改",
    error: "姓名不支持除汉字以外的其他字符",
    flag: true,
    name: ''
  },

  /**
   * 保存姓名
   */
  saveName: function () {
    console.log('保存姓名');
    var customer = app.customer;
    var name = this.data.name;
    // 当姓名合法且不为空时
    if (this.data.flag && name != '' && customer.name == 'unset') {
      wx.request({
        url: app.url + '/refwait/customer/setCustomerName',
        method: 'GET',
        data: {
          name: name,
          id: customer.id
        },
        success: function (res) {
          console.log(res);
          if (res.data == "success") {
            app.isSetInfo[0] = true;
            app.setInfoValue = name;
            wx.navigateBack();
            wx.showToast({
              title: '保存成功',
            })
          }
        }
      })
    } else {
      wx.showToast({
        title: '不符合要求',
        image: '/image/icon_error.png'
      })
    }
  },

  /**
   * 检测姓名是否合法
   */
  checkName: function (e) {
    console.log(e);
    // 用于检测中文的正则表达式
    var regChinese = /[^\u4e00-\u9fa5]/;
    this.setData({
      flag: !regChinese.test(e.detail.value),
      name: e.detail.value
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
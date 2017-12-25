// pages/myself/myself.js
//获取应用实例
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 选项列表
    list: {
      order: {
        id: "myOrder",
        title: "我的订单",
        iconPath: "/image/icon_order.png",
        flag: true
      },
      name: {
        id: "myName",
        title: "姓名",
        text: "",
        iconPath: "/image/icon_name.png",
        flag: true
      },
      sex: {
        id: "mySex",
        title: "性别",
        text: "",
        iconPath: "/image/icon_sex.png",
        flag: true
      },
      mobilePhone: {
        id: "myMobilePhone",
        title: "手机号",
        text: "",
        iconPath: "/image/icon_mobile_phone.png",
        flag: true
      },
      feedback: {
        id: "feedback",
        title: "意见反馈",
        iconPath: "/image/icon_feedback.png",
        flag: true
      },
      callus: {
        id: "callus",
        title: "联系我们",
        text: "934932687",
        iconPath: "/image/icon_callus.png",
        flag: true
      },
      about: {
        id: "about",
        title: "软件关于",
        text: "1.0.0",
        iconPath: "/image/icon_about.png",
        flag: false
      }
    }
  },

  /**
   * 更新顾客信息
   */
  updateInfo: function () {
    // 顾客信息
    var customer = this.data.customer;
    // 我的信息
    var list = this.data.list;
    // 标记数组，标记哪个信息需要更新
    var isSetInfo = app.isSetInfo;
    // 标记，list中对应的key值
    var key;
    // 更新的值
    var setInfoValue = app.setInfoValue;
    if (isSetInfo[0]) { // 更新姓名
      customer.name = setInfoValue;
      isSetInfo[0] = false;
      key = "name";
    } else if (isSetInfo[1]) {  // 更新性别
      customer.sex = setInfoValue;
      isSetInfo[1] = false;
      key = "sex";
    } else {  // 更新手机号
      customer.mobilePhone = setInfoValue;
      isSetInfo[2] = false;
      key = "mobilePhone";
    }
    if (key == 'sex') {
      console.log(key, setInfoValue)
      switch (setInfoValue) {
        case '0': list[key].text = '男'; console.log('设置男'); break;
        case '1': list[key].text = '女'; console.log('设置女'); break;
        default: list[key].text = '保密'; console.log('设置保密'); break;
      }
    } else {
      list[key].text = setInfoValue;
      list[key].flag = false;
    }
    this.setData({
      list: list,
      customer: customer
    });
    app.customer = customer;
    app.setInfoValue = '';
    app.isSetInfo = isSetInfo;
  },

  /**
   * 拨打电话
   */
  callUs: function () {
    wx.makePhoneCall({
      phoneNumber: this.data.list.callus.text,
    })
  },

  /**
   * 根据选项信息判断是否跳转至信息页面
   */
  navToSet: function (options) {
    var id = options.target.id;
    var url = '';
    console.log('选项id',id);
    console.log(this.data.list);
    switch (id) {
      case 'myOrder':
        url = 'order/order';
        break;
      case 'myName':
        if (this.data.list.name.text != "") {
          return;
        }
        url = 'name/name';
        break;
      case 'mySex':
        url = 'sex/sex?sex=' + this.data.customer.sex;
        break;
      case 'myMobilePhone':
        if (this.data.list.mobilePhone.text != "") {
          return;
        }
        url = 'phone/phone';
        break;
      case 'feedback':
        url = 'feedback/feedback';
        break;
      case 'callus':
        this.callUs();
        return;
      default:
        return;
    }
    wx.navigateTo({
      url: 'info/' + url
    })
  },

  /**
   * 设置顾客信息以及微信用户信息
   */
  setInfo: function () {
    console.log(app);
    this.setData({
      // 顾客信息
      customer: app.customer,
      // 微信用户信息
      userInfo: app.userInfo
    });
    var customer = this.data.customer;
    var list = this.data.list;
    if (customer.name != 'unset') {
      list.name.flag = false;
      list.name.text = customer.name;
    }
    if (customer.mobilePhone != 'unset') {
      list.mobilePhone.flag = false;
      list.mobilePhone.text = customer.mobilePhone;
    }
    switch (customer.sex) {
      case 0: list.sex.text = '男'; break;
      case 1: list.sex.text = '女'; break;
      default: list.sex.text = '保密'; break;
    }
    this.setData({
      list: list
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 设置顾客信息
    this.setInfo();
    console.log('执行myself中的onLoad');
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
    if (app.setInfoValue != '') {
      this.updateInfo();
    }
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
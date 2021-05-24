// miniprogram/pages/index/index.js
const app = getApp();
// 连接数据库
const db = wx.cloud.database();
// 引入配置文件
const config = require("../../config.js");
const _ = db.command;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    scrollTop: 0,
    // 标题
    title: "云读书"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    this.getbanner()
  },

  /**
   * 获取轮播图
   */
  getbanner() {
    let that = this;
    db.collection("banner")
      .where({})
      .get({
        success: function (res) {
          that.setData({
            banner: res.data[0].list,
          });
        },
      });
  },

  /**
   * 转换布局格式
   */
  changeCard() {
    let that = this;
    if (that.data.iscard) {
      that.setData({
        iscard: false
      })
      wx.setStorage({
        key: 'iscard',
        data: false,
      })
    } else {
      that.setData({
        iscard: true
      })
      wx.setStorage({
        key: 'iscard',
        data: true,
      })
    }
  },

  /**
   * 检测页面滚动
   */
  onPageScroll: function (e) {
    this.setData({
      scrollTop: parseInt((e.scrollTop) * wx.getSystemInfoSync().pixelRatio)
    })
    // 导航栏透明度
    let Alpha = e.scrollTop * 1 / 100;
    // 导航栏背景颜色    
    let navigationBackgroundColor = 'rgba(83,96,194,' + Alpha + ')';
    this.setData({
      navigationBackgroundColor: navigationBackgroundColor,
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () { },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () { },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () { },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () { },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () { },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () { },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () { },
});

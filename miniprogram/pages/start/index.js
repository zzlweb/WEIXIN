// miniprogram/pages/start/index.js
// 获取当前小程序实例
const app = getApp();
// 获取数据库实例
const db = wx.cloud.database();
// 引入config配置
const config = require("../../config.js");
// 等同于 db.command
const _ = db.command;
// import Toast from '@vant/weapp/toast/toast';
Page({
  /**
   * 页面的初始数据
   */
  data: {
    // 默认倒计时三秒
    count: 3,
  },

  /**
   * 页面跳转到首页
   */
  go() {
    wx.switchTab({
      url: "/pages/index/index",
      success: () => {},
      fail: () => {
        // Toast.fail('跳转失败')
      },
      complete: () => {},
    });
  },

  /**
   * 倒计时函数
   *
   */
  countDown: function () {
    let that = this;
    let total = 3;
    this.interval = setInterval(function () {
      total > 0 &&
        (total--,
        that.setData({
          count: total,
        })),
        0 === total &&
          (that.setData({
            count: total,
          }),
          // wx.switchTab({
          //   url: "/pages/index/index",
          // }),
          clearInterval(that.interval));
    }, 1e3);
  },

  /**
   * 为了数据安全，每次进入获取一次用户信息
   *
   */
  getuserdetail() {
    if (!app.openid) {
      wx.cloud.callFunction({
        name: "regist", //对应的云函数名
        data: {
          $url: "getid", //云函数的路由参数
        },
        success: (res) => {
          // 查询数据库
          db.collection("user")
            .where({
              _openid: res.result,
            })
            .get()
            .then(res=> {
              console.log(res);
              if (res.data.length !== 0) {
                app.openid = res.result;
                app.userinfo = res.data[0];
              }
            }).catch(err => {
              console.log('查询失败');
            })
        },
      });
    }
  },

  /**
   *
   * 获取背景图片
   *
   */
  getimg() {
    let that = this;
    db.collection("start")
      .get({
        success: function (res) {
          that.setData({
            bgurl: res.data[0].url,
          });
        },
        fail() {
          // 获取本地的背景图片
          that.setData({
            bgurl: JSON.parse(config.data).bgurl,
          });
        },
      });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getimg();
    this.countDown();
    this.getuserdetail();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {},
});

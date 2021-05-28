// miniprogram/pages/my/index.js
const app = getApp()
// 获取数据库实例
const db = wx.cloud.database();
Page({
      //页面的初始数据
      data: {
            // 导航栏和状态栏高度
            navigationBarAndStatusBarHeight:
                  wx.getStorageSync('statusBarHeight') +
                  wx.getStorageSync('navigationBarHeight') +
                  'px',
                  userInfo: app.userinfo || null,
      },

      /**
       * 获取用户非敏感信息
       */
      bindGetUserInfo() {
            wx.getUserProfile({
                  desc: '用于显示头像', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
                  success: (res) => {
                        this.setData({
                              userInfo: res.userInfo,
                        })

                        // 存入数据库
                        this.setInfo()
                  },
                  fail: () => {
                        wx.showToast({
                              title: '请授权后方可使用',
                              icon: 'none',
                              duration: 2000
                        });
                  }
            })
      },

      /**
       * 将用户非敏感信息存入数据库
       */
      setInfo() {
            db.collection('user').add({
                  data: {
                        stamp: new Date().getTime(),
                        info: this.data.userInfo,
                  },
                  success: function (res) {
                        db.collection('user').doc(res._id).get({
                              success: function (res) {
                                    app.userinfo = res.data.info;
                                    app.openid = res.data._openid;
                              },
                        })
                  },
                  fail(err) {
                        console.log(err);
                  }
            })
      },

      /**
       * 生命周期函数--监听页面加载
       */
      onLoad() {
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
            if (app.userinfo) {
                  this.setData({
                        userInfo: app.userinfo,
                  })
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
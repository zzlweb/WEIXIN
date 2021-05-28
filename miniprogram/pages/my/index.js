// miniprogram/pages/my/index.js
const app = getApp()
Page({
      //页面的初始数据
      data: {
            // 导航栏和状态栏高度
            navigationBarAndStatusBarHeight:
                  wx.getStorageSync('statusBarHeight') +
                  wx.getStorageSync('navigationBarHeight') +
                  'px',
            userInfo: {},
            hasUserInfo: false,
      },

      /**
       * 
       * 跳转逻辑
       */
      go(e) {
            if (e.currentTarget.dataset.status == '1') {
                  if (!app.openid) {
                        wx.showModal({
                              title: '温馨提示',
                              content: '该功能需要注册方可使用，是否马上去注册',
                              success(res) {
                                    if (res.confirm) {
                                          wx.navigateTo({
                                                url: '/pages/login/login',
                                          })
                                    }
                              }
                        })
                        return false
                  }
            }
            // wx.navigateTo({
            //       url: e.currentTarget.dataset.go
            // })
      },

      bindGetUserInfo() {
            wx.getUserProfile({
                  desc: '用于完善用户资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
                  success: (res) => {
                        this.setData({
                              userInfo: res.userInfo,
                              hasUserInfo: true,
                        })
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
            this.setData({
                  userinfo: app.userinfo || ''
            })
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
// miniprogram/pages/my/index.js
const app = getApp()
// 获取数据库实例
const db = wx.cloud.database();
Page({
      //页面的初始数据
      data: {
            userInfo: app.userinfo || null,
            // 序列
            dataPersonal: [{
                        id: '0',
                        image: '/images/我的钱包.svg',
                        title: '我的钱包',
                        src: ''
                  },
                  {
                        id: '1',
                        image: '/images/我的客服.svg',
                        title: '客服反馈',
                        src: '/pages/kefu/index'
                  },
                  {
                        id: '3',
                        image: '/images/关于.svg',
                        title: '关于应用',
                        src: ''
                  }
            ]
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
       * 跳转
       */
      goPage(e) {
            if (!app.userinfo) {
                  wx.showToast({
                        title: '请授权后方可使用',
                        icon: 'none',
                        duration: 2000,
                  })
                  return
            };

            if (e.currentTarget.dataset.src === '/pages/poster/index') {
                  if (app.openid !== 'o7PeB4pQ19Z4UlOqYH1uAQR_qLwI') {
                        wx.showToast({
                              title: '请联系管理员',
                              duration: 2000,
                              icon: 'none'
                        })

                        return
                  }
            }
            e.currentTarget.dataset.src ? wx.navigateTo({
                  url: e.currentTarget.dataset.src
            }) : wx.showToast({
                  title: '暂未开放',
                  icon: 'none',
                  duration: 2000,
            })
      },

      /**
       * 生命周期函数--监听页面加载
       */
      onLoad() {},
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
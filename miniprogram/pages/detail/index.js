// miniprogram/pages/detail/index.js
const app = getApp();
const db = wx.cloud.database();
wx.cloud.init();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 借阅的书籍
    borrow_List: [],
    // 是否显示空状态
    isEmpty: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.queryBorrowBook()
  },

  /**
   * 根据appid查询借阅书籍
   */

  async queryBorrowBook() {
    try {
      const list = await db.collection('books').where({
        openid: app.openid
      }).get()

      if (!list.data || list.data.length === 0) {
        this.setData({
          isEmpty: true, 
          borrow_List: []
        })
      } else {
        this.setData({
          borrow_List: list.data
        })
      }
    } catch (error) {
      wx.showToast({
        title: '查询数据失败',
        icon: 'none',
        duration: 2000,
      });
    }
  },

  /**
   * 取消个人收藏书籍
   * @param {*} 
   */
  delCollection(e){
    wx.cloud.callFunction({
      name: 'cancelBook', 
      data: {
        _id: `${e.currentTarget.dataset.id}`
      }
    }).then(() => {
      this.queryBorrowBook()
      wx.showToast({
        title: '归换成功',
        icon: 'none',
        duration: 2000,
      });
    })
  }, 

  /**
   * 返回首页
   */

   goPage(e) {
    e.currentTarget.dataset.src ? wx.switchTab({
          url: e.currentTarget.dataset.src
    }) : wx.showToast({
          title: '暂未开放',
          icon: 'none', 
          duration: 2000,
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
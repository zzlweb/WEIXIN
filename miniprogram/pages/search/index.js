// miniprogram/pages/search/index.js
const app = getApp();
const db = wx.cloud.database();
wx.cloud.init();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bookList: [],
    value: '', 
    isEmpty: true,
    // 收藏书籍的集合
    collectionBook: wx.getStorageSync('collectionBook'),
  },

  /**
   * 
   * @param {*} options 
   * 搜索
   */
  async search() {
    if (this.data.value.trim() !== '') {
      wx.showLoading({
        title: '加载中...',
      })

      const value = this.data.value

      try {
         const res = await wx.cloud.callFunction({
          name: 'filterBook',
          data: {
            query: value
          }
        })
        wx.hideLoading();

        this.setData({
          bookList: res.result.data, 
          isEmpty: false
        })

      } catch (error) {
        wx.hideLoading();
        wx.showToast({
          title: '查询失败',
        })
        this.setData({
          isEmpty: true 
        })
      }
    }
  },

    /**
   * 收藏书籍页面
   */
     goDetail(e) {
      let collection;
  
      this.setData(
        {
          collectionBook: wx.getStorageSync('collectionBook'),
        },
        () => {
          if (this.data.collectionBook && this.data.collectionBook.length > 0) {
            collection = this.data.collectionBook;
            const result = collection.some((item) => {
              if (e.currentTarget.dataset.id._id == item._id) {
                return true;
              }
            });
  
            result &&
              wx.showToast({
                title: '请勿重复添加！',
                icon: 'none',
                duration: 1000,
              });
  
            !result && collection.push(e.currentTarget.dataset.id);
  
            !result &&
              wx.showToast({
                title: '添加借阅成功！',
                icon: 'none',
                duration: 1000,
              });
          } else {
            collection = [];
            collection.push(e.currentTarget.dataset.id);
            wx.showToast({
              title: '添加借阅成功！',
              icon: 'none',
              duration: 1000,
            });
          }
  
          wx.setStorageSync('collectionBook', collection);
        },
      );
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
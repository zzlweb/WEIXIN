// miniprogram/pages/publish/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    collectionBook: wx.getStorageSync('collectionBook'),
    // 是否显示空状态
    isEmpty: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.handleCollection();
  },

  /**
   * 处理数据
   */
  handleCollection() {
    this.setData({
      collectionBook: wx.getStorageSync('collectionBook'),
      isEmpty: false
    }, () => {
      if (!this.data.collectionBook || this.data.collectionBook.length === 0) {
        this.setData({
          isEmpty: true,
        });
      }
    });
  },

  /**
   * 删除book
   */
  delCollection(e) {
    const Index = e.currentTarget.dataset.index
    const collection = this.data.collectionBook

    collection.splice(Index, 1)

    this.setData({
        collectionBook: collection,
      },
      () => {
        wx.setStorageSync('collectionBook', collection);
        this.handleCollection();
      },
    );
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.handleCollection();
  },

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
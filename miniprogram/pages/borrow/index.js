// miniprogram/pages/publish/index.js
const app = getApp();
const db = wx.cloud.database();
wx.cloud.init();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    collectionBook: wx.getStorageSync('collectionBook'),
    // 是否显示空状态
    isEmpty: false,
    total: 0,
    // 提交借阅状态
    disabled: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 处理收藏逻辑
    this.handleCollection();
  },

  /**
   * 处理数据
   */
  handleCollection() {
    this.setData(
      {
        collectionBook: wx.getStorageSync('collectionBook'),
      },
      () => {
        if (
          !this.data.collectionBook ||
          this.data.collectionBook.length === 0
        ) {
          this.setData({
            isEmpty: true,
            disabled: true,
            total: 0,
          });
        } else {
          this.setData({
            isEmpty: false,
            total:
              wx.getStorageSync('collectionBook') &&
              wx.getStorageSync('collectionBook').length * 100,
            disabled: false,
          });
        }
      },
    );
  },

  /**
   * 删除book
   */
  delCollection(e) {
    const Index = e.currentTarget.dataset.index;
    const collection = this.data.collectionBook;

    collection.splice(Index, 1);

    this.setData(
      {
        collectionBook: collection,
      },
      () => {
        wx.setStorageSync('collectionBook', collection);
        this.handleCollection();
      },
    );
  },

  /**
   * 提交借阅书籍
   */
   async onSubmit() {
    let delIndex = []
    if (!app.openid) {
      wx.showToast({
        title: '请登录！',
        icon: 'none',
        duration: 1000,
      });
    } else {
      // 判断收藏数据中是否含有失效数据
      for( let item  of this.data.collectionBook){
        const bookData = await db.collection('books').where({
          _id : `${item._id}`
        }).get()

        if(bookData.data[0].status){
          // 说明该书籍已经被收藏，需要从收藏删除该书籍
          delIndex.push(item)
        }
      }

      if(delIndex.length > 0 ){
        wx.showToast({
          title: '有书籍已被借阅, 请移除！', 
          icon: 'none',
          duration: 2000,
        })

        delIndex.forEach(item => {
          const collection = this.data.collectionBook
          collection.forEach(it => {
            if(item._id === it._id){
              it.status = true 
            }
          })
          this.setData({
            collectionBook: collection
          })
        })
      }else{
      this.data.collectionBook.forEach((item) => {
        wx.cloud.callFunction({
          name: 'borrowBook',
          data: {
            _id: item._id,
            openid: app.openid,
            name: app.userinfo.nickName,
          },
          success: (res) => {
            wx.showToast({
              title: '借阅成功',
              icon: 'none',
              duration: 2000,
            });
            // 清空收藏数据更新本地数据
            this.setData(
              {
                collectionBook: [],
                isEmpty: true,
                total: 0,
                disabled: true,
              },
              () => {
                wx.setStorageSync('collectionBook', []);
              },
            );
          },
          fail: (err) => {
            wx.showToast({
              title: '操作失败',
              icon: 'none',
              duration: 2000,
            });
          },
        });
      });
      }

    }
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

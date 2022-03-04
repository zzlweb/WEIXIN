// miniprogram/pages/index/index.js
const app = getApp();
// 连接数据库
const db = wx.cloud.database();
// 引入配置文件
const config = require('../../config.js');
const _ = db.command;
wx.cloud.init();

Page({
  /**
   * 页面的初始数据
   */
  data: {
    scrollTop: 0,
    // 标题
    title: '云图书',
    // 获取分类导航的数据
    college: JSON.parse(config.data).college,
    // 导航栏和状态栏高度
    navigationBarAndStatusBarHeight:
      wx.getStorageSync('statusBarHeight') +
      wx.getStorageSync('navigationBarHeight') ,
    collegeCur: -1,
    list: [1],
    bookList: [],
    // 加载状态
    loading: true,
    // 展示空白状态
    showEmpty: false,
    // 收藏书籍的集合
    collectionBook: wx.getStorageSync('collectionBook'),
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    this.getbanner();
    this.getAllBooks();
  },

  /**
   * 获取轮播图
   */
  getbanner() {
    let that = this;
    db.collection('banner').get({
      success: function (res) {
        that.setData({
          banner: res.data[0].list,
        });
      },
    });
  },

  /**
   * 获取全部书籍信息
   */
  getAllBooks(QueryName) {
    let that = this;
    this.setData({
      loading: true,
      showEmpty: false,
      bookList: [],
    });
    if (!QueryName || QueryName === '全部') {
      wx.cloud.callFunction({
        name: 'QueryBook',
        complete: (res) => {
          const book = res.result.data.sort(config.compare('status'));
          this.isShowEmpty(book);
        },
      });
    } else {
      // 根据条件筛选
      that.setData({
        loading: true,
        bookList: [],
      });
      db.collection('books')
        .where({
          type: QueryName,
        })
        .get()
        .then((res) => {
          const book = res.data.sort(config.compare('status'));
          this.isShowEmpty(book);
        });
    }
  },

  /**
   * 根据数据展示空状态
   */
  isShowEmpty(book) {
    if (book.length === 0) {
      this.setData({
        bookList: [],
        loading: false,
        showEmpty: true,
      });
    } else {
      this.setData({
        bookList: book,
        loading: false,
        showEmpty: false,
      });
    }
  },

  /**
   * 获取布局设置
   */
  getListStyle() {
    wx.getStorage({
      key: 'iscard',
      success(res) {
        this.setData({
          iscard: res.data,
        });
      },
      fail() {
        this.setData({
          iscard: true,
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
        iscard: false,
      });
      wx.setStorage({
        key: 'iscard',
        data: false,
      });
    } else {
      that.setData({
        iscard: true,
      });
      wx.setStorage({
        key: 'iscard',
        data: true,
      });
    }
  },

  /**
   * 检测页面滚动
   */
  onPageScroll: function (e) {
    this.setData({
      scrollTop: parseInt(e.scrollTop * wx.getSystemInfoSync().pixelRatio),
    });

    // 导航栏透明度
    let Alpha = (e.scrollTop * 1) / 100;
    // 导航栏背景颜色
    let navigationBackgroundColor = 'rgba(83,96,194,' + Alpha + ')';
    this.setData({
      navigationBackgroundColor: navigationBackgroundColor,
    });
  },

  /**
   * 跳转搜索页面
   */
  search() {
    wx.navigateTo({
      url: '/pages/search/index',
    });
  },

  /**
   * 类型选择
   */
  collegeSelect(e) {
    const that = this;
    this.setData(
      {
        collegeCur: e.detail.index - 1 ,
        showList: false,
      },
      function () {
        const SelectBookItem = that.data.college.filter(
          (item) => item.id == that.data.collegeCur,
        );
        this.getAllBooks(SelectBookItem[0].name);
      },
    );
  },

  /**
   * 选择全部
   */
  selectAll() {
    this.setData({
      collegeCur: -1,
      showList: false,
    });
    this.getAllBooks();
  },

  /**
   * 展示全部分类
   */
  showCateList() {
    this.setData({
      showList: !this.data.showList,
    });
  },

  /**
   * 返回顶部
   */
  gotop() {
    wx.pageScrollTo({
      scrollTop: 0,
    });
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
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
      collectionBook: wx.getStorageSync('collectionBook'),
    });

    const SelectBookItem = this.data.college.filter(
      (item) => item.id == this.data.collegeCur,
    );
    this.getAllBooks(SelectBookItem[0] && SelectBookItem[0].name);
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    this.setData({
      collectionBook: wx.getStorageSync('collectionBook'),
    });
  },

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

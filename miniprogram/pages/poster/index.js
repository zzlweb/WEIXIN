// miniprogram/pages/poster/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: '', 
    author: "", 
    columns: ['平面', '交互', '前端', '创新', '新闻', '杂志', '其他'],
    type: "", 
    // 控制popup 显示隐藏
    show: false,
    selectType: '平面',
    // 图片集合
    fileList: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  // picker 选中回调
  onConfirm(event) {
    const { picker, value, index } = event.detail;
    this.setData({
      type: value,
      show: false
    })
  },

  onCancel() {
    this.setData({
      show: false
    })
  },

  onChange(event) {
    const { picker, value, index } = event.detail;
    this.setData({
      selectType: value,
    })
  },

  // 展示popup
  showPopup() {
    this.setData({ show: true });
  },

  // 关闭popup
  onClose() {
    this.setData({ show: false });
  },

  afterRead(event) {
    const { file } = event.detail;
    // 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
    wx.uploadFile({
      url: 'https://example.weixin.qq.com/upload', // 仅为示例，非真实的接口地址
      filePath: file.url,
      name: 'file',
      formData: { user: 'test' },
      success(res) {
        // 上传完成需要更新 fileList
        const { fileList = [] } = this.data;
        fileList.push({ ...file, url: res.data });
        this.setData({ fileList });
      },
    });
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
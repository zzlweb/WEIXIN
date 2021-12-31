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
    fileList: null,
    // 上传按钮状态: 默认禁用
    disabled: true,

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  // picker 选中回调
  onConfirm(event) {
    const {
      picker,
      value,
      index
    } = event.detail;
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
    const {
      picker,
      value,
      index
    } = event.detail;
    this.setData({
      selectType: value,
    })
  },

  // 展示popup
  showPopup() {
    this.setData({
      show: true
    });
  },

  // 关闭popup
  onClose() {
    this.setData({
      show: false
    });
  },

  beforeRead(event) {
    const {
      file,
      callback
    } = event.detail;
    callback(file.type === 'image');
    this.setData({
      fileList: file
    })
  },

  // 上传图片
  uploadToCloud() {
    wx.cloud.init();
    const {
      fileList
    } = this.data;
    if (!fileList.url) {
      wx.showToast({
        title: '请选择图片',
        icon: 'none'
      });
    } else {
      // 获取图片类型
      const index = fileList.url.indexOf('.')
      const type = fileList.url.substring(index)
      const uploadTasks = this.uploadFilePromise("indexPage/" + new Date().getTime() + `${type}`, fileList);
      wx.showLoading({
        title: '上传中！',
      })
      uploadTasks.then(data => {
          wx.hideLoading()
          wx.showToast({
            title: '上传成功',
            icon: 'none'
          });
          const newFileList = [{url: data.fileID}]
            
          this.setData({
            cloudPath: data,
            fileList: newFileList
          });
        })
        .catch(e => {
          wx.hideLoading()
          wx.showToast({
            title: '上传失败',
            icon: 'none'
          });
        });
    }
  },

  uploadFilePromise(fileName, chooseResult) {
    return wx.cloud.uploadFile({
      cloudPath: fileName,
      filePath: chooseResult.url
    });
  },

  // 删除图片
  deleteImg() {
    const that = this 
    wx.cloud.deleteFile({
      fileList: [this.data.fileList[0].url]
    }).then(res => {
      wx.showToast({
        title: '删除成功',
      })
      this.setData({
        fileList: null
      })
    }).catch(error => {
      // handle error
      wx.showToast({
        title: '删除失败',
      })
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
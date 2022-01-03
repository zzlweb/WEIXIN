// miniprogram/pages/poster/index.js
const app = getApp();
const db = wx.cloud.database();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    // 书籍名称
    name: '',
    // 书籍上传人
    author: '',
    columns: ['平面', '交互', '前端', '创新', '新闻', '杂志', '其他'],
    // 书籍分类
    type: '',
    // 控制popup 显示隐藏
    show: false,
    selectType: '平面',
    // 图片集合
    fileList: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {},

  onSubmit(e) {
    if (this.data.name.trim() === '') {
      wx.showToast({
        title: '书籍名称不能为空',
        icon: 'none',
        duration: 1000,
      });
      return false;
    } else if (this.data.name.length > 6) {
      wx.showToast({
        title: '书籍名称不超过6个字',
        icon: 'none',
        duration: 1000,
      });
      return false;
    }

    if (this.data.author.trim() == '') {
      wx.showToast({
        title: '捐赠人不能为空',
        icon: 'none',
        duration: 1000,
      });
      return false;
    } else if (this.data.author.length > 5) {
      wx.showToast({
        title: '姓名不超过5个字',
        icon: 'none',
        duration: 1000,
      });
      return false;
    }

    if (this.data.type == '') {
      wx.showToast({
        title: '书籍类型不能为空',
        icon: 'none',
        duration: 1000,
      });
      return false;
    }

    if (this.data.fileList == '') {
      wx.showToast({
        title: '请上传封面',
        icon: 'none',
        duration: 1000,
      });
      return false;
    }

    const { author, name, type, fileList } = this.data;
    db.collection('books')
      .add({
        data: {
          name,
          author,
          openid: '',
          status: false,
          type,
          url: fileList[0].url,
        },
      })
      .then((res) => {
        if (res.errMsg === 'collection.add:ok') {
          wx.showToast({
            title: '上传成功',
            duration: 1000,
          });

          this.setData({
            name: '',
            author: '',
            type: '',
            fileList: null,
          });
        }
      })
      .catch((err) => {
        // 删除图片
        wx.showToast({
          title: '上传失败',
          duration: 1000,
        });
      });
  },

  // picker 选中回调
  onConfirm(event) {
    const { picker, value, index } = event.detail;
    this.setData({
      type: value,
      show: false,
    });
  },

  onCancel() {
    this.setData({
      show: false,
    });
  },

  onChange(event) {
    const { picker, value, index } = event.detail;
    this.setData({
      selectType: value,
    });
  },

  // 展示popup
  showPopup() {
    this.setData({
      show: true,
    });
  },

  // 关闭popup
  onClose() {
    this.setData({
      show: false,
    });
  },

  beforeRead(event) {
    const { file, callback } = event.detail;
    callback(file.type === 'image');
    this.setData({
      fileList: file,
    });
  },

  // 上传图片
  uploadToCloud() {
    wx.cloud.init();
    const { fileList } = this.data;
    if (!fileList.url) {
      wx.showToast({
        title: '请选择图片',
        icon: 'none',
      });
    } else {
      // 获取图片类型
      const index = fileList.url.indexOf('.');
      const type = fileList.url.substring(index);
      const uploadTasks = this.uploadFilePromise(
        'indexPage/' + new Date().getTime() + `${type}`,
        fileList,
      );
      wx.showLoading({
        title: '上传中！',
      });
      uploadTasks
        .then((data) => {
          wx.hideLoading();
          wx.showToast({
            title: '上传成功',
            icon: 'none',
          });
          const newFileList = [{ url: data.fileID }];

          this.setData({
            cloudPath: data,
            fileList: newFileList,
          });
        })
        .catch((e) => {
          wx.hideLoading();
          wx.showToast({
            title: '上传失败',
            icon: 'none',
          });
        });
    }
  },

  uploadFilePromise(fileName, chooseResult) {
    return wx.cloud.uploadFile({
      cloudPath: fileName,
      filePath: chooseResult.url,
    });
  },

  // 删除图片
  deleteImg() {
    const that = this;
    wx.cloud
      .deleteFile({
        fileList: [this.data.fileList[0].url],
      })
      .then((res) => {
        wx.showToast({
          title: '删除成功',
        });
        this.setData({
          fileList: null,
        });
      })
      .catch((error) => {
        // handle error
        wx.showToast({
          title: '删除失败',
        });
      });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},

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

const app = getApp()
Component({
  properties: {
    navbarData:{
      type:String,
      value: '云图书'
    },
    back:{
      type: Boolean, 
      value: false
    },
    home:{
      type:Boolean, 
      value:false
    },
    navigationBackgroundColor:{
      type: String,
      value: 'rgba(83,96,194,0)'
    }
  },
  data: {
    // 状态栏高度
    statusBarHeight: wx.getStorageSync('statusBarHeight') + 'px',
    // 导航栏高度
    navigationBarHeight: wx.getStorageSync('navigationBarHeight') + 'px',
    // 胶囊按钮高度
    menuButtonHeight: wx.getStorageSync('menuButtonHeight') + 'px',
    // 导航栏和状态栏高度
    navigationBarAndStatusBarHeight:
      wx.getStorageSync('statusBarHeight') +
      wx.getStorageSync('navigationBarHeight') +
      'px'
  },
  attached: function () {
  },

  methods: {
    // 返回上一页面
    _navback() {
      try {
        wx.navigateBack()
      } catch (error) {
      }
    },
    //返回到首页
    _backhome() {
      wx.switchTab({
        url: '/pages/index/index',
      })
    }
  }
})
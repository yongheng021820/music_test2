// components/navgation_bar/index.js
Component({
  options:{
    multipleSlots:true
  },
  /**组件的属性列表*/
  properties: {

  },

  /**组件的初始数据*/
  data: {
    statusBarHeight: getApp().globalData.statusBarHeight
  },
  // 组件的生命函数周期写在此处
  lifetimes:{
    created: function () {
      const info = wx.getSystemInfoSync()
      // console.log("ready")
      // 获取不同版本手机导航栏高度
      console.log(info.statusBarHeight)
    }
  },
  /**组件的方法列表*/
  methods: {
    handle_arrow(){
      wx.navigateTo({
        url: '/components/song-item-v1/index',
      })
    }
  }
})

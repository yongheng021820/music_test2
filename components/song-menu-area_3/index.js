// components/song-menu-area_3/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    obj:{
      type:Object,
      value: {}
    },
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  // 事件处理  点击更多
  methods: {
    click_add(){
      wx.navigateTo({
        url: '/pages/detail-songs/index',
      })
    }
  }
})

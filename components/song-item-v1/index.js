// components/song-item-v1/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    item:{
      type: Object,
      value:{}
    }
  },

  /*组件的初始数据*/
  data: {

  },

  /**组件的方法列表*/
  methods: {
    hand_item_click(){
      const id = this.properties.item.id
      wx.navigateTo({
        url: '/pages/music_player/index?id=' + id
      })
      // console.log(id)
    },
  }
})

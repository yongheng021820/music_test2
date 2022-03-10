import { playerStore } from "../../utils/player-store"

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
      // 1.页面跳转
      wx.navigateTo({
        url: '/pages/music_player/index?id=' + id
      })
      // 2、对歌曲数据的请求（数据共享）和其他操作
      playerStore.dispatch("playMusicWithSongIdAction", {id})
    },
  }
})

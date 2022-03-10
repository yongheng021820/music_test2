// components/song-menu-area_3/index.js
import {rankingMap} from "../../pages/store/ranking-store"
Component({
  /**组件的属性列表*/
  properties: {
    obj:{
      type:Object,
      value: {}
    },
    id:{
      type: Number,
      value: 0
    }
  },

  /**组件的初始数据 */
  data: {

  },

  /** 组件的方法列表*/
  // 事件处理  点击更多
  methods: {
    navigateToDdetailSongsPage(rankingName){
      wx.navigateTo({
        url: `/pages/detail-songs/index?ranking=${rankingName}`,
      })
    },
    click_add(){
      // console.log(rankingMap[this.id])
      this.navigateToDdetailSongsPage(rankingMap[this.id])
    }, 
  }
})

// module.exports = {navigateToDdetailSongsPage: navigateToDdetailSongsPage}
// export default{navigateToDdetailSongsPage}



// pages/detail-songs/index.js
import {rankingStore} from "../../pages/store/ranking-store"
// import {navigateToDdetailSongsPage} from "../../components/song-menu-area_3/index"
Page({
  /**页面的初始数据*/
  data: {
    rakingName:"",
    rakingInfo:{}
  },  

  /**生命周期函数--监听页面加载*/
  onLoad: function (options) {
    // 获取ranking
    const ranking = options.ranking
    this.setData({rakingName: ranking})
    // 获取数据
    rankingStore.onState(ranking, this.getRankingDataHanler)
  },

  onUnload: function () {
    // 页面销毁时取消监听
    rankingStore.offState(this.data.rakingName, this.getRankingDataHanler)
  },
  getRankingDataHanler(res){
    // console.log(res.tracks)
    this.setData({rakingInfo: res})
  }
})

// export {getRankingDataHanler}
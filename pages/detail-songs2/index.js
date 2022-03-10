// pages/detail-songs2/index.js
import {rankingStore} from "../../pages/store/ranking-store"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    rankingInfo:{},
    type:''
  },

  /**生命周期函数--监听页面加载*/
  onLoad: function (options) {
    const type = options.ranking
    this.setData({type})
    rankingStore.onState(type, this.getRankingMore)
  },

  getRankingMore(res){
    this.setData({rankingInfo: res})
  },

  /**生命周期函数--监听页面初次渲染完成*/
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

  /**生命周期函数--监听页面卸载*/
  onUnload: function () {
    // 离开时，取消监听
    rankingStore.offState(this.data.type, this.getRankingMore)
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
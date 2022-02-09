// pages/detailVideo/detailVideo.js
import {getMVDetail, getMVURL, getRelatedVideo} from "../service/index"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    mvUrl:{},
    MVDetail:{},
    RelatedVideo:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const id = options.id
    console.log(options)
    console.log(options.id)
    // this.setData({id: options.id})

    
    // 1、请求播放地址
    getMVURL(id).then(res => {
      this.setData({mvUrl: res.data.data})
    }).catch(err =>{
      console.log(err)
    })

    // 2、请求视频信息
    getMVDetail(id).then(res =>{
      console.log(res)
      this.setData({MVDetail: res.data})
    }).catch(err =>{
      console.log(err)
    })

    // 3、请求相关视频
    getRelatedVideo(id).then(res =>{
      console.log(res.data.data)
      this.setData({RelatedVideo: res.data})
    }).catch(err =>{
      console.log(err)
    })
  },

  // 事件处理
  related_clicked(){
    console.log("item_click")
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
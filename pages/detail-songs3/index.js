// pages/detail-songs3/index.js
import zhRequest from "../service/index"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    info: {}
  },

  /**生命周期函数--监听页面加载*/
  onLoad: function (options) {
    console.log(options.id)
    const id = options.id
    zhRequest.get('playlist/detail/dynamic',{id}).then(
      res =>{
        this.setData({info: res.data.playlist})
      }
    ).catch(
      err =>{console.log(err)}
    )
  },

  click_1(event){
    const id = event.currentTarget.dataset.item.al.id
    // console.log(event.currentTarget.dataset.item.al.id)
    wx.navigateTo({
      url: '/pages/music_player/index?id='+ id,
    })
  },
  // currentTarget.dataset
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
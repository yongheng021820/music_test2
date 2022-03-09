// pages/video/video.js
import zhRequest from "../service/index"


Page({

  /**
   * 页面的初始数据
   */
  data: {
    topMovies: [],
    hasMore: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // const _this = this
    // wx.request({
    //   url: 'http://123.207.32.32:9001/top/mv',
    //   data: {
    //     offset:0,
    //     limit:10
    //   },
    //   success(res){
    //     _this.setData({topMovies: res.data.data})
    //   },
    //   fail(err){
    //     console.log(err)
    //   }
    // })
    zhRequest.get('top/mv', {
      offset: 0,
      limit: 10
    }).then(res => {
      this.setData({
        topMovies: res.data.data
      })
    }).catch(err => {
      console.log(err)
    })

  },

  // 下拉刷新，加载最新10条数据
  //  "enablePullDownRefresh": true,
  // wx.showNavigationBarLoading(),
  onPullDownRefresh() {
    // zhRequest.get('top/mv',{offset: 0,limit: 10}).then(res =>{
    //   this.setData({topMovies: res.data.data})
    // }).catch(err =>{
    //   console.log(err)
    // })
    wx.showNavigationBarLoading() //下拉刷新动画，请求数据结束后 停止
    console.log("下拉加载")//用最新10条数据覆盖前边所有数据
    zhRequest.get('top/mv', {
      offset: 0,
      limit: 10
    }).then(res => {
      setTimeout(()=>{
        this.setData({
          topMovies: res.data.data
        })
        wx.hideNavigationBarLoading()//停止加载动画
      },1000)
      
    }).catch(err => {
      console.log(err)
    })
   
  },


  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (!this.data.hasMore) return
    var length = this.data.topMovies.length
    var res = zhRequest.get('top/mv', {
      offset: length,
      limit: 10
    }).then(res => {

      this.setData({
        // topMovies: this.data.topMovies.push(...res.data.data)
        topMovies: this.data.topMovies.concat(res.data.data)
      })
      this.setData({
        hasMore: res.data.hasMore
      })
    }).catch(err => {
      console.log(err)
    })
    // console.log(this)
    // console.log( this.data)
    // console.log( this.data.topMovies.length)
  },

  // 事件处理
  handVideoClicked(event){
    console.log("item clicked", event)
    // console.log(event.currentTarget.dataset.item.id)
    const id = event.currentTarget.dataset.item.id
    // 页面跳转
    wx.navigateTo({
      url: `/pages/detailVideo/detailVideo?id=${id}`,
      // url:"../detailVideo/detailVideo?id=" + id
    })
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
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
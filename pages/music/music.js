import {
  getBanners,
  getSongMenu
} from "../service/api_music"

import quer_rect from "../../utils/quer_rect"
// 导入数据共享库
// import {rankingStore} from "../store/index"
import {
  rankingStore
} from "../store/ranking-store"
import {
  playerStore
} from "../../utils/player-store"

// pages/music/music.js
Page({

  /** 页面的初始数据*/
  data: {
    banners: [],
    recommendsSongs: [],
    hotSongsMenu: [],
    newRanking: {}, //1新歌榜
    originRanking: {}, //2原创榜
    upRanking: {}, //3飙升榜

    currentSong: {},
    song_detail_length: 0,
    isPlaying: true
  },

  /** 生命周期函数--监听页面加载*/
  onLoad: function (options) {
    // playerStore.dispatch("playMusicWithSongIdAction",{id: 137142551})
    // console.log(Object.keys(playerStore.songs_detail).length)
    // console.log(this.data.currentSong)
    // console.log(Object.keys(this.data.currentSong).length)
    // console.log(Object.keys(playerStore.songs_detail).length)
    // console.log(playerStore.state.songs_detail)
    // console.log(Object.keys(playerStore.state.songs_detail).length)

    // 根据共享库数据songs_detail 是否有值决定是否显示播放工具栏
    playerStore.onState("songs_detail", (songs_detail) => {
      this.setData({
        song_detail_length: Object.keys(playerStore.state.songs_detail).length
      })
    })

    // 播放监听
    playerStore.onStates(["songs_detail"], ({songs_detail}
      ) => {
      if (Object.keys(songs_detail).length) {
        this.setData({
          currentSong: songs_detail
        })
      }
    })

    // 播放状态
    playerStore.onStates(["isPlaying"], ({isPlaying}
      ) => {
      if (isPlaying == undefined) {
        this.setData({
          isPlaying,
          // 设置animation-play-state旋转属性，旋转或暂停
          playAnimState: isPlaying ? "running" : "paused"
        })
        
      }
      console.log(this.data.isPlaying)
    })

    // 请求轮播图数据
    getBanners().then(res => {
      // console.log(res)
      // setData 在设置data数据上，是同步的
      // 通过最新的数据对wxml进行渲染，渲染的过程是异步
      this.setData({
        banners: res.data.banners
      })
    }).catch(err => {
      console.log(err)
    })

    // 请求热歌榜数据
    getSongMenu().then(res => {
      // console.log(res.data)
      this.setData({
        hotSongsMenu: res.data.playlists
      })
    }).catch(err => {
      console.log(err)
    })

    // 请求热歌榜数据
    getSongMenu("华语").then(res => {
      this.setData({
        recommendsSongs: res.data.playlists
      })
    }).catch(err => {
      console.log(err)
    })

    // 发起共享数据的请求
    rankingStore.dispatch("getRankingDataAction")

    // 从store获取共享的数据  热门榜
    rankingStore.onState("hotRanking", res => {
      // console.log("home-music", res)
      if (!res.tracks) return
      // console.log(res.tracks.slice(0, 6))
      const rec = res.tracks.slice(0, 6)
      // console.log(res.slice(0, 6))
      this.setData({
        recommendsSongs: rec
      })
    })
    // 新歌榜
    rankingStore.onState("newRanking", res => {
      // console.log("home-music", res)
      if (!res.tracks) return
      this.setData({
        newRanking: res
      })
      // console.log(res)
      // const new =  res.tracks.slice(0, 6)
      // console.log(res.slice(0, 6))
      // this.setData({recommendsSongs: res})
    })
    // 原创榜
    rankingStore.onState("originRanking", res => {
      // console.log("home-music", res)
      if (!res.tracks) return
      // console.log(res)
      this.setData({
        originRanking: res
      })
    })
    // 飙升榜
    rankingStore.onState("upRanking", res => {
      // console.log("home-music", res)
      if (!res.tracks) return
      // console.log(res)
      this.setData({
        upRanking: res
      })
    })
  },

  // 事件处理
  handleSearchClick() {
    wx.navigateTo({
      url: '../music_search/index',
    })
  },
  chik_clcik() {
    wx.navigateTo({
      url: '/pages/detail-songs2/index?ranking=originRanking',
    })

  },

  //图片加载完成
  hand_swiper_img_load() {
    //获取组件的高度  API--WXML--wx.createSelectorQuery()
    quer_rect('.image').then(res => {
      const rect = res[0]
      this.setData({
        swiper_height: rect.height
      })
    })
  },
  // 处理 song item点击
  handle_itemClick(event) {
    // console.log(event)
    const index = event.currentTarget.dataset.index
    console.log(index)
    playerStore.setState("playListSongs", this.data.recommendsSongs)
    playerStore.setState("playListIndex", index)
    // console.log(playerStore.state)
  },

  // 处理工具栏事件
  // 点击播放暂停
  handle_play_click() {
    playerStore.dispatch("changeMusicPlayStatusAction", !this.data.isPlaying)
  },
  handlePlayBarClick(){
    wx.navigateTo({
      url: '/pages/music_player/index?id=' + this.data.currentSong.id,
    })
    // console.log(this.data.currentSong)
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
// pages/music/music_player/index.js
// import {
//   getPageDate,
//   getSongLyric
// } from "../service/api_music"

// import {
//   parserLyric
// } from "../../utils/parse-lyrci"

import {
  audioContext
} from "../../utils/play"
import {
  playerStore
} from "../../utils/player-store"

const playModeNames = ["order","repeat","random"]

Page({
  /**页面的初始数据*/
  data: {
    id: 0,
    songs_detail: [],
    contentHeight: 0,
    currentPage: 0,
    lyricInfos: [],
    currentLyrciText: '',
    currentLyricIndex: 0,

    isMuscilyric: true,
    currentTime: 0,
    durationTime: 0,
    sliderValue: 0,
    isSliderChanging: false,
    lyricScrollTop: 0,

    playModeIndex: 0,
    playModeName: "order",

    isPlaying: false,
    playingName:"resume"

  },

  /** 生命周期函数--监听页面加载*/
  onLoad: function (options) {
    // 1 获取id
    const id = options.id
    this.setData({
      id: options.id
    })
    // console.log(options.id)
    // 2、根据id获取播放数据
    // this.getPage(id)
    this.setupPlayerStoreListener()

    // 获取屏幕高度、导航栏高度、轮播图高度
    const globalData = getApp().globalData
    // const statusBarHeight =  getApp().globalData.statusBarHeight
    const screenHeight = globalData.screenHeight
    const statusBarHeight = globalData.statusBarHeight
    const contentHeight = screenHeight - statusBarHeight - 44
    const devicerRadio = globalData.devicerRadio
    // console.log(screenHeight,statusBarHeight,contentHeight,globalData)
    this.setData({
      contentHeight,
      isMuscilyric: devicerRadio >= 2
    })
    // console.log(devicerRadio, this.data.isMuscilyric)

    // 创建播放器
    // audioContext.stop()
    // audioContext.src = `https://music.163.com/song/media/outer/url?id=${id}.mp3`
    // audioContext.autoplay = true

    // audioContext.onCanplay(() => {
    //   audioContext.play()
    // })
    // audioContext.onTimeUpdate(() => {
    //   // console.log(audioContext.currentTime)
    //   const currentTime = audioContext.currentTime * 1000

    //   // 根据当前时间修改current、sliderValue
    //   if (!this.data.isSliderChanging) {
    //     const sliderValue = currentTime / this.data.durationTime * 100
    //     // 设置进度球自动移动  //拖动时时间不做修改
    //     this.setData({
    //       sliderValue,
    //       currentTime
    //     })
    //   }

    //   // 根据当前时间去查找播放的歌词
    //   for (let i = 0; i < this.data.lyricInfos.length; i++) {
    //     const lyricInfo = this.data.lyricInfos[i]
    //     if (currentTime < lyricInfo.time) {
    //       const currentIndex = i - 1
    //       const cuurentLyricInfo = this.data.lyricInfos[currentIndex]
    //       if(!this.data.lyricInfos.length)return
    //       if (this.data.currentLyricIndex !== currentIndex) {
    //         // console.log(cuurentLyricInfo.text)
    //         this.setData({
    //           currentLyrciText: cuurentLyricInfo.text,
    //           currentLyricIndex: currentIndex,
    //           lyricScrollTop: currentIndex * 35
    //         })
    //       }
    //       break
    //     }
    //   }
    // })
  },


  // ******************数据请求**********************
  // getPage(id) {
  //   getPageDate(id).then(res => {
  //       console.log(res.data)
  //       this.setData({
  //         songs_detail: res.data.songs[0],
  //         durationTime: res.data.songs[0].dt
  //       })
  //     }).catch(err => {
  //       console.log(err)
  //     }),

  //     // 请求歌词
  //     getSongLyric(id).then(res => {
  //       console.log(res.data.lrc.lyric)
  //       const lyricString = res.data.lrc.lyric
  //       const lyrrics = parserLyric(lyricString)
  //       this.setData({
  //         lyricInfos: lyrrics
  //       })
  //       console.log(lyrrics)
  //     }).catch(err => {
  //       console.log(err)
  //     })
  // },


  // **************** slider相关事件处理 **********************
  handleSwiperChange(event) {
    // this.setData({currentPage:event.detail.current})
    this.setData({
      currentPage: event.detail.current
    })
    // console.log(event)
  },
  handle_sliderClickd(event) {
    // console.log(event.timeStamp)
    // console.log(event.detail.value)
    // 1、获取slider变化的值
    const value = event.detail.value

    // 2、计算需要播放的currentTime
    const currentTime = this.data.durationTime * value / 100
    this.setData({
      currentTime
    })
    const sliderValue = currentTime / this.data.durationTime * 100
    this.setData({
      sliderValue
    })
    // 3、设置context    currentTime位置的音乐
    //先把播放暂停
    // audioContext.pause() 
    audioContext.seek(currentTime / 1000)
    // 4、记录最新的sliderValue
    this.setData({
      sliderValue: value,
      isSliderChanging: false
    })
  },

  //拖动进度球 
  handle_sliderClickding(event) {
    const value = event.detail.value
    const currentTime = this.data.durationTime * value / 100
    this.setData({
      isSliderChanging: true,
      currentTime: currentTime
    })
  },
  // 处理点击返回键
  handle_backClick() {
    wx.navigateBack()
  },
  // 处理点击切花换播放模式
  handleModeBtnClick() {
    let playModeIndex =this.data.playModeIndex + 1
    if(playModeIndex ===3) playModeIndex = 0
    playerStore.setState("playModeIndex", playModeIndex)
  },
  // 处理点击播放暂停键
  handle_playClick(){
    playerStore.dispatch("changeMusicPlayStatusAction", !this.data.isPlaying)
  },
  //处理上一曲
  handlePrevBtnClick(){
    // console.log("up")
    playerStore.dispatch("hangeNewMusicPrevAction")
  },

  // 处理下一曲
  handleNextBtnClick(){
    playerStore.dispatch("changeNewMusicNextAction")
  },

  setupPlayerStoreListener() {
    // 1、监听数据
    playerStore.onStates(['songs_detail', 'durationTime', 'lyricInfos'], ({
      songs_detail,
      durationTime,
      lyricInfos
    }) => {
      if (songs_detail) this.setData({
        songs_detail
      })
      if (durationTime) this.setData({
        durationTime
      })
      if (lyricInfos) this.setData({
        lyricInfos
      })
    })

    //2、监听 currentLyrciText currentLyricIndex currentTime
    playerStore.onStates(['currentLyrciText', 'currentLyricIndex',
      'currentTime'
    ], ({
      currentLyrciText,
      currentLyricIndex,
      currentTime
    }) => {
      // 时间变化
      if (currentTime && !this.data.isSliderChanging) {
        const sliderValue = currentTime / this.data.durationTime * 100
        this.setData({
          currentTime,
          sliderValue
        })
      }
      // 歌词变化
      if (currentLyricIndex) {
        this.setData({
          currentLyricIndex,
          lyricScrollTop: currentLyricIndex * 35
        })
      }
      if (currentLyrciText) {
        this.setData({
          currentLyrciText
        })
      }
    })

    //3、监听播放模式相关的数据
    playerStore.onState('playModeIndex', (playModeIndex) =>{
      if(playModeIndex !== undefined){
      this.setData({playModeIndex,playModeName:playModeNames[playModeIndex]})
    }
    })

    // 4 播放暂停按键
    playerStore.onState('isPlaying',(isPlaying) =>{
      if(isPlaying !== undefined){
        this.setData({isPlaying, playingName: isPlaying ? "pause" : "resume"})
      }
    })
  },

  /**生命周期函数--监听页面初次渲染完成*/
  onReady: function () {

  },
  /**生命周期函数--监听页面卸载*/
  onUnload: function () {

  },
})

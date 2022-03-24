import {
  HYEventStore
} from "hy-event-store"
import {
  getPageDate,
  getSongLyric
} from "../pages/service/api_music"

import {
  audioContext
} from "../utils/play"

import {
  parserLyric
} from "../utils/parse-lyrci"

const playerStore = new HYEventStore({
  state: {
    id: 0,
    songs_detail: {},
    durationTime: 0,
    lyricInfos: [],

    currentLyrciText: '',
    currentLyricIndex: 0,
    currentTime: 0,

    playModeIndex: 0, //0 循环播放 1 单曲循环 2随机播放

    isPlaying: false,
    isStoping: false,

    playListSongs: [],
    playListIndex: '',

    isFristPlay:true
  },
  actions: {
    // 1、请求歌曲信息
    playMusicWithSongIdAction(ctx, {
      id,isRefsh = false
    }) {
      if (ctx.id == id) {
        this.dispatch("changeMusicPlayStatusAction", true)
        return
      }
      ctx.id = id

      // 修改播放状态
      ctx.isPlaying = true
      // 清除上首歌残影
      ctx.isPlaying = true
      ctx.songs_detail = {}
      ctx.durationTime = 0
      ctx.lyricInfos = []
      ctx.currentTime = 0
      ctx.currentLyricIndex = 0
      ctx.currentLyrciText = ""

      // 请求歌曲详情
      getPageDate(id).then(res => {
          ctx.songs_detail = res.data.songs[0]
          ctx.durationTime = res.data.songs[0].dt
          audioContext.title = res.data.songs[0].name
        }).catch(err => {
          console.log(err)
        }),

        // 请求歌词
        getSongLyric(id).then(res => {
          // console.log(res.data.lrc.lyric)
          const lyricString = res.data.lrc.lyric
          const lyrrics = parserLyric(lyricString)
          ctx.lyricInfos = lyrrics
          // console.log(lyrrics)
        }).catch(err => {
          console.log(err)
        })

      // 2/创建播放器 播放对应id歌曲
      audioContext.stop()
      audioContext.src = `https://music.163.com/song/media/outer/url?id=${id}.mp3`
      audioContext.title= id
      audioContext.autoplay = true

      // 3、监听audioContext一些事件,这里this 指的是 创建的 playerStore对象
      if(ctx.isFristPlay){
        this.dispatch('setupAudioContextListererAction')
        ctx.isFristPlay = false
      }
    },
    setupAudioContextListererAction(ctx) {
      // 1、监听歌曲可以播放
      audioContext.onCanplay(() => {
        audioContext.play()
      })
      // 2、监听时间改变
      audioContext.onTimeUpdate(() => {
        // 1、获取当前时间
        const currentTime = audioContext.currentTime * 1000


        // 2、根据当前时间修改current、sliderValue
        ctx.currentTime = currentTime

        // 根据当前时间去查找播放的歌词
        for (let i = 0; i < ctx.lyricInfos.length; i++) {
          const lyricInfo = ctx.lyricInfos[i]
          if (currentTime < lyricInfo.time) {
            const currentIndex = i - 1
            const cuurentLyricInfo = ctx.lyricInfos[currentIndex]
            if (!ctx.lyricInfos.length) return
            if (ctx.currentLyricIndex !== currentIndex) {
              // console.log(cuurentLyricInfo.text)
              // this.setData({
              //   currentLyrciText: cuurentLyricInfo.text,
              //   currentLyricIndex: currentIndex,
              //   lyricScrollTop: currentIndex * 35
              // })
              ctx.currentLyrciText = cuurentLyricInfo.text
              ctx.currentLyricIndex = currentIndex
            }
            break
          }
        }
      })
      // 3、监听歌曲播放完成
      audioContext.onEnded(()=>{
        this.dispatch("changeNewMusicNextAction")
      })
      // 4、监听音乐播放、暂停状态
      // 播放状态
      audioContext.onPlay(()=>{
        ctx.isPlaying = true
        // 或者调用 修改状态函数changeMusicPlayStatusAction
      })
      // 暂停状态
      audioContext.onPause(() =>{
        ctx.isPlaying = false
      })
      // 停止状态
      audioContext.onStop(()=>{
        ctx.isPlaying = false
        ctx.isStoping = true
      })
    },
    // 修改播放状态
    changeMusicPlayStatusAction(ctx, isPlaying) {
      ctx.isPlaying = isPlaying
      // 播放状态是暂停，且后台停止状态，重新给其播放内容
      if(ctx.isPlaying && ctx.isStoping){
        audioContext.src = `https://music.163.com/song/media/outer/url?id=${id}.mp3`
        audioContext.title = currentSong.name
        audioContext.seek(ctx.currentTime)
        ctx.isStoping = false
      }
      ctx.isPlaying ? audioContext.play() : audioContext.pause()
    },
    // 上一曲
    hangeNewMusicPrevAction(ctx) {
       // 1/获取当前索引
       let index = ctx.playListIndex
       // 2、根据不同的播放模式，获取夏一首歌曲的索引
       switch(ctx.playModeIndex){
         case 0: //顺序播放
         index = index - 1
         if(index === -1) index = ctx.playListSongs.length -1 
         break
         case 1: //单曲循环
           break
         case 2: //随机播放
         index = Math.floor(Math.random() * ctx.playListSongs.length)
           break
       }
 
       let currentSong = ctx.playListSongs[index]
       if(!currentSong) {currentSong = ctx.currentSong}else {
         // 索引更新后 用新的索引做记录
         ctx.playListIndex = index
       }
       
       // 播放歌曲
       this.dispatch("playMusicWithSongIdAction",{id:currentSong.id , isRefsh: true})
    },

    // 下一曲
    changeNewMusicNextAction(ctx) {
      console.log(ctx)
      // 1/获取当前索引
      let index = ctx.playListIndex
      // 2、根据不同的播放模式，获取夏一首歌曲的索引
      switch(ctx.playModeIndex){
        case 0: //顺序播放
        index = index + 1
        if(index === ctx.playListIndex.length) idnex = 0
        break
        case 1: //单曲循环
          this.dispatch("playMusicWithSongIdAction",{id:ctx.id,isRefsh: true})
          break
        case 2: //随机播放
        index = Math.floor(Math.random() * ctx.playListSongs.length)
          break
      }

      let currentSong = ctx.playListSongs[index]
      if(!currentSong) {currentSong = ctx.currentSong}else {
        // 索引更新后 用新的索引做记录
        ctx.playListIndex = index
      }
      
      // 播放歌曲
      this.dispatch("playMusicWithSongIdAction",{id:currentSong.id , isRefsh: true})
    },
  }
})

export {
  playerStore
}
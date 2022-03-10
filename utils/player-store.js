import {
  HYEventStore
} from "hy-event-store"
import {
  getPageDate,
  getSongLyric
} from "../pages/service/api_music"

import {parserLyrci} from "../utils/parse-lyrci"


const playerStore = new HYEventStore({
  state: {
    id: 0,
    songs_detail: {},
    durationTime: 0,
    lyricInfos: []
  },
  action: {
    // 请求歌曲信息
    playMusicWithSongIdAction(ctx, {id}) {
      ctx.id = id
      // 请求歌曲详情
      getPageDate(id).then(res => {
            ctx.songs_detail = res.data.songs[0]
            ctx.durationTime = res.data.songs[0].dt
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
    }
  }
})

export {
  playerStore
}
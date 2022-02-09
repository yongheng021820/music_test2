import {
  HYEventStore
} from 'hy-event-store'
import {
  getRankings
} from '../service/api_music'
const rankingMap = {
  0: "newRanking",
  1: "hotRanking",
  2: "originRanking",
  3: "upRanking"
}
const rankingStore = new HYEventStore({
  state: {
    newRanking: {}, //0新歌榜
    hotRanking: {}, //1热门榜
    originRanking: {}, //2原创榜
    upRanking: {} //3飙升榜
  },
  actions: {
    getRankingDataAction(ctx) {
      // getRankings(1).then(res =>{
      //   // console.log(res.data.playlist)
      //   ctx.hotRanking = res.data.playlist
      // })

      for (let i = 0; i < 4; i++) {
        // 0新歌榜 1热门榜 2原创榜 3飙升榜
        getRankings(i).then(res => {
          const rankingName = rankingMap[i]
          ctx[rankingName] = res.data.playlist
          /*
            switch(i){
              case 0:
                ctx.newRanking = res.data.playlist
                break;
              case 1:
                ctx.hotRanking = res.data.playlist
                break;
              case 2:
                ctx.originRanking = res.data.playlist
                break;
              case 3:
                ctx.upRanking = res.data.playlist
                break;
            }  */
        }).catch(err => {
          console.log(err)
        })
      }
    }
  }
})

export {
  rankingStore
}

// 出口在index
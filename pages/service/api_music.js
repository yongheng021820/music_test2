import zhRequest from "./index"

export function getBanners(){
  return zhRequest.get('banner', {
    type: 2
  })
}

export function getRankings(idx){
  return zhRequest.get('top/list',{
    idx
  })
}

export function getSongMenu(
  cat="全部", limit=6, offset=0
){
  return zhRequest.get('top/playlist', {
    cat,
    limit,
    offset
  })
}

export function getSearchHot(){
  return zhRequest.get('search/hot')
}

export function getSearchSuggest(keywords){
  return zhRequest.get('search/suggest',{
    keywords,
    type:'mobile'
  })
}

export function getSearchResult (keywords){
  return zhRequest.get('search', {
    keywords
  })
}
//获取音乐播放数据 
export function getPageDate(ids) {
  return zhRequest.get('song/detail',{ids})
  // return zhRequest.get(`song/detail?ids=${ids}`)
}

// 获取播放歌词
export function getSongLyric(id) {
  return zhRequest.get('lyric', {
    id
  })
}


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

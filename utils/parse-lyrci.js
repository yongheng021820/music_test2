// 正则（regular）表达式（expression）：字符串匹配利器
// [00:58.65]
const timeRegExp = /\[(\d{2}):(\d{2})\.(\d{2,3})\]/

export function parserLyric(lyricString) {
  // if(typeof(lyricString) !== 'string'){
  //   lyricString = JSON.stringify(lyricString)
  // }
  const lyricStrings = lyricString.split('\n')
  const lyricInfos = []
  for(const lineString of lyricStrings){

    const timeResult = timeRegExp.exec(lineString)
    if(!timeResult) continue
    // 1/获取时间
    const minute = timeResult[1] * 60 * 1000
    const second = timeResult[2] * 1000
    const millsecondTime = timeResult[3]
    const millsecond = millsecondTime.length === 2 ? millsecondTime * 10:millsecondTime * 1
    const time = minute + second + millsecond

    // 2/获取歌词文
    const text = lineString.replace(timeRegExp, '')
    lyricInfos.push({time, text})
  }

  return lyricInfos
}
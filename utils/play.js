// const audioContext = wx.createInnerAudioContext()
const audioContext = wx.getBackgroundAudioManager() //支持后台播放

export {
  audioContext
}




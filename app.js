// app.js
App({
  globalData:{
    screenWith: 0,
    screenHeight:0,
    devicerRadio:0
  },
  onLaunch() {
    // 获取设备信息
    const info = wx.getSystemInfoSync()
    // console.log(info.statusBarHeight)
    this.globalData.screenWith = info.screenWidth
    this.globalData.screenHeight = info.screenHeight
    this.globalData.statusBarHeight = info.statusBarHeight
    const devicerRadio = info.screenHeight / info.screenWidth
    this.globalData.devicerRadio = devicerRadio
    // console.log(devicerRadio)
    // console.log( this.globalData.statusBarHeight)
    // console.log(this.globalData)
    // 其他js文件使用的时候
    /*const app = getApp()
    data:{
      screenWith: app.globalData.screenWidth
    }*/

    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
  },
  globalData: {
    userInfo: null,
    statusBarHeight:0
  }
})

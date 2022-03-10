// components/song-menu-area/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    hotSongsMenu:{
      type:Array,
      value:[]
    },
    title:{
      type:String,
      value:"默认歌单"
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    iid:''
  },

  /**
   * 组件的方法列表
   */
  methods: {
    click_hot_more(){
      console.log("111111")
    },
    handMenuItemClick(event){
      // console.log(event)
      // console.log(event.currentTarget.dataset.item.id)
      const iid = event.currentTarget.dataset.item.id
      this.setData({iid})
      wx.navigateTo({
        url: `/pages/detail-songs3/index?id=${iid}`
        // url:'/pages/detail-songs3/index'
      })
    }
  }
})

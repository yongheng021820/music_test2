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

  },

  /**
   * 组件的方法列表
   */
  methods: {
    click_hot_more(){
      console.log("111111")
    }
  }
})

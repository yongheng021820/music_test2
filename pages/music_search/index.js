// pages/music_search/index.js
import {
  getSearchHot,
  getSearchSuggest,
  getSearchResult
} from "../service/api_music"

Page({

  /** 页面的初始数据*/
  data: {
    hostsKey: [],
    suggestSongs:[],
    searchValue:"",
    searchResult:[]
  },

  /**生命周期函数--监听页面加载*/
  onLoad: function (options) {
    getSearchHot().then(res => {
      console.log(res.data.result.hots)
      this.setData({
        hostsKey: res.data.result.hots
      })
    }).catch(err => {
      console.log(err)
    })

  },
  // 事件处理，获取搜索内容
  handleSearch(event) {
    const searchValue = event.detail
    this.setData({searchValue})
    if (!this.data.searchValue.length) {
      this.setData({suggestSongs: []})
    }
    getSearchSuggest(searchValue).then(res => {
      // 1.获取建议的关键字歌曲
      const suggestSongs = res.data.result.allMatch
      this.setData({suggestSongs})
      // 2、转成nodes节点
      // const suggestKeywords = suggestSongs.map(item => item.keyworld)
      // const suggestSongsNondes = []
      // for(const keyword of suggestKeywords) {
      //   const nodes = stringToNodes(keyword, searchValue)
      //   suggestSongsNondes.push(nodes)}
      //   this.setData({suggestSongsNondes})
      //   if(keyword.startWitch(searchValue)){
      //     const key1 = keyword.slice(0, searchValue.length)
          // const 
    }).catch(err => {
      console.log(err)
    })

  },
  // 处理搜索内容 
  handleSearchAction(){
    const searchValue = this.data.searchValue
    // this.setData({searchValue})
    // console.log(searchValue)
    getSearchResult(searchValue).then(
      res =>{
        // console.log(res.data.result.songs)
        this.setData({searchResult: res.data.result.songs})
      }
    ).catch(
      err =>{
        console.log(err)
      }
    )
  },
  click_item(event){
    console.log(event.currentTarget.dataset.item.keyword)
    const keyword = event.currentTarget.dataset.item.keyword
    this.setData({searchValue: ''})
    this.setData({searchValue: keyword})

    getSearchResult(keyword).then(
      res =>{
        // console.log(res.data.result.songs)
        this.setData({searchResult: res.data.result.songs})
      }
    ).catch(err => console.log(err))
  }
})


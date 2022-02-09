export default function (selector) {
  return new Promise((resolve) => {
    const query = wx.createSelectorQuery()
    query.select(selector).boundingClientRect()
    // query.selectViewport().scrollOffset()
    query.exec(res => {
      /*
      res[0].top // #the-id节点的上边界坐标
      res[1].scrollTop // 显示区域的竖直滚动位置
      */
      // console.log(res[0])
      
      resolve(res)
    })
  })
}
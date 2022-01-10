const BASE_URL = "http://123.207.32.32:9001/"

class ZHrequest {
  request(url, method, params){
    return new Promise((resolve, reject) =>{
      wx.request({
        url: BASE_URL + url,
        method: method,
        data: params,
        success(res){
          resolve(res)
        },
        fail(err){
          reject(err)
        }
      })
      
    })
  }
  get(url, params){
    return this.request(url, "GET", params)
  }
  post(url, data){
    return this.request(url, "POST", data)
  }
}

const zhRequest = new ZHrequest()

// zhRequest.request("/top/mv", "GET", {
//   offset: 0, limit:10
// }).then(res =>{}).catch(err =>{})


export default zhRequest
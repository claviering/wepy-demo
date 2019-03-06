import wepy from 'wepy'
import config from '@/config/index.js'
module.exports = {
  post: (url, param, cb) => {
    let params = {
      url: config.APIURL + url,
      method: 'POST',
      data: param,
      success(res) {
         cb(res)
      }
    }
    wepy.request(params)
  },
  get: (url, param, cb) => {
    let params = {
      url: config.APIURL + url,
      method: 'GET',
      data: param,
      success(res) {
         cb(res)
      }
    }
    wepy.request(params)
  }
}
const path = require('path')
const axios = require('axios')
const userModel = require('../models/user')
const infoModel = require('../models/info')
const debug = require('debug')('app:defaultCTRL')
const { wx } = require(path.resolve('./app/config'))
let WXBizDataCrypt = require(path.resolve('./app/utils/WXBizDataCrypt'))

module.exports = {
  getInfo : async (req, res) => {
    let info = await infoModel.find()
    res.send(info)
  },
  addInfo: async (req, res) => {
    let date = new Date()
    let createTime = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}`
    const {title, content, author, info, detail, gender, grade, money} = req.body
    const newInfo = new infoModel({
      title,
      content,
      author,
      info,
      createTime,
      detail,
      gender,
      grade,
      money
    })
    const addInfoRes = await newInfo.save()
    addInfoRes ? res.send({success: true, msg: '添加成功'}) : res.send({success: false, msg: '添加失败'})
  },
  default: (req, res) => {
    res.sendFile(path.resolve('./app/public/index.html'))
  },
  login: async (req, res) => {
    let code = req.body.code
    let openid = await module.exports.getOpenId(code)
    let findOpenid = await userModel.find({ openid })
    if (findOpenid) {
      res.send({ success: true, msg: '用户名已经注册' })
      return
    }
    res.send({success: false, msg: '先注册'})
  },
  getOpenId: async (code) => {
    try {
      let params = {
        secret: wx.secret,
        appid: wx.appid,
        js_code: code,
        grant_type: wx.grant_type
      }
      let result = await axios.get(wx.jscode2session, {params})
      saveOpenId = result.data.openid
      return result.data.openid
    } catch (err) {
      return false
    }
  },
  dec: (req, res) => { // 解密数据接口
    try {
      let pc = new WXBizDataCrypt(wx.appId, session_key)
      let data = pc.decryptData(req.body.encryptedData , req.body.iv)
      debug('解密后 data: ', data)
      res.send('drc done')
    } catch (err) {
      res.send(err)
    }
  },
  register: async (req, res) => { // 解密数据接口
    try {
      const { userName, gender, email, qq, country, code } = req.body
      let findUserName = await userModel.find({ userName })
      if (findUserName) {
        res.send({ success: false, msg: '用户名已经被注册' })
        return
      }
      let findEmail = await userModel.find({ email })
      if (findEmail) {
        res.send({ success: false, msg: '邮箱已经被注册' })
        return
      }
      let findQQ = await userModel.find({ qq })
      if (findQQ) {
        res.send({ success: false, msg: 'QQ已经被注册' })
        return
      }
      let openid = await module.exports.getOpenId(code)
      debug('openid', openid)
      if (!openid) {
        res.send({success: false, msg: '获取openid失败'})
        return
      }
      const newUser = new userModel({
        userName,
        gender,
        email,
        qq,
        country,
        openid
      })
      let user = await newUser.save()
      if (user) {
        res.send({success: true, msg: '注册成功'})
      } else {
        res.send({success: false, msg: '注册失败'})
      }
    } catch (err) {
      res.send({err})
    }
  }
};

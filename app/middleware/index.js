const path = require('path')
const logger = require('./log')
const mongo = require('./mongo')
const express = require('express')
const session = require('./session')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

module.exports = (app) => {
  // 静态资源
  app.use(express.static(path.resolve('./app/public')))
  // cookies 解析
  app.use(cookieParser())
  // body 解析
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }));
  // 连接 mongodb
  mongo()
  // session 中间件
  app.use(session)
  //记录日志
  app.use(logger)

};

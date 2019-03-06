const ip = require('ip')
const fs = require('fs')
const path = require('path');
const log4js = require('log4js')
const log = log4js.getLogger("weixin")
const config = require(path.resolve('./app/config/log4js.config.js'))
log4js.configure(config)

const baseInfo = {
  appLogLevel: 'debug',
  dir: 'logs',
  env: 'dev',
  projectName: 'demo',
  serverIp: ip.address()
}

// 创建日志目录
if (!fs.existsSync(path.resolve(baseInfo.dir))) {
  fs.mkdirSync(baseInfo.dir)
}

module.exports = async (req, res, next) => {
  const start = Date.now()
  // 日志输出信息
  const {protocol, method, originalUrl, hostname, ip, body,params } = req
  const client = {
    protocol,
    method,
    originalUrl,
    hostname,
    ip,
    body,
    params
  }
  await next()
  const responseTime = Date.now() - start;
  const logMessage = JSON.stringify(Object.assign(baseInfo, client, {
    responseTime: `${responseTime/1000}s`
  }))
  log.info(logMessage)
}
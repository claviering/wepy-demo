const ip = require('ip')
const path = require('path')
const app = require('express')()
const http = require('http').Server(app)
const io = require('socket.io')(http)
const debug = require('debug')('app')
const router = require(path.resolve('./app/router'))
const config = require(path.resolve('./app/config'))
const middleware = require(path.resolve('./app/middleware'))

middleware(app)
router(app)

io.on('connection', function(socket){
  console.log('client connection');
  socket.on('new message', function(msg){
    console.log('msg', msg)
    io.emit('new message', msg)
  })
});

http.listen(config.port, () => debug(`server working on http://127.0.0.1:${config.port} http://${ip.address()}:${config.port}`))
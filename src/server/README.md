# 请求方法

封装 POST GET 方法

demo

```js
import server from '@/server/index.js'
server.post('/login', {}, (res) => {
  console.log('post res', res)
})
server.get('/login', {data: 'data'}, (res) => {
  console.log('get res', res)
})
```

## post

`post: (url, param, cb)`

url: 请求地址

param: 请求参数

cb: 回调函数

## get

`post: (url, param, cb)`

url: 请求地址

param: 请求参数

cb: 回调函数
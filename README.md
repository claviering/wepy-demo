# 全栈小程序 demo

实现基本路由，状态管理，Websocket

## Nodejs

`nodejs >= 10`

## 目录

前端源代码 `src/`

Nodejs 后端源代码 `app/`

## 说明

input 标签获取输入内容

`bindinput="bindinput" blindcomfirm="blindcomfirm" bindblur="bindblur"`

## Nginx 配置

```
    # HTTPS server
    #
    server {
        listen 443 ssl http2;
        listen [::]:443 ssl http2;
        server_name     scnu.club;
        # 开启 HSTS 315360000 秒 = 10年
        add_header Strict-Transport-Security "max-age=315360000; includeSubDomains" always;
        # 证书
        ssl_certificate      path-to/wepy-demo/app/env/scnu.crt;
        # 私钥
        ssl_certificate_key      path-to/wepy-demo/app/env/scnu-without-passphrase.key;
        ssl_protocols        TLSv1 TLSv1.1 TLSv1.2;
        ssl_ciphers ALL:!ADH:!EXPORT56:RC4+RSA:+HIGH:+MEDIUM:+LOW:+SSLv2:+EXP;
        ssl_prefer_server_ciphers  on;
        access_log  logs/scnu.access.log;
        error_log   logs/scnu.error.log;
        error_page  404              /404.html;
        error_page  500 502 503 504  /50x.html;
        location / {
            proxy_http_version 1.1;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection "Upgrade";
            proxy_read_timeout 300s;
            proxy_connect_timeout 75s;
            proxy_pass http://127.0.0.1:8200;
        }
        location = /50x.html {
            root   html;
        }
    }
```
## 配置 hosts

`/etc/hosts `加入 `127.0.0.1 scnu.club`

## 小程序后台访问域名

配置小程序后台服务器域名, 添加域名:

[打开微信小程序后台](https://mp.weixin.qq.com)

开发 -> 开发设置 -> 服务器域名

## 小程序后台服务

基于 expressJs 框架

node v10

## 本地开发

npm run dev

## 微信小程序前端 UI 组件

weui-wxss [Github](https://github.com/Tencent/weui-wxss)

下载之后用微信开发者工具直接打开 dist 目录，要用什么组件直接复制粘贴

## 小程序Node后端服务器配置

查看 `app/env/README.md`

## 微信授权操作

小程序使用 `wx.login()` 获取 登录时获取的 `code`, 发送 `code` 到服务器, 服务器请求 微信后台 api 获取用户唯一标识 `openid` 和 `session_key`

## 会话密钥 session_key 有效性

开发者如果遇到因为 session_key 不正确而校验签名失败或解密失败，请关注下面几个与 session_key 有关的注意事项。

1. wx.login 调用时，用户的 session_key 可能会被更新而致使旧 session_key 失效（刷新机制存在最短周期，如果同一个用户短时间内多次调用 wx.login，并非每次调用都导致 session_key 刷新）。开发者应该在明确需要重新登录时才调用 wx.login，及时通过 code2Session 接口更新服务器存储的 session_key。
2. 微信不会把 session_key 的有效期告知开发者。我们会根据用户使用小程序的行为对 session_key 进行续期。用户越频繁使用小程序，session_key 有效期越长。
3. 开发者在 session_key 失效时，可以通过重新执行登录流程获取有效的 session_key。使用接口 wx.checkSession可以校验 session_key 是否有效，从而避免小程序反复执行登录流程。
4. 当开发者在实现自定义登录态时，可以考虑以 session_key 有效期作为自身登录态有效期，也可以实现自定义的时效性策略。

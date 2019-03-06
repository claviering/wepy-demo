# 配置小程序后台服务

## 使用现有根证书和域名证书

根证书 root.crt 

域名证书 scnu.crt 

有密码加密的域名私钥 scnu.key

解密后的域名私钥 scnu-without-passphrase.key

## 重新生成根证书和颁发域名证书
./gen.sh

电脑导入根证书，需要重启电脑，使证书生效
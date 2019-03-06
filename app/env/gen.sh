#! /bin/sh
echo 'make sure scnu.conf  file exist'
echo 'openssl version ...'
echo 'step 0: create root private key ...'
echo 'step 1: create root certificate ...'
echo 'step 2: create server private key ...'
echo 'step 3: create server csr ...'
echo 'step 4: 用根证书颁发证书'

openssl version -a | echo
openssl ecparam -name secp384r1 -genkey -out root.key
openssl req -x509 -new -config root.conf -key root.key -sha384 -days 3650 -out root.crt
openssl ecparam -genkey -name secp384r1 -out server.key
openssl req -new -config server.conf -key server.key -out server.csr -sha384
openssl x509 -req -in server.csr -CA root.crt -CAkey root.key -CAcreateserial -out server.crt -days 3650 -sha384 -extfile v3.ext

echo 'done ...'
1. 解决内容被窃听(数据加解密)
2. 解决内容被篡改(数字签名)
3. 解决身份遭伪装(数字证书)
### https和http的区别
1. https需要证书
2. http是超文本传输协议，是明文传输，https则是具有安全性的ssl加密传输协议
3. http和https使用的端口不同，前者是80，后者是443
4. http的连接很简单，无状态；https是由SSL+HTTP构建的可进行加密传输、身份认证的网络协议，比http协议安全；
5. https在HTTP+TCP加一个中间层.



### 传输过程（非对称加密的握手过程）
1. 在服务器端存在一个公钥及私钥，服务端将自己证书（包含公钥）、对称加密算法种类及其他信息返回给客户端
2. 浏览器检查ca证书是否可信赖，确认证书有效和此证书是此网站的。
3. 如果是，客户端使用伪随机函数生成一个secret，公钥对产生的secret的加密（非对称加密），发送给服务端
4. 服务端使用密钥解密secret，使用secret对数据进行对称加密传给客户端。
5. 客户端根据本地存储的secret进行解密
6. 对密钥进行非对称加密，对数据传输进行对称加密。


### 签名过程(数字签名的原理)
1. CA机构拥有证书非对称加密的私钥和公钥
2. CA对证书明文信息进行hash函数处理生成信息摘要
3. 对信息摘要的值用私钥加密,得到数字签名
4. 之后将明文信息和数字签名组合而成的证书发给服务器

### 如何验证内容是否被篡改
1. 拿到证书里面明文信息用hash函数处理,得到A
2. 用浏览器存的CA公钥解密数字签名得到B
3. 比较A,B,如果相等,说明没有篡改,否则浏览器提示证书不可信.

### 如何验证ca证书的合法性
其实证书是公开的，中间人可以获取到证书，但是无法获取到私钥，获取不到私钥就无法对随机数解密。
1. 浏览器验证域名、有效期等信息是否正确。
2. 判断证书来源是否合法。
3. 判断证书是否被篡改
4. 判断证书是否已吊销

### 本地随机数被窃取怎么办
https并不对随机数进行安全保证，随机数保存在本地，应对的措施有安装杀毒软件、反木马、升级修复漏洞等。






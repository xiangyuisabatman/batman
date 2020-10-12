### 是什么
内容安全策略(CSP)是一个额外的安全层，用于检测并削弱某些特定类型的攻击，包括跨站脚本(XSS)和数据注入攻击等

### 如何进行防御
- CSP通过指定有效域——即浏览器认可的可执行脚本的有效来源——使服务器管理者有能力减少或消除XSS攻击所依赖的载体。
- 可指明哪种协议允许使用;比如 (从理想化的安全角度来说)，服务器可指定所有内容必须通过HTTPS加载。一个完整的数据安全传输策略不仅强制使用HTTPS进行数据传输，也为所有的cookie标记安全标识 cookies with the secure flag，并且提供自动的重定向使得HTTP页面导向HTTPS版本。网站也可以使用`Strict-Transport-Security`HTTP头部确保连接它的浏览器只使用加密通道。

### 如何使用
- `Content-Security-Policy: default-src 'self'; img-src *; media-src media1.com media2.com; script-src userscripts.example.com`

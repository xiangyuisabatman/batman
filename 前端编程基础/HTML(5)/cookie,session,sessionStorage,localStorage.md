### cookie
1. 大小限制在4kb左右
2. 一般在服务端生成，可设置失效时间
3. 每次会携带到请求头中
4. 参数
    1. httponly：不要在除http/https之外的方式请求cookie如JavaScript，document.cookie
    2. secure：仅在加密传输，指示浏览器仅仅在通过安全/加密连接才能使用该cookie。
    3. sameSite：Strict-完全禁止第三方Cookie，跨域不携带；Lax-大部分情况下不发送第三方Cookie，但是在导航到目标网址的Get请求除外；None-默认值，自动携带cookie。

### session
1. session是保存在服务端，可以保存集群、数据库、文件中。

### sessionStorage、localStorage
1. 存储大小均为5m左右
2. 都有同源策略限制
3. 仅在客户端中保存，不参与服务端的通信
4. localStorage存储是永久性的，除非用户主动删除；sessionStorage是会话级的，关闭窗口则sessionStorage清空。
5. localStorage可以同源共享；sessionStorage只在同一浏览器，同一窗口下同源共享。

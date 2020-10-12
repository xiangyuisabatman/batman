1. 原理: 由Header,Payload,Signature三部分拼接组成
    - Header:alg 属性表示签名的算法（algorithm），默认是 HMAC SHA256（写成 HS256）；typ 属性表示这个令牌（token）的类型（type），JWT 令牌统一写为 JWT.最后将上面的 JSON 对象使用 Base64URL 算法转成字符串。
    - Payload：包括过期时间没生效时间，签发时间，签发人等等。
    - Signature：对前两部分的签名，防止数据篡改。
2. 校验原理：当服务器收到客户端的token后，解析前两部分得到header以及payload，并使用header中的算法与服务端本地私有secret进行签名，判断与jwt中携带的签名是否一致。
3. 与Session对比
    - Session：是一种记录服务器和客户端会话状态的机制，需要在数据库或者Redis中保存用户信息和token信息，所以它是有状态的。
    - Jwt无需存储数据，直接通过私有密钥验证。
4. 缺点
    - 更多的空间占用。如果将原存在服务端session中的信息都放在JWT中保存，会造成JWT占用的空间变大，需要考虑客户端cookie的空间限制等因素，如果放在Local Storage，则可能会受到XSS攻击。
    - 无法作废已颁布的令牌。
    - 用户信息安全。通过J WT 的组成结构可以看出，Payload 存储的一些用户信息，它是通过Base64加密的，可以直接解密，不能将秘密数据写入 JWT，如果使用需要对 JWT 进行二次加密。

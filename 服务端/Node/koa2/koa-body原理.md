## 相关请求时间
- data事件：当request接收到数据的时候触发，在数据传输结束前可能会触发多次，在事件回调里可以接受到buffer类型的数据参数，我们可以将buffer数据对象收集到数组中。
- end时间：当请求数据接收结束时候触发，不提供参数，可以在这里将之前手机到buffer数组集中处理，最后输出将request.body输出。

## 数据处理流程
1. 在request的data事件触发时候，收集buffer对象，将其放到一个命名为chunks的数组中。
2. 在request的end事件触发时，通过buffer.concat(chunks)将buffer数据整合成一个大的buffer对象
3. 解析请求首部的content-encoding，根据类型，如gzip、defalte，调用相应的解压缩函数，将2中获取到的buffer数据解压，返回解压后的buffer对象
4. 解析请求的charset字符编码，根据其类型，如utf-8，调用iconv库提供的decode(buffer, charset)方法，将3中的buffer解析成字符串。
5. 最后，根据content-type，对4中得到的字符串做相应的解析处理，得到最后的对象，作为request.body返回。
- 如果两个属性都不存在,脚本将被同步下载和执行,并将停止对文档的解析,知道它完成执行(默认行为).脚本按遇到的顺序下载和执行.
- deferred(延迟)属性在文档仍在解析时下载脚本,但在执行之前等待文档完成解析,这相当于在DOMContentLoaded事件侦听器中执行.延迟脚本将按顺序执行.
- async(异步)属性在解析文档期间下载脚本,但是在解析完成之前会暂停解析器来执行脚本.异步脚本不一定按顺序执行.
- 如果脚本相互依赖,则使用deferred
- 如果脚本是独立的,则使用async
- 如果DOM必须准备好,且内容没有防止在DOMContentLoaded侦听器中,则使用deferred
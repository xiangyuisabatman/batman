1. 从属关系区别: @import是css提供的语法规则,只有导入样式表的功能;link是html提供的标签,不仅可以记载css文件,还可以定义rss\rel连接属性等.
2. 加载顺序区别: @import引入的css将在页面加载完毕后被加载;加载页面时,link标签引入的css被同时加载
3. 兼容性区别: @import ie5+;link没有兼容性问题.
4. DOM可控区别: @import不可以通过DOM操作;link可以通过DOM创建标签改变样式
5. 权重区别:@import引入的样式会被link样式覆盖;
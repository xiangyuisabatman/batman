- a.js有一个`import x from './b.js`
- b.js有一个`import x from './a.js`


1. 在installedModules对象上设置b.js的key,加载b.js并执行
2. 遇到import a.js
3. 在installedModules对象上设置a.js的key,加载a.js并执行
4. 遇到import b.js
5. 检查,发现installedModules上已经存在index.js,直接读对象上缓存的exports(其实这里可能只在exports声明了属性名，并没有赋值)
6. 执行exports上的_console函数(如果属性还没有被赋值就会出错)
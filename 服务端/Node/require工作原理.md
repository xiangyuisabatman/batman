1. require主要使用的是Node核心模块：module.js
2. 在module.js中包含了文件的加载、编译，并且可以缓存所有使用过的文件。


## module.js两个主要作用
1. 它为所有的Node.js模块提供了一个函数用于编译。每一个文件在这个基础模块中运行后都会返回一个新的实例，即使这个文件运行了也还是会存在。这就是我们可以随时使用module.exports并且可以返回它。
2. 管理Node模块加载机制。这个独立的require函数其实是module.require的一个引用，而module.require只是一个Module._load简单包裹了一下。这个函数才是真正控制文件的加载。

## Module._load
```
Module._load = function(request, parent, isMain) {
    // 1. 检查Module.cache是否有缓存
    // 2. 如果没有缓存则创建一个新的模块实例
    // 3. 将模块实例保存到缓存中
    // 4. 通给给予的filename去调用module.load()，然后调用module.compile()去读取内容
    // 5. 如果文件的载入和解析过程中发生错误，则删除缓存中的该模块
    // 6. 返回module.exports
}
```

## Module._compile
```
Module.prototype._compile = function(content, filename) {
    // 1. 创建一个独立的require函数，该函数可以调用module.require
    // 2. 给require加上其他帮助性的函数
    // 3. 将代码包裹在一个函数中，并提供了require, module等变量在模块作用域中
    // 4. 运行这个函数
}
```

## 例子
```
let name = require('./a.js')
console.log(name)
```
1. 将`./a.js`转化成绝对路径，并且补充后缀名
2. 根据绝对路径判断缓存中是否存在缓存的文件，如果存在则取缓存，不存在则继续
3. 创建`Module`实例`module`，将绝对路径传入
4. 取得绝对路径的后缀名，根据后缀名调用对应的处理函数
5. 读js和json文件通过fs.readFileSync()读取文件内容
6. 对读到的js文件内容外层包裹一个函数，并且将字符串转成函数执行
7. 对读到的json文件内容，转为对象，并且赋值给module.exports



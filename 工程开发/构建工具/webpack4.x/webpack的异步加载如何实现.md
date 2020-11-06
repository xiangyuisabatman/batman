1. 生成一个入口文件index.bundle.js，异步加载的模块会打包生成*.bundle.js。
2. 入口文件最开始通过`__webpack_require__((__webpack_require__.s = "./src/a.js"))`加载入口的 js
3. 异步加载的代码，会保存在一个全局的webpackJsonp中
    - webpackJsonppush 的的值，两个参数分别为
        - 异步加载的文件中存放的需要安装的模块对应的 Chunk ID
        - 异步加载的文件中存放的需要安装的模块列表
4. 通过动态创建script, 根据publickpath 和chunk id来动态加载异步模块。
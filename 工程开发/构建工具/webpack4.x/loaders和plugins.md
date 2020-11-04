## 什么是loader
loader是文件加载器，能够加载资源文件，并对这些文件进行一些处理，诸如编译、压缩等，最终一起打包到指定的文件中。
1. 处理一个文件可以使用多个loader，loader的执行顺序和配置中的顺序是相反的，即最后一个loader最先执行，第一个loader最后执行
2. 第一个执行的loader接收源文件内容作为参数，其他loader接收前一个执行的loader的返回值作为参数，最后执行的loader会返回此模块的JavaScript源码

## 什么是plugin
在webpack运行的生命周期中会广播出许多事件，plugin可以监听这些事件，在合适的时机通过webpack提供的API改变输出结果

plugin是一个扩展器，它丰富了webpack本身，针对是loader结束后，webpack打包的整个过程，它并不直接操作文件，而是基于事件机制工作，会监听webpack打包过程中的某些节点，执行广泛的任务。

例如：
1. 使用uglify-webpack-plugin进行js、css文件压缩
2. 使用clean-webpack-plugin进行删除dist文件夹
3. babel-polyfill兼容高版本es
4. html-webpack-plugin生成html

## 编写plugin
1. 创建一个JavaScript命名函数
2. 在插件函数的prototype上定义一个apply方法
3. 指定一个绑定到webapck自身的事件钩子
4. 处理webpack内部实例的特定数据
5. 功能完成后调用webpack提供的回调
```
// 一个 JavaScript 命名函数。
function MyExampleWebpackPlugin() {

};

// 在插件函数的 prototype 上定义一个 `apply` 方法。
MyExampleWebpackPlugin.prototype.apply = function(compiler) {
  // 指定一个挂载到 webpack 自身的事件钩子。
  compiler.plugin('webpacksEventHook', function(compilation /* 处理 webpack 内部实例的特定数据。*/, callback) {
    console.log("This is an example plugin!!!");

    // 功能完成后调用 webpack 提供的回调。
    callback();
  });
};
```

### plugin compiler钩子
1. entryOption：在entry配置项处理过之后，执行插件
2. afterPlugins：设置完初始化插件之后，执行插件
3. afterResolvers：resolver安装完成之后，执行插件
4. environment准备好之后，执行插件
5. afterEnvironment：environment安装完成之后，执行插件
6. beforeRun：`compiler.run()`执行之前，添加一个钩子
7. run：开始读取 records 之前，钩入(hook into) compiler。
8. watchRun：监听模式下，一个新的编译(compilation)触发之后，执行一个插件，但是是在实际编译开始之前。
11. beforeCompile：编译(compilation)参数创建之后，执行插件。
12. compile：一个新的编译(compilation)创建之后，钩入(hook into) compiler。
13. thisCompilation：触发 compilation 事件之前执行（查看下面的 compilation）。
14. compilation： 编译(compilation)创建之后，执行插件。
15. emit：生成资源到 output 目录之前。
16. afterEmit：生成资源到 output 目录之后。
17. done： 编译(compilation)完成。
18. failed：编译(compilation)失败。
19. invalid：监听模式下，编译无效时。
20. watchClose：监听模式停止。


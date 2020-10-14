AMD 即Asynchronous Module Definition，中文名是异步模块定义的意思。它是一个在浏览器端模块化开发的规范
```
//a.js
//define可以传入三个参数，分别是字符串-模块名、数组-依赖模块、函数-回调函数
define(function(){
    return 1;
})

// b.js
//数组中声明需要加载的模块，可以是模块名、js文件路径
require(['a'], function(a){
    console.log(a);// 1
});
// 对于依赖的模块，AMD推崇依赖前置，提前执行。也就是说，在define方法里传入的依赖模块(数组)，会在一开始就下载并执行
```
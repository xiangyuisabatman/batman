- macro-task(宏任务)(由宿主发起)：包括整体代码script，setTimeout,setInterval,I/O、UI 交互事件、postMessage、MessageChannel、setImmediate(Node.js 环境)
- micro-task(微任务)(JavaScript发起)：promise, process.nextTick
![image](https://user-gold-cdn.xitu.io/2017/11/21/15fdcea13361a1ec?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

- 步骤
    1. 从宏任务头部取出一个任务执行
    2. 执行任务中若遇到微任务则将其添加到微任务队列中
    3. 宏任务执行完毕,微任务队列是否存在任务,若存在,则挨个儿出去执行,直到执行结束
    4. GUI渲染
    5. 回到步骤1,直到宏任务执行完毕.
- 例子
```
console.log(1);
setTimeout(function() {
    console.log(2);
}, 0);
new Promise(function(resolve) {
    console.log(3);
    resolve(Date.now());
}).then(function() {
    console.log(4);
});
console.log(5);
setTimeout(function() {
    new Promise(function(resolve) {
        console.log(6);
        resolve(Date.now());
    }).then(function() {
        console.log(7);
    });
}, 0);
// 1 3 5 4 2 6 7
```
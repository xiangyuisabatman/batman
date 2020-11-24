```
// 主进程
const childProcess = require('child_process');
const worker = childProcess.fork('./worker.js');

// 主进程向子进程发送消息
worker.send('Hello World');

// 监听子进程发送过来的消息
worker.on('message', (msg) => {
  console.log('Received message from worker:' + msg);
});



// 子进程 worker.js
// 接收主进程发来的消息
process.on('message', (msg) => {
  console.log('Received message from master:' + msg);
  // 子进程向主进程发送消息
  process.send('Hi master.');
});
```


## 多个进程监听同一个端口
监听某个端口，将tcp事件分别发送到各个子进程。多个子进程监听同一个端口会进行抢占式调度，只有一个worker进程会抢到链接然后进行服务。



## 问题
1. 为什么nextTick可以在dom更新之后执行。
vue数据更新是异步事件，data发生变化，会在update的时候，把watcher添加到queue中，然后通过nextTick放到微任务中进行更新。而nextTick也是添加到微任务中，就可以保证，至少nextTick回调的执行是在dom更新之后的。
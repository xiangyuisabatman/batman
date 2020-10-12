**Node.js有给每一个.js独立的上下文**
1. 先把你.js的源码通过`Module.wrap(conten)`包裹之后变成字符串
2. 然后通过vm.runInThisContext后变为可执行的函数
3. 最后通过compiledWrapper.call执行这个模块
- 为什么会产生全局变量污染: vm.runInThisContext使得包裹函数执行时无法影响本地作用域,但是global对象是可以访问的.
- 如果避免全局作用域污染: `use strick`
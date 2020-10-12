1. let不存在变量提升
2. let暂时性死区,只要块级作用域内存在let命令,它所声明的变量就绑定在这个区域,不再受外部的影响
```
var tmp = 'ads'
function() {
    tmp = 'abc'
    let tmp
}
```
3. let不允许重复声明
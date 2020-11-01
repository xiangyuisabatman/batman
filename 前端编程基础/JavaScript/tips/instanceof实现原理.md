```
// 例如判断 x instanceof y

while (x.__proto__ !== null) {
    if(x.__proto__ === y.prototype) {
        return true
    }
    x.__proto__ = x.__proto__.__proto__
}

// x会一直沿着隐式原型链__proto__向上查找直到找===y.prototype,找到返回true,也就是x为y的一个实例,否则返回false
```
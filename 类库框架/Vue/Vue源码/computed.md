## 计算属性原理
```
computed: {
    b() {
        return this.a
    }
}
```

### 响应式步骤
1. 首先会对computed对象遍历，拿到计算属性的每一个userDef(b)。
2. 尝试取userDef(b)的getter函数，拿不到报错。
3. 对每一个getter创建一个watcher。创建watcher的时候，lazy参数为true，先不通过watcher下的get函数获取值。
4. 判断key(b)是否已经被data或prop占用，没有进行defineComputed处理，有则警告。
5. 在defineComputed中对每一个key(b)使用Object.defineProperty进行getter、setter设置。
6. getter对应的是createComputedGetter，此函数会返回一个computedGetter函数，对应计算属性的getter。
7. 根据watcher.dirty参数决定是否进行watcher.evaluate计算。
8. watcher.evaluate里会执行watcher.get，在这里会把当前watcher通过pushTarget赋值到Dep.target上，此时Dep.target就是computed属性的watcher实例。
9. 执行this.getter，这时候就会执行b的getter方法，也就是获取this.a的值，就会触发this.a下的get。
10. this.a里的get就执行dep.depend，dep.depend执行Dep.target.addDep，就把a的dep添加到了b的watchers实例中，并将b的watcher实例添加到了a的subs中。
11. 最后watcher出栈，重置Dep.target。
12. 获取到value，返回value值。

### 问题
1. 怎么知道应该会哪些值进行依赖收集
对computed遍历，对每一个属性值创建watcher

2. computed下的属性值，怎么知道依赖于哪些值
将watcher复制给Dep.target，然后this.getter执行函数，然后把触发的依赖get，把watcher添加的dep.subs里，把dep添加到watchers的deps里。

3. computed的缓存是怎么处理
通过watcher.dirty，在当前computed属性get触发的时候，判断当前watcher.dirty是否为true，为true说明ditry有变化，需要重新计算，为false直接返回watcher.value
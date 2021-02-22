#### 为什么不要在选项属性或回调上使用箭头函数
因为箭头函数并没有this，this会作为变量一直向上级词法作用域查找，直至找到为止。

---

#### 计算属性和侦听器
侦听器适用于数据变化时执行异步或开销较大的操作

---

#### v-if与v-for一起使用
不推荐同时使用，当一起使用时，v-for具有比v-if更高的优先级

---

#### vue不能检测到的数组变化
1. 利用索引直接设置一个数组项时（set）
2. 当修改数组长度时（splice）

---

#### is="todo-item"
在使用DOM模板时是十分必要的，这样做实现的效果与`<todo-item>`相同，但是可以避开一些潜在的浏览器解析错误。

---

#### passive、prevent
不要把.passive和.prevent一起使用，因为.prevent将会被忽略，同时浏览器可能会向你展示一个警告。.passive会告诉浏览器你不想阻止事件的默认行为。`.passive`修饰符尤其能够提升移动端的性能，滚动行为将会立即触发，而不会等待onScroll完成

---

#### vue实例为什么不能直接挂载到html或body
vue实例在初始化的时候,会覆盖所选节点.覆盖html或body,文档结构会错误.

---

#### vue-router监听路由变化方式
- hash(window.addEventListener('hashchange', handle))
- history(window.addEventListener('popstate', handle))

--- 

### 组件中的data为什么是一个函数
1. 函数作用域的原因，每个组件的data数据都应该是相互隔离，互不影响。声明成函数返回，这样在每次创建组件实例都会创建一个私有的数据空间，让各个组件实例维护各自的数据。

### 父子组件生命周期
1. created 先父后子
2. mounted 先子后父
3. updated 先子后父
4. destroyed 先子后父

### v-model原理
1. 实际上是value+input事件的语法糖,通过v-bind进行绑定响应式数据
2. 然后通过oninput事件触发,在event中获取数据,赋值到当前变量.
3. 当变量修改时,会触发set方法,
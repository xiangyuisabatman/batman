#### new Vue发生了什么
- 合并配置
- 初始化生命周期
- 初始化事件中心
- 初始化渲染:render方法 createElement创建虚拟dom
- 初始化data\props\computed\watcher

---

#### 主线上把模板和数据如何渲染成最终的DOM
- new Vue
- $mount挂载vm
- render生成虚拟dom
- patch深度优先生成真实dom

---

#### 渲染组件的三个关键逻辑
- 构造子类构造函数: 通过createComponent
- 安装组件钩子函数
- 实例化vnode

---

#### 生命周期详细过程
![image](https://ustbhuangyi.github.io/vue-analysis/assets/lifecycle.png)

---

#### beforeCreate和create
- beforeCreate钩子不能获取到props\data\computed中定义的值,也不能调用methods中的方法
- 这两个钩子并没有渲染DOM
- 如果组件在加载时和后端有交互,可以放在这两个钩子,如果和data\props等数据,只能在create

---

#### beforeMount和mounted
- 在render函数渲染vnode之前,执行beforeMount,在把vnode patch到真实DOM之后,执行mounted
- mounted执行顺序 先子后父

---

#### beforeUpdate和updated
#### beforeDestroy和destroyed
#### activated和deactivated
#### 依赖收集和派发更新
- 依赖收集: 响应式对象getter,生成观察者watcher
- 派发更新: 当数据发生变化的时候,触发setter逻辑,把在依赖过程中订阅的所有观察者watcher,触发他们的update过程.

---

#### nextTick
1. 生成两个`microTimerFunc` `macroTimerFunc`函数,对于macro task的实现,优先检测是否支持原生的`setimmediate`,不支持再检测是否支持原生`MessageChannel`也不支持就会降级成`settimeout 0`;
2. 对于micro task,检测浏览器是否原生支持promise,不支持则指向macro task逻辑
3. 先将传入的函数放到`callbacks`里,根据情况执行`microTimerFunc` `macroTimerFunc`函数.
4. 最后执行flushCallbacks,遍历callbacks执行回调函数.
5. 使用 callbacks 而不是直接在 nextTick 中执行回调函数的原因是保证在同一个 tick 内多次执行 nextTick，不会开启多个异步任务，而把这些异步任务都压成一个同步任务，在下一个 tick 执行完毕.

---

#### Vue.use
- Vue.use方法接收一个plugin参数，然后使用installPlugins数组保存已经注册过的plugin
- 首先保证plugin不被重复注册，然后将vue从函数参数中取出，将整个vue作为plugin的install方法的第一个参数
- 接着判断是否存在install方法，存在则将赋值后的参数传入执行
- 最后将所有的存在install方法的plugin交给installPlugins维护

#### Vue.set
- 对于数组: 通过splice添加进数组返回
- 对于对象: 若已经存在,直接赋值返回.反之,则直接赋值并返回,并通过`defineReactive(ob.value, key, val)`把新添加的属性变为响应式对象,再手动触发依赖通知.

---

#### 子组件是如何拿到父组件props值的
在创建组件vnode的时候,会首先从data中提取propData,然后在new vnode的时候,作为第七个参数`VNodeComponentOptions`中的一个属性传入

---

#### props值改变触发子组件更新
其实子组件的重新渲染有 2 种情况，一个是 prop 值被修改，另一个是对象类型的 prop 内部属性的变化。

先来看一下 prop 值被修改的情况，当执行 props[key] = validateProp(key, propOptions, propsData, vm) 更新子组件 prop 的时候，会触发 prop 的 setter 过程，只要在渲染子组件的时候访问过这个 prop 值，那么根据响应式原理，就会触发子组件的重新渲染。

再来看一下当对象类型的 prop 的内部属性发生变化的时候，这个时候其实并没有触发子组件 prop 的更新。但是在子组件的渲染过程中，访问过这个对象 prop，所以这个对象 prop 在触发 getter 的时候会把子组件的 render watcher 收集到依赖中，然后当我们在父组件更新这个对象 prop 的某个属性的时候，会触发 setter 过程，也就会通知子组件 render watcher 的 update，进而触发子组件的重新渲染


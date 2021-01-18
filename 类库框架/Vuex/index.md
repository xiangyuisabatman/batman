## Vuex
Vuex是一个专为Vue服务，用于管理页面数据状态、提供统一数据操作的生态系统。再结合Vue的数据视图双向绑定特性来实现页面的展示更新。

## 核心框架流程
Vue组件接收交互行为，调用dispatch方法触发action相关处理，若页面状态需要改变，则调用commit方法提交mutation修改state，通过getters获取到state取值，重新渲染Vue Components，界面随之更新。

## Vuex store装载过程（store如何实现注入的）
1. 首先通过vue.use状态Vuex
2. 判断plugin是否已经安装，若没有安装则执行插件的install方法
3. 将初始化Vue根组件时传入的store设置到this对象的$store属性，子组件从其父组件引用store属性，层层嵌套进行设置。

## store对象构造（为什么actions、getters、mutations中能从arguments中拿到store的相关数据）
1. 环境判断：判断Vue是否挂载，是否支持promise
2. 初始化数据：new Vuex.Store(options)，初始化传入的一些指。


1. state内部支持模块配置和模块嵌套，如何实现的？

在store构造方法中有makeLocalContext方法，所有module都会有一个local context，根据配置时的path进行匹配。所以执行如dispatch这类action时，默认的拿到都是module的local state，如果要最外层或者其他module的state，只能从rootState按照path路径逐步进行访问。

2. 在执行dispatch触发action(commit同理)的时候，只需传入(type, payload)，action执行函数中第一个参数store从哪里获取的？

store初始化时，所有配置的action和mutation以及getters均被封装过。在执行如dispatch('submitOrder', payload)的时候，actions中type为submitOrder的所有处理方法都是被封装后的，其第一个参数为当前的store对象，所以能够获取到 { dispatch, commit, state, rootState } 等数据。

3. Vuex如何区分state是外部直接修改，还是通过mutation方法修改的？

Vuex中修改state的唯一渠道就是执行 commit('xx', payload) 方法，其底层通过执行 this._withCommit(fn) 设置_committing标志变量为true，然后才能修改state，修改完毕还需要还原_committing变量。外部修改虽然能够直接修改state，但是并没有修改_committing标志位，所以只要watch一下state，state change时判断是否_committing值为true，即可判断修改的合法性。

4. 调试时的”时空穿梭”功能是如何实现的？

devtoolPlugin中提供了此功能。因为dev模式下所有的state change都会被记录下来，’时空穿梭’ 功能其实就是将当前的state替换为记录中某个时刻的state状态，利用 store.replaceState(targetState) 方法将执行this._vm.state = state 实现。

5. mutations，commit是怎么实现的

有一个registerMutations函数，是对store的mutation初始化，函数存在四个参数(store, type, handler, path=[])，store是store的实例，type是mutations的key，handler是相应的处理函数，path是当前模块路径。

首先通过type拿到对应的mutations对象数组，把一个mutation的包装函数push到这个数组中，在执行的时候会通过getNestedState方法得到当前模块的state，和payload一起作为回调函数的参数。

commit通过type值获取对应的mutation，若不存在则报错，否则遍历mutation对象数组，执行handler函数。
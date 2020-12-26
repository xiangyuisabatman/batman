## 依赖收集

### 数据监测
- 生成Observer类,方便对所有属性转换为getter/setter形式进行侦测.
- 通过Object.defineProperty()对对象下的参数进行数据监测

### 收集依赖
getter中可以知道谁获取这个值,就说明这个谁依赖于这个值,所以就把这个谁添加到这个数据的依赖数组中.

### 收集依赖到哪里
有一个依赖管理器Dep,在Dep有一个subs数组用来存放依赖.并且有几个实例方法用来添加,删除,通知等操作.

### 依赖的到底是谁
谁用到了数据,谁就是依赖,就为谁创建一个Watcher实例.在之后的数据变化时,不直接去通知依赖更新,而是通知依赖对应的Watcher实例,由Watcher实例去通知真正的视图.
- Watcher实例有一个get方法,这个方法的作用是,把当前实例赋值给全局唯一变量window.target,然后触发这个值的getter,getter中通过Dep.depend方法,这个方法中获取window.target添加到依赖数组中.


## 派发更新
setter中执行Dep.update通知Watcher类下update方法,Watcher类接收到通知后,会向外界发送通知.
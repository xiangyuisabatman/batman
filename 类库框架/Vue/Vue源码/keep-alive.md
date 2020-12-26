参数:include exclude max


1. 获取查找中的第一个组件节点,优先获取组件name,不存在则获取组件tag
2. 如果name不在include里面或者在exclude里面,则返回vnode
3. 取vnode.key,在cache里查找是否存在,如果已经存在则删除当前位置,push到cache中;如果没有找到,则推到cache中,如果大于max,则删除max第一个.
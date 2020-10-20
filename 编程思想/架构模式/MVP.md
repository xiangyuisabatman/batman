### 意思
MVP 模式将 Controller 改名为 Presenter（广播者），同时改变了通信方向。

### 各部分的通信方式：
![image](../../public/images/MVP.jpg)
1. 各部分之间的通信都是双向的。
2. View和Model不发生联系，都通过Presenter传递。
3. View非常薄，不部署任何业务逻辑，成为被动视图，即没有任何主动性，而Presenter非常厚，所有逻辑都部署在那里。


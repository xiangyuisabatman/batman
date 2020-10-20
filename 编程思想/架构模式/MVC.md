### 意思
软件可以分为三个部分：M（Model）模型，数据保存；V（View）视图，用户界面；C（Controller）控制器，业务逻辑。**单向通信**

### 各部分的通信方式：
![image](../../public/images/MVC1.jpg)
1. View传送指令到Controller
2. Controller完成业务逻辑后，要求Model改变状态
3. Model将新的数据发送到View，用户得到反馈

### 另一种方式
![image](../../public/images/MVC2.jpg)


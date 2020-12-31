严格模式下，函数的this值就是call和apply的第一个参数thisArg，非严格模式下，thisArg值被指定为 null 或 undefined 时this值会自动替换为指向全局对象，原始值则会被自动包装，也就是new Object()
- 默认绑定
```
    // 严格模式下undefined 非严格模式下window
    function test() {
        console.log(this)
    }
    arr.forEach(function(){console.log(this)})
    //非/严格模式下
    setTimeout(function(){
        console.log(this)
    })
```
- 隐式绑定(谁调用就指向谁)
```
    const obj = {
        name: 'joy',
        getName() {
            console.log(this) // obj
            console.log(this.name) // 'joy'
        }
    }
    obj.getName()
```
- 显式绑定(call, apply, bind)
```
    const obj1 = {
        name: 'joy',
        getName() {
            console.log(this)
            console.log(this.name)
        }
    }
    
    const obj2 = {
        name: 'sam'
    }
    
    obj1.getName.call(obj2) // obj2 sam
    obj1.getName.apply(obj2) // obj2 sam
    const fn = obj1.getName.bind(obj2)
    fn() // obj2 sam
```
- new绑定
```
    function Vehicle() {
        this.a = 2
        console.log(this)
    }
    new Vehicle()  // this指向Vehicle这个new出来的对象
```
- es6箭头函数(箭头函数this为父作用域的this, 声明时确定this指向, 前四种,调用时确认.)
```
    window.name = 'win';
    const obj = {
        name: 'joy',
        age: 12,
        getName: () => {
            console.log(this); //其父作用域this是window,所以就是window
            console.log(this.name); //win 
        },
        getAge: function () {
            //通过obj.getAge调用,这里面this是指向obj
            setTimeout(() => {
                //所以这里this也是指向obj 所以结果是12
                console.log(this.age); 
            });
        }
    };
    obj.getName();
    obj.getAge();
```


```
var obj = {a: 1, b: function() {console.log(this)}}

1. 作为对象调用时,obj.b() 指向obj
2. 作为函数调用, var b = obj.b;b() 指向全局window
3. 作为构造函数 var b = new Fun() this指向实例对象
4. 作为call与apply调用 


```
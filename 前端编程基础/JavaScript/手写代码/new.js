function _new() {
    let obj = new Object

    Constructor = [].shift().call(arguments) //取出外部传入的构造器

    // 将obj的原型指向构造函数 这样就可以访问到构造函数原型中的属性
    obj.__proto__ = Constructor.prototype

    // 使用apply改变构造函数的this指向obj 这样obj就可以访问到构造函数的属性
    Constructor.apply(obj, arguments)

    return obj

}
function _call(context) {
    context = context || window
    // 用this来获取调用call的函数
    context.fn = this

    let args = [...arguments].slice(1)

    let res = context.fn(...args)

    delete context.fn

    return res
}

function _apply(context) {
    context = context || window

    context.fn = this
    let res
    if (arguments[1]) {
        res = context.fn([arguments[1]])
    } else {
        res = context.fn()
    }

    delete context.fn
    return res
}

/**
 * bind方法会创建一个新函数,当这个新函数被调用时,第一个参数是它运行时的this,之后是传入的参数
 * 一个绑定函数,可以使用new操作符创建对象;这种行为就像把原函数当成构造器.提供的this被忽略,同事调用时的参数被提供给模拟函数.
 * @param {*} context 
 */
function _bind(context) {
    // 假如调用bind的不是函数
    if (typeof this !== "function") {
        throw new Error("Function.prototype.bind - what is trying to be bound is not callable");
    }
    let _this = this
    let bindArgs = [...arguments].slice(1)

    // 为什么声明一个空函数
    function fn() {}

    function fBind() {
        // 这个时候的arguments是函数返回时传入的参数
        let args = [].slice.call(arguments, 0).concat(bindArgs)
        // 当作为构造函数时,this指向实例,将绑定函数的this指向该实例,可以让实例获得来自绑定函数的值
        // 当作为普通函数时,this指向window,将绑定函数的this指向context
        return _this.apply(this instanceof fn ? this : context, args)
    }

    // 如果直接把返回函数的prototype改为this的prototype,那么我们修改fbind.prototype的时候,也会修改绑定函数的prototype
    // 所以通过一个空函数来中转
    fn.prototype = _this.prototype
    fBind.prototype = new fn()

    return fBind
}


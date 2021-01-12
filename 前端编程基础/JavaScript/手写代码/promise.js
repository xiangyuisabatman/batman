/**
 * @description: promise
 * 1. 创建三种状态枚举值,promise是一个类,初始化状态值,成功返回值,失败原因,成功函数,失败函数
 * 2. 实现then方法
 * 3. 实现then链式调用
 * 4. 值穿透  onFulfilled onRejected 设置默认值
 * 5. catch finally 方法
 * 6. 
 */
const ENUM = {
    PENDING: 'pending', // 等待状态
    FULFILLED: 'fulfilled', // 成功状态
    REJECTED: 'rejected' // 拒绝状态
}
class Promise {
    constructor(executor) {
        this.status = ENUM.PENDING // 默认状态
        this.value = undefined // 成功返回的值
        this.reason = undefined // 失败的原因
        this.onResolvedCallbacks = [] // 成功队列
        this.onRejectedCallbacks = [] // 失败队列

        const resolve = (value) => {
            if (this.status === ENUM.PENDING) {
                this.status = ENUM.FULFILLED
                this.value = value
                this.onResolvedCallbacks.forEach(cb => cb())
            }
        }

        const reject = (reason) => {
            if (this.status === ENUM.PENDING) {
                this.status = ENUM.REJECTED
                this.reason = reason
                this.onRejectedCallbacks.forEach(cb => cb())
            }
        }

        try {
            executor(resolve, reject)
        } catch (e) {
            reject(e)
        }
    }

    static resolve(value) {
        return new Promise((resolve, reject) => {
            resolve(value)
        })
    }

    static reject(reason) {
        return new Promise((resolve, reject) => {
            reject(reason)
        })
    }

    static all(arrList) {
        if (!Array.isArray(arrList)) {
            const type = typeof arrList
            return new TypeError(`TypeError:${type} ${arrList} is not iterable`)
        }
        return new Promise((resolve, reject) => {
            const backArr = []
            let count = 0
            const processResultByKey = (value, index) => {
                backArr[index] = value
                // 当执行数组最后一项时,index===arrlist.length-1表达式成立
                // 就会执行resolve
                // 但此时可能上一个还没执行完 所以使用计数器来判断
                if (++count === arrList.length) {
                    resolve(backArr)
                }
            }
            for(let i = 0; i < arrList.length; i++) {
                const item = arrList[i]
                if (item && typeof item.then === 'function') {
                    item.then((value) => {
                        processResultByKey(value, i)
                    }, reject)
                } else {
                    processResultByKey(item, i)
                }
            }
        })
    }

    static race(arrList) {
        return new Promise((resolve, reject) => {
            for (let i = 0; i < arrList.length; i++) {
                const value = arrList[i]
                if (value && typeof value.then === 'function') {
                    value.then(resolve, reject)
                } else {
                    resolve(value)
                }
            }
        })
    }

    then(onFulfilled, onRejected) {
        onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : v => v
        onRejected = typeof onRejected === 'function' ? onRejected : e => {throw e}
        // 链式调用  创建新的promise
        let promise2 = new Promise((resolve, reject) => {
            // 成功状态执行
            if (this.status === ENUM.FULFILLED) {
                setTimeout(() => {
                    try {
                        let x = onFulfilled(this.value)
                        resolvePromise(x, promise2, resolve, reject)
                    } catch (e) {
                        reject(e)
                    }
                }, 0);
            }
            if (this.status === ENUM.REJECTED) {
                let x = onRejected(this.reason) 
            }
    
            if (this.status === ENUM.PENDING) {
                this.onResolvedCallbacks.push(() => {
                    let x = onFulfilled(this.value)   
                })
                this.onRejectedCallbacks.push(() => {
                    let x = onRejected(this.reason)  
                })
            }
        })
        
        return promise2
    }
    
    catch (onErrorCallback) {
        return this.then(null, onErrorCallback)
    }

    finally (callback) {
        return this.then(value => {
            return Promise.resolve(callback()).then(() => value)
        }, err => {
            return Promise.resolve(callback()).then(() => {throw err})
        })
    }

    
}

const resolvePromise = (x, promise2, resolve, reject) => {
    // 判断x,promise2是否引用同一个对象
    if (x === promise2) {
        reject(new TypeError(`TypeError: Chaining cycle detected for promise #<Promise>`))
    }

    // 判断x是否为对象或者函数
    if ((typeof x === 'object' && x !== null) || typeof x === 'function') {
        // then的回调函数只能执行一次,要么成功,要么失败
        let called = false
        try { // 防止Object.defineProperties或Proxy改写x.then的返回值
            const then = x.then
            // 当存在then方法,说明then是一个promise, 执行then
            if (typeof then === 'function') {
                // 复用上次取出来的then方法,避免二次调用x.then()
                then.call(x, y => {
                    // y可能是个promise
                    // 如果已经执行过 直接返回
                    if (called) return

                    called = true
                    resolvePromise(y, promise2, resolve, reject)
                }, e => {
                    if (called) return
                    called = true
                    reject(e)
                })
            } else {
                // 不存在then方法
                resolve(x)
            }
        } catch (e) {
            // then执行过程出错
            if (called) return
            called = true
            reject(e)
        }
    } else {
        // 普通值  直接返回
        resolve(x)
    }
}

const abc = new Promise((resolve, reject) => {
    console.log(1)
    // resolve()
    reject()
})
abc.then(() => {
    console.log(3)
})
abc.catch(() => {
    console.log(4)
})
abc.finally(() => {
    console.log(5)
})

const a = new Promise((resolve, reject) => {
    console.log('a')
    setTimeout(() => {
        resolve('a')
    }, 500);
    
})

const b = new Promise((resolve, reject) => {
    console.log('b')
    setTimeout(() => {
        resolve('b')
    }, 300);
})

const c = new Promise((resolve, reject) => {
    console.log('c')
    // resolve('c')
    setTimeout(() => {
        resolve('c')
    }, 400);
})

// Promise.all([a, b, c]).then((data) => {
//     console.log(data)
// }).catch((data) => {
//     console.log(data)
// })

Promise.race([a, b, c]).then((data) => {
    console.log(data)
})


function asyncToGenerator(genFunc) {
    return function() {
        const gen = genFunc.apply(this, arguments)
        return new Promise((resolve, reject) => {
            
            function step(key, arg) {
                let genResult
                try {
                    genResult = gen[key](arg)
                } catch (error) {
                    return reject(error)
                }
                let {done, value} = genResult
                if (done) {
                    return resolve(value)
                } else {
                    return Promise.resolve(value).then(val => {
                        step('next', val)
                    }, (err) => {
                        step('throw', err)
                    })
                }
            }
            step('next')
        })
    }
}

let test1 = asyncToGenerator(test)

async function anv() {
    let a = await test1()
    console.log(a, 11)
}
anv()


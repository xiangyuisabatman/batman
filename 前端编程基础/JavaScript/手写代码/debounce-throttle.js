// 防抖 事件持续触发,当事件停止触发后一段时间执行
function debounce(callback, wait, immediate) {
    var timer, result;

    var debounced = function() {
        var context = this
        var args = arguments
        if (timer) {
            clearTimeout(timer)
        }
        if (immediate) {
            var callNow = !timer
            timer = setTimeout(() => {
                timer = null
            }, wait)
            if (callNow) {
                // 为什么只在immediate为true的时候有返回值
                // 因为为false的时候 使用setTimeout 返回值总是undefined
                result = callback.apply(context, args)
            }
        } else {
            timer = setTimeout(() => {
                // 为了使this可以正确指向
                callback.apply(context, args)
            }, wait);
        }
        return result
    }

    // 取消防抖功能
    debounced.cancel = function() {
        clearTimeout(timer)
        timer = null
    }

    return debounced
}

// 节流, 事假持续触发,每隔一段时间触发一次
// 使用时间戳
function throttle(callback, wait) {
    let preDate = 0, context, args;

    return function() {
        let now = new Date().valueOf()
        context = this
        args = arguments
        if (now - preDate > wait) {
            callback.apply(context, args)
            preDate = now
        }
    }
}

// 使用定时器
// options.leading false 首次不执行
// options.trailing false 停止不执行
function throttle(callback, wait, options) {
    var timer, context, result, args;
    var previous = 0;
    if (!options) {options = {}}

    var later = function() {
        previous = options.leading ? new Date().valueOf() : 0
        timer = null
        callback.apply(context, args)
        if (!timer) context = args = null
    }

    var throttled = function() {
        var now = new Date().valueOf()
        if (!previous && !options.leading) previous = now
        // 下次触发callback的剩余时间
        var remaining = wait - (now - previous)

        context = this
        args = arguments
        
        if (remaining < 0 || remaining > wait) {
            if (timer) {
                clearTimeout(timer)
                timer = null
            }
            previous = now
            callback.apply(context, args)
            if (!timer) context = args = null
        } else if (!timer && options.trailing) {
            timer = setTimeout(later, remaining)
        }
    }
    return throttled
}
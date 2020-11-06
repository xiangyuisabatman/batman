/**
 * 
 * 通常用 F(n) 表示，形成的序列称为斐波那契数列。该数列由 0 和 1 开始，后面的每一项数字都是前面两项数字的和
 * 
 * 示例1:
 * 
 * 输入: 2
 * 输出: 1
 * 解释: F(2) = F(1) + F(0) = 1 + 0 = 1
 * 
 * 示例2:
 * 
 * 输入: 4
 * 输出: 3
 * 解释: F(4) = F(3) + F(2) = 2 + 1 = 3
 */

// 暴力法
function fib1(n) {
    return n < 2 ? n : fib1(n - 1) + fib1(n - 2)
}

// 带备忘录的递归算法
const obj = {} // 备忘录
function fib2(n) {
    return n < 2 ? n : obj[n] ? obj[n] : obj[n] = fib2(n - 1) + fib2(n - 2)
}

// 空间状态压缩的动态规划
function fib3(n) {
    if (n === 2 || n ===1) {
        return 1
    }

    let pre = 1,
        cur = 1

    for(let i = 3; i <= n; i++) {
        let sum = pre + cur
        pre = cur
        cur = sum
    }

    return cur
}
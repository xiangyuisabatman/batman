const arr = [-2, 1, -3, 4, -1, 2, 1, -5, 4]
// 第一种(暴力法) 时间复杂度O(n*3)
function fn1(list) {
    let maxSum = 0
    console.time('fn1')
    for(let i = 0; i < list.length; i++) {
        // 从第i个开始循环
        for(let j = i; j < list.length; j++) {
            let thisSum = 0
            // 第i个开始循环累加到第j个
            for(let k = i; k < j; k++) {
                thisSum += list[k]
                if (thisSum > maxSum) {
                    maxSum = thisSum
                }
            }
        }
    }
    console.timeEnd('fn1')
    console.log(maxSum)
    return maxSum
}

// 第二种(暴力法) 时间复杂度O(n*2)
function fn2(list) {
    let maxSum = 0
    console.time('fn2')
    for(let i = 0; i < list.length; i++) {
        let thisSum = 0
        // 从第i个开始循环
        for(let j = i; j < list.length; j++) {
            thisSum += list[j]
            if (thisSum > maxSum) {
                maxSum = thisSum
            }
        }
    }
    console.timeEnd('fn2')
    console.log(maxSum)
    return maxSum
}
// 第三种(分治法)  时间复杂度O(nlogn)
// function fn3() {
    function Status(l, r, m, i) {
        this.lSum = l // [l,r]内以l为左端点的最大子段和
        this.rSum = r // [l,r]内以r为右端点的最大子段和
        this.mSum = m // [l,r]内的最大子段和
        this.iSum = i // [l,r]的区间和
    }

    const maxSubArray = (nums) => {
        console.time('fn3')
        const result = getInfo(nums, 0, nums.length - 1).mSum
        console.log(result)
        console.timeEnd('fn3')
    }

    const getInfo = (a, l, r) => {
        if (l === r) return new Status(a[l], a[l], a[l], a[l]) // 从单个数区间开始算
        const m = (l + r) >> 1 // 向下取平均值 (3,4) => 3 (0,8) => 4
        const lSub = getInfo(a, l, m) // 左区间
        const rSub = getInfo(a, m + 1, r) // 右区间
        return pushUp(lSub, rSub)
    }

    const pushUp = (l, r) => {
        const iSum = l.iSum + r.iSum // [l,r]的区间和
        const lSum = Math.max(l.lSum, l.iSum + r.lSum) // [l,r]内以l为左端点的最大子段和
        const rSum = Math.max(r.rSum, r.iSum + l.rSum) // [l,r]内以r为右端点的最大子段和
        const mSum = Math.max(Math.max(l.mSum, r.mSum), l.rSum + r.lSum) // [l,r]内的最大子段和
        return new Status(lSum, rSum, mSum, iSum)
    }
// }

// 第四种(动态规划)  时间复杂度O(n)
function fn4(list) {
    console.time('fn4')
    let maxSum = list[0], thisSum = 0

    // 从第一个数开始相加, 若大于最大值, 得赋值, 反之, 归0
    for(let i = 0; i < list.length; i++) {
        thisSum += list[i]
        if (thisSum > maxSum) {
            maxSum = thisSum
        }

        if (thisSum < 0) {
            thisSum = 0
        }
    }
    // console.log(maxSum)
    console.timeEnd('fn4')
}

fn1(arr)
fn2(arr)
maxSubArray(arr)
fn4(arr)
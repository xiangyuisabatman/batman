/**
 * 快速排序
 * 
 * 1. 找出一个基数,可以是数组的中间值也可以是任何一个位置的数
 * 2. 对小于基数的值放到左边
 * 3. 对大于基数的值放到右边
 * 4. 然后不断对左右两边进行2,3步
 * 
 * 时间复杂度  最坏O(n*2) 最好O(nlogn)
 */
function quicksort(arr, left, right) {
    if (arr.length < 2) { return arr }
    var left = left || 0,
        right = right || arr.length - 1,
        key = Math.floor(arr.length / 2)

    
    let leftArr =  [],
        rightArr = [],
        povit = arr.splice(key, 1)[0]

    arr.forEach(i => {
        i > povit ? rightArr.push(i) : leftArr.push(i)
    })

    return quicksort(leftArr).concat(povit, ...quicksort(rightArr))
}

let list = [2,3,1,5,4]
let arr = quicksort(list)
console.log(arr)
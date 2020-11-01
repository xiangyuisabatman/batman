/**
 * 归并排序,通过对未排序数组不断的二等分,直至分为两个一,然后进行比较合并
 * 例如 对[2,3,5,1,4]进行归并排序
 * 1. 先二等分为 [2,3] [5,1,4]
 * 2. 再将[2,3]二等分 [2], [3] 比较完 把2 push到新数组中, 之后再把3 push到新数组中 合并[2,3]
 * 3. 再将[5,1,4]二等分 [5] [1,4]
 * 4. 将[1,4]二等分[1],[4] 比较完 合并[1,4]
 * 5. 将 [5], [1,4]比较 
 * 6. 将5和1比较 先push 1 再拿5和4比较 push 4 再push 5合并为[1,4,5]
 * 7. 比较[2,3] [1,4,5]
 * 8. 2,1比较  push1; 2,4比较push2;3,4比较 push3;最后一次push4,5
 * 9 最后返回[1,2,3,4,5]
 * 
 * 时间复杂度 Ο(nlogn)
 */
function mergeSort(arr) {
    let len = arr.length
    if (len < 2) {
        return arr
    }

    // 不断的二等分
    let middle = Math.floor(len / 2),
        left = arr.slice(0, middle),
        right = arr.slice(middle)

    return merge(mergeSort(left), mergeSort(right))
}

function merge(left, right) {
    let result = []
    // 不断比较左右的第一个值 直到左右有一个长度为0
    while (left.length && right.length) {
        if (left[0] <= right[0]) {
            result.push(left.shift())
        } else {
            result.push(right.shift())
        }
    }

    while (left.length) {
        result.push(left.shift())
    }
    while (right.length) {
        result.push(right.shift())
    }
    return result
}
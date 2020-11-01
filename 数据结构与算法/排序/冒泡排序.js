/**
 * 冒泡排序交换(升序)
 * 假如3, 2需要交换两者顺序
 * 1. 先把3用一个变量temp存起来
 * 2. 让3等于2
 * 3. 让2等于变量temp
 * 
 * 如果要排序为降序
 * 只需将 < 改为 > 即可
 * 
 * 时间复杂度O(N*2)
 */
function bubbleSort(array) {
    let temp

    for(let i = 0, length = array.length; i < length; i++) {
        for (let j = 0, length = array.length; j < length; j++) {
            if (array[j] < array[j - 1]) {
                
                temp = array[j - 1]
                array[j - 1] = array[j]
                array[j] = temp
            }
        }
    }
    return array
}

let list = [2,3,1,5,4]

let arr = bubbleSort(list)
console.log(arr)
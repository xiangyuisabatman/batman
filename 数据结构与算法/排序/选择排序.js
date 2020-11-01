/**
 * 原理：每次从待排序的数组中取出最大（最小）的值，放入一个新数组的末尾，直到待排序的数组为空
 */
function selectionSort(array) {
    let list = []

    while(array.length) {
        let temp = array[0]
        let index = 0
        for(let i = 1; i < array.length; i++) {
            if (array[i] < temp) {
                temp = array[i]
                index = i
            }
        }
        array.splice(index, 1)
        list.push(temp)
    }
    return list
}

let list = [2,3,1,5,4]

let arr = selectionSort(list)
console.log(arr)
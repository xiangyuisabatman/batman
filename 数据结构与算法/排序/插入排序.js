/**
 * 插入排序
 * 默认取第一个值为排好序的值
 * 1. 取出下一个值,与前一个值做比较,若小于前一个值,前一个值向后移
 * 2. 再取前一个值,进行1.比较
 * 3. 重复1,2;
 * 
 * 时间复杂度  最好o(n) 最坏 o(n2)
 */
function insertionSort() {
    let array = this.array

    let preIndex, current

    for(let i = 1; i < array.length; i++) {
        preIndex = i - 1
        current = array[i]
        while(preIndex >= 0 && array[preIndex] > current) {
            array[preIndex + 1] = array[preIndex]
            preIndex--
        }
        array[preIndex + 1] = current
    }

    return array
}
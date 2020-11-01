/**
 * 希尔排序,使用增量对未排序数组进行分组
 * 对分组的进行插入排序
 * 慢慢减少增量,扩大分组内的数量,直至增量为1
 * 最后进行一次插入排序
 * 
 * 例 [5, 2, 8, 3, 4, 1]
 * 初始化增量gap = 6/2 = 3
 * 把数组分配三组,[5,3] [2,4] [8,1]
 * 对每组进行插入排序后, [3, 2, 1, 5, 4, 8]
 * 增量减少 gap = gap / 2 = 1
 * 然后对[3,2,1,5,4,8]进行插入排序
 * 得到[1,2,3,4,5,8]
 * 
 * 时间复杂度 最好n log(n)  最差 n (log(n))2
 */

function shellSort() {
    let array = this.array

    // 初始化增量, 将数组分组
    // 慢慢缩小增量, 扩大分组
    for (let gap = Math.floor(array.length / 2); gap > 0; gap = Math.floor(gap / 2)) {
        // 对每个分组进行插入排序
        for(let i = gap; i < array.length; i++) {
            let j = i
            let current = array[i]
            // j-gap 同组的数组
            // 如果当前值 比 前一个同组的值小 则交换
            while(j - gap >= 0 && current < array[j - gap]) {
                array[j] = array[j - gap]
                j = j - gap
            }
            array[j] = current
        }
    }

    return array
}
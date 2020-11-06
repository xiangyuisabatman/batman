const list = [10,9,2,5,3,7,101,18];

/**
 * 
 * @param {*} list 
 * 
 * 传入一个乱序数组,找出其中最长递增子序列的长度
 * 
 * 非连续递增子序列
 * 初始化一个与list同长度的数组, 填充每项为1, 用于记录通过i来分割出的[j, i]中递增子序列的值
 * 
 * list[i]为每个子集最后一项
 * 
 * 从j开始,与list[i]比较,小于list[i] 则将arr中记录的arr[i] 与 2比较  取大, 这里保证是不连续
 * 
 * 最后arr就变成 [j, i]每个区间的最长子序列数
 * 
 * 最后取出arr出的最大值,即为最长非连续递增子序列数
 */
function findLengthOfLCIS(list) {
    let arr = Array.from({length: list.length}, () => 1)

    for(let i = 0; i < list.length; i++) {
        for (let j = 0; j < i; j++) {
            if (list[i] > list[j]) {
                arr[i] = Math.max(arr[i], arr[j] + 1)
            }
        }
    }

    let res = 0

    for(let i = 0; i < arr.length; i++) {
        res = Math.max(res, arr[i])
    }

    return res
}

/**
 * 连续递增子序列
 * 
 * 声明一个ans为连续递增子序列数, anchor初始下标(连续递增子序列的头部)
 * 
 * i-anchor+1 为 连续子序列头尾长度
 * 
 * 如果前一个小于当前,则将ans与i-anchor+1比较,取大
 * 
 * 如果前一个大于当前,则将当前下标赋值给anchor, 则将ans与i-anchor+1比较,取大
 * 
 * 最后返回ans
 */

function findLengthOfLCIS(list) {
    let ans = 0,
        anchor = 0

    for (let i = 0; i < list.length; i++) {

        if (i > 0 && list[i-1] >= list[i]) {
            anchor = i
        }

        ans = Math.max(ans, i - anchor + 1)
        

        
    }
    return ans
}

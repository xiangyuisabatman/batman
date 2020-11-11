/**
 * 编辑问题
 * 将源字符串改为目标字符串 最少需要几步修改
 * @param {源字符串} s1 
 * @param {目标字符串} s2 
 */
const minDistance = function(s1, s2) {
    let m = s1.length;
    let n = s2.length;
    let dp = new Array(m + 1); // 生成一个长度为m+1(为什么是+1, 因为对第一列第一行, 要补充"")的一维数组
    // 初始化二维数组dp
    for(let k = 0; k < m + 1; k++) {
        dp[k] = new Array(n);
    }
    // 初始化二维数组第一列
    // 假设s2为空字符串,s2转换为s1的分别需要几步
    for(let i = 0; i < m + 1; i++ ) {
        dp[i][0] =  i;
    }
    // 初始化二维数组第一行
    // 假设s1为空字符串,s1转换为s2分别需要几步
    for(let j = 0; j < n + 1; j++ ) {
        dp[0][j] =  j;
    }
    for(let i = 1; i < m + 1; i++ ) {
        for(let j = 1; j < n + 1; j++ ) {
            // 如果两个字符相同,则不做操作,直接等于上一次所需的步数
            if(s1[i-1] === s2[j-1]) {
                dp[i][j] = dp[i-1][j-1]
            } else {
                dp[i][j] = 1 + Math.min(
                        dp[i-1][j-1], // 替换  假设将s1[i]替换成s2[j], 这样就匹配了,同时前移i,j
                        dp[i-1][j],  // 删除  假设将s1[i]直接删除,将i向前移一位, 继续跟j对比
                        dp[i][j-1] // 插入   假设将s1[i]插入一个s2[j]一样的字符,s2[j]就被匹配,则前移j,继续跟i对比
                    )
                    // 三个操作取最小值之后,操作数+1
            }
        }
    }
    return dp[m][n]
};
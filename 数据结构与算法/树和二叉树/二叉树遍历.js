/**
 * 递归遍历二叉树
 * 先序遍历: 根->左->右
 * 中序遍历: 左->根->右
 * 后序遍历: 左->右->根
 */


class LoopTree {
    constructor(node, left, right) {
        this.node = node // 根节点
        this.left = left // 左子树
        this.right = right // 右子树
    }

    // 创建二叉树
    // 第一种方法,在递归二叉树介绍第二种方法
    createTree() {
        let biTree = new LoopTree('A')
        biTree.left = new LoopTree('B')
        biTree.right = new LoopTree('C')
        biTree.left.left = new LoopTree('D')
        biTree.left.right = new LoopTree('E')
        biTree.right.left = new LoopTree('F')
        biTree.left.left.left = new LoopTree('G')
        biTree.left.left.right = new LoopTree('H')
        return biTree
    }

    // 先序遍历
    preOrderTraverse(biTree) {
        if (!biTree) return
        console.log(biTree.node)
        this.preOrderTraverse(biTree.left)
        this.preOrderTraverse(biTree.right)
    }

    // 中序遍历 
    inOrderTraverse(biTree) {
        if (!biTree) return
        this.inOrderTraverse(biTree.left)
        console.log(biTree.node)
        this.inOrderTraverse(biTree.right)
    }

    // 后序遍历 
    postOrderTraverse(biTree) {
        if (!biTree) return
        this.postOrderTraverse(biTree.left)
        this.postOrderTraverse(biTree.right)
        console.log(biTree.node)
    }
}

/**
 * 堆栈遍历二叉树
 * 
 * 模拟栈后进先出策略
 */
class StackTree {
    constructor(node) {
        this.node = node
        this.left = null
        this.right = null
    }

    // 创建树
    createTree(biTree) {
        if (strArr.length === 0) return // 如果没有结点,则返回
        let strArrShift = strArr.shift() // 取出第一个结点,并从数组中删除
        if (strArrShift === '#') return // 如果当前结点是#(空),则不用生成子结点,返回
        biTree.node = strArrShift // 将当前结点赋值
        if (strArr[0] !== '#') { // 下一个结点不是#
            biTree.left = new TreeTraverse2('#') // 生成左子树
        }
        this.createTree(biTree.left) // 左子树生成
        if (strArr[0] !== '#') {  // 左子树完 生成右子树
            biTree.right = new TreeTraverse2('#')
        }
        this.createTree(biTree.right)
    }

    // 前序遍历
    preOrderTraverse(biTree) {
        let stack = []
        stack.push(biTree)

        while(stack.length !== 0) {
            let data = stack.pop()
            console.log(data.node)
            if (data.right) {
                stack.push(data.right)
            }
            if (data.left) {
                stack.push(data.left)
            }
        }
    }

    // 中序遍历
    inOrderTraverse(biTree) {
        let stack = [], T = biTree.left
        stack.push(biTree)

        while(T || stack.length !== 0) { // 判断树是否为空 或 栈空
            while(T) { // 一直遍历左子树  把所有左子树放出栈中
                stack.push(T)
                T = T.left
            }

            if (stack.length !== 0) {
                T = stack.pop() // 结点弹出栈
                console.log(T.node)  // 打印结点
                T = T.right // 转向右子树
            }
        }
    }

    // 后序遍历
    postOrderTraverse(biTree) {
        let stack = [], lastPopNode = null
        stack.push(biTree)
        while(stack.length !== 0) {
            while(stack[stack.length - 1].left) { // 与中序相同,先将左子树遍历到底添加到栈中
                stack.push(stack[stack.length - 1].left)
            }

            while(stack.length !== 0) {
                // 如果当前出栈的结点是栈顶的右节点 或者 栈顶右节点不存在  否则就把右节点入栈
                // 输出栈顶的结点
                // 让栈顶等于当前出栈结点,并出栈
                if (lastPopNode === stack[stack.length - 1].right || !stack[stack.length - 1].right) {
                    console.log(stack[stack.length - 1].node)
                    lastPopNode = stack[stack.length - 1]
                    stack.pop()
                } else if (stack[stack.length - 1].right) {
                    stack.push(stack[stack.length - 1].right)
                    break
                }
            }
        }
    }

    // 层序遍历(队列)
    levelOrderTraverse(biTree) {
        let queue = []  // 初始化队列
        if (!biTree) return // 若空树返回
        queue.push(biTree)

        while(queue.length !== 0) {
            let data = queue.shift() // 取出队列的第一个
            console.log(data.node) // 输出第一个的结点
            if (data.left) queue.push(data.left)  // 若存在左节点进队
            if (data.right) queue.push(data.right) // 若存在右节点进队
        }
    }
}

// let tree = new LoopTree()
//                 .createTree()
// console.log(tree.preOrderTraverse(tree))

let strArr = 'ABDG##H##E##CF###'.split('')

const tree = new StackTree('#')
const newTree = new StackTree()

newTree.createTree(tree)
// newTree.preOrderTraverse(tree)
// newTree.inOrderTraverse(tree)
// newTree.postOrderTraverse(tree)
// newTree.levelOrderTraverse(tree)
console.log(tree)

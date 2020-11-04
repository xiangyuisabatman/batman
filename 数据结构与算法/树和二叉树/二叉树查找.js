class treeFind {
    constructor(node) {
        this.node = node
        this.left = null
        this.right = null
    }

    createTree(biTree) {
        if (strArr.length === 0) return // 如果没有结点,则返回
        let strArrShift = strArr.shift() // 取出第一个结点,并从数组中删除
        if (strArrShift === '#') return // 如果当前结点是#(空),则不用生成子结点,返回
        biTree.node = strArrShift // 将当前结点赋值
        if (strArr[0] !== '#') { // 下一个结点不是#
            biTree.left = new treeFind('#') // 生成左子树
        }
        this.createTree(biTree.left) // 左子树生成
        if (strArr[0] !== '#') {  // 左子树完 生成右子树
            biTree.right = new treeFind('#')
        }
        this.createTree(biTree.right)
    }
    // 递归查找目标结点
    find(target, biTree) {
        if (!biTree) { // 空树返回null
            return null
        }
        
        if (target < biTree.node) {
            // 若目标结点小于当前结点
            // 则向当前结点左子树查找
            this.find(target, biTree.left)
        } else if (target > biTree.node) {
            // 若目标结点大于当前结点
            // 则向当前结点右子树查找
            this.find(target, biTree.right)
        } else {
            // 找到返回
            console.log(biTree)
            console.log('unbelievable')
            return biTree
        }
    }
    // 迭代查找目标结点
    iterFind(target, biTree) {
        while(biTree) {
            if (target < biTree.node) {
                biTree = biTree.left
            } else if (target > biTree.node) {
                biTree = biTree.right
            } else {
                console.log('unbelievable')
                return biTree.node
            }
        }
        return null
    }

    // 查找最小值
    // 因为左子树永远小于结点跟右子树
    // 所以找到最左叶结点
    findMin(biTree) {
        if (!biTree) return null
        if (biTree.left) {
            this.findMin(biTree.left)
        } else {
            console.log(biTree.node)
            return biTree.node
        }
    }

    // 查找最大值(与查找最小值同理)
    findMax(biTree) {
        if (biTree) {
            while(biTree.right) {
                biTree = biTree.right
            }
            console.log(biTree.node)
            return biTree.node
        }
        return null
    }

    insert(target, biTree) {
        if (target < biTree.node) {
            if (!biTree.left) {
                biTree.left = new treeFind(target)
            } else {
                this.insert(target, biTree.left)
            }
        } else if (target > biTree.node) {
            if (!biTree.right) {
                biTree.right = new treeFind(target)
            } else {
                this.insert(target, biTree.right)
            }
        }
        return biTree
    }

    delete(target, biTree) {
        let temp
        if (!biTree) {
            return 
        } else if (target < biTree.node) {
            this.delete(target, biTree.left) // 左子树递归删除
        } else if (target > biTree.node) {
            this.delete(target, biTree.right) // 右子树递归删除
        } else {
            // 找到要删除的结点
            if (biTree.left && biTree.right) {
                temp = this.findMin(biTree.right)
                biTree.node = temp
                this.delete(temp, biTree.right)
            } else {
                if (!biTree.left) {
                    biTree = biTree.right
                } else if (!biTree.right) {
                    biTree = biTree.left
                }
            }
        }
        return biTree
    }

}

let strArr = [68, 23, 8, 3, '#', '#', 11, '#', '#', 57, '#', '#', 133, 96, '#', '#', '#']
const tree = new treeFind('#')

const newTree = new treeFind()
newTree.createTree(tree)
// newTree.find(11, tree)
// newTree.iterFind(11, tree)
// newTree.findMin(tree)
// newTree.findMax(tree)
// console.log(newTree.insert(65, tree))
let tree2 = newTree.delete(8, tree)
console.log(tree2)

# 129.求根到叶子节点数字之和

https://leetcode-cn.com/problems/sum-root-to-leaf-numbers

## 题目描述

```
给定一个二叉树，它的每个结点都存放一个 0-9 的数字，每条从根到叶子节点的路径都代表一个数字。

例如，从根到叶子节点路径 1->2->3 代表数字 123。

计算从根到叶子节点生成的所有数字之和。

说明: 叶子节点是指没有子节点的节点。

示例 1:

输入: [1,2,3]
    1
   / \
  2   3
输出: 25
解释:
从根到叶子节点路径 1->2 代表数字 12.
从根到叶子节点路径 1->3 代表数字 13.
因此，数字总和 = 12 + 13 = 25.
示例 2:

输入: [4,9,0,5,1]
    4
   / \
  9   0
 / \
5   1
输出: 1026
解释:
从根到叶子节点路径 4->9->5 代表数字 495.
从根到叶子节点路径 4->9->1 代表数字 491.
从根到叶子节点路径 4->0 代表数字 40.
因此，数字总和 = 495 + 491 + 40 = 1026.
来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/sum-root-to-leaf-numbers
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
```

### 思路

lucifer 的[递归小技巧](https://github.com/leetcode-pp/91alg-1/issues/32#issuecomment-643620727)练习课堂第二弹 😉。

1. 定义函数功能，先不用管其具体实现。

我们需要一个函数，给定一个二叉树的根节点，返回根节点到各个叶子节点连成的数字的和。假设我们已经有这个函数 `F`，那问题就转化为 `F(root)` 了。

唔...其实问题还要复杂一丢丢，因为我们得要遍历到叶子节点的时候才能确定连成的数字，而要知道这个数字是什么，还要知道这个叶子节点的父节点，以及它父节点的父节点，...，一直到根节点，也就是说我们需要在遍历开始的时候就用一个变量来记录走过的节点。那现在我们的问题就转化成了 `F(root, num)`。

2. 确定大问题和小问题的关系。

首先，遍历到当前节点的时候，我们还有一点额外的工作要做，就是把当前节点的值记录到 `num` 中，这一步可以通过数学计算 `num * 10 + root.val` 来完成，或者你用字符串来拼接也行。

再来看看 `F(root, num)` 和 `F(root.left, num)` 以及 `F(root.right, num)` 的关系，它们的关系就很单纯啦。

`F(root, num) = F(root.left, num) + F(root.right, num)`

3. 补充递归终止条件

显然，当遍历到叶子节点的时候我们就可以停止了，然后把遍历中生成的数字 `num` 返回。另外一种情况是遍历的节点不存在，那就直接返回 0 即可。

### 代码

Python Code

```py
# Definition for a binary tree node.
# class TreeNode(object):
#     def __init__(self, x):
#         self.val = x
#         self.left = None
#         self.right = None

class Solution(object):
    def sumNumbers(self, root, num=0):
        """
        :type root: TreeNode
        :rtype: int
        """
        if not root: return 0
        num = num * 10 + root.val
        if not root.left and not root.right: return num
        return self.sumNumbers(root.left, num) + self.sumNumbers(root.right, num)
```

_Originally posted by @suukii in https://github.com/leetcode-pp/91alg-1/issues/35#issuecomment-644051658_

**官方题解**

### DFS

求从根到叶子的路径之和，那我们只需要把每条根到叶子的路径找出来，并求和即可，这里用 DFS 去解，DFS 也是最容易想到的

```js
function sumNumbers1(root) {
  let sum = 0
  function dfs(root, cur) {
    if (!root) {
      return
    }
    let curSum = cur * 10 + root.val
    if (!root.left && !root.right) {
      sum += curSum
      return
    }
    dfs(root.left, curSum)
    dfs(root.right, curSum)
  }
  dfs(root, 0)
  return sum
}
```

### BFS

如果说 DFS 是孤军独入，取敌将首级，那么 BFS 就是堂堂正正，车马摆开，层层推进。BFS 可能没那么优雅，但是掌握模板之后简直就是神器。

要求根到的叶子的路径的和，那我们把中间每一层对应的值都求出来，当前层的节点是叶子节点，把对应值相加即可

```js
function sumNumbers(root) {
  let sum = 0
  let curLevel = []
  if (root) {
    curLevel.push(root)
  }
  while (curLevel.length) {
    let nextLevel = []
    for (let i = 0; i < curLevel.length; i++) {
      let cur = curLevel[i]
      if (cur.left) {
        cur.left.val = cur.val * 10 + cur.left.val
        nextLevel.push(cur.left)
      }
      if (cur.right) {
        cur.right.val = cur.val * 10 + cur.right.val
        nextLevel.push(cur.right)
      }
      if (!cur.left && !cur.right) {
        sum += cur.val
      }
      curLevel = nextLevel
    }
  }
  return sum
}
```

### 先序遍历

从树根开始先序遍历，用一个变量 curSum 跟踪到当前节点为止的根到节点组成数字，在当前节点更新 curSum

```js
function sumNumbers(root) {
  return preorder(root, 0)
}

function preorder(root, curSum) {
  if (root === null) {
    return 0
  }
  curSum = root.val + curSum * 10
  if (!root.left && !root.right) {
    return curSum
  }
  return preorder(root.left, curSum) + preorder(root.right, curSum)
}
```

_Originally posted by @feikerwu in https://github.com/leetcode-pp/91alg-1/issues/35#issuecomment-644214654_
